"use client";

import { useState, useEffect } from "react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faTimes, faCheckCircle, faShippingFast, faCreditCard, faTruck, faMapMarkerAlt } from "@fortawesome/free-solid-svg-icons";
import { placeOrderAction } from "@/lib/actions/orders";
import { useCart } from "@/context/CartContext";
import { useRouter } from "next/navigation";

interface CheckoutModalProps {
  isOpen: boolean;
  onClose: () => void;
}

declare global {
  interface Window {
    Razorpay: any;
  }
}

export default function CheckoutModal({ isOpen, onClose }: CheckoutModalProps) {
  const { cart, cartTotal, clearCart } = useCart();
  const router = useRouter();
  const [isLoading, setIsLoading] = useState(false);
  const [isSuccess, setIsSuccess] = useState(false);
  
  // New user detail fields
  const [customerName, setCustomerName] = useState("");
  const [customerEmail, setCustomerEmail] = useState("");
  const [customerPhone, setCustomerPhone] = useState("");
  const [address, setAddress] = useState("");
  const [locationLink, setLocationLink] = useState("");
  const [isLocating, setIsLocating] = useState(false);

  // Force Online Payment only
  const [paymentMethod, setPaymentMethod] = useState("Online Payment");
  const [error, setError] = useState("");

  const businessWhatsApp = "917416750834";

  useEffect(() => {
    if (isOpen) {
      const script = document.createElement("script");
      script.src = "https://checkout.razorpay.com/v1/checkout.js";
      script.async = true;
      document.body.appendChild(script);
      
      // Prefill if possible (optional: could fetch from session/profile)
      fetch("/api/auth/session").then(res => res.json()).then(session => {
        if (session && session.email) {
          setCustomerEmail(session.email);
        }
      });

      return () => {
        const existingScript = document.querySelector('script[src="https://checkout.razorpay.com/v1/checkout.js"]');
        if (existingScript) {
          document.body.removeChild(existingScript);
        }
      };
    }
  }, [isOpen]);

  if (!isOpen) return null;

  const handleLocateMe = () => {
    if (!navigator.geolocation) {
      alert("Geolocation not supported");
      return;
    }
    setIsLocating(true);
    navigator.geolocation.getCurrentPosition(
      (pos) => {
        const link = `https://www.google.com/maps?q=${pos.coords.latitude},${pos.coords.longitude}`;
        setLocationLink(link);
        setIsLocating(false);
      },
      () => {
        alert("Unable to fetch location");
        setIsLocating(false);
      }
    );
  };

  const sendWhatsAppNotification = (orderId: string) => {
    const itemDetails = cart.map(item => `- ${item.name} (${item.selectedUnit || (item as any).unit || ""}) x ${item.quantity} = ₹${Math.floor(item.price * item.quantity)}`).join('\n');
    const message = `*NEW ORDER PLACED!* 🛍️\n\n*Order ID:* #${orderId}\n\n*Customer Details:*\n- Name: ${customerName}\n- Phone: ${customerPhone}\n- Email: ${customerEmail}\n\n*Delivery Address:*\n${address}\n\n*Location:* ${locationLink || 'Not provided'}\n\n*Items:*\n${itemDetails}\n\n*Total Amount:* ₹${Math.floor(cartTotal)}\n*Payment Method:* ${paymentMethod}\n\nThank you for shopping with MADUR.IN!`;
    
    const url = `https://wa.me/${businessWhatsApp}?text=${encodeURIComponent(message)}`;
    window.open(url, '_blank');
  };

  const handleOnlinePayment = async (internalOrderId: string) => {
    try {
      const res = await fetch("/api/razorpay/order", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ 
          amount: cartTotal,
          receipt: `order_${internalOrderId}`
        }),
      });
      
      const data = await res.json();
      if (!data.success) throw new Error(data.error);

      const options = {
        key: process.env.NEXT_PUBLIC_RAZORPAY_KEY_ID,
        amount: data.amount,
        currency: data.currency,
        name: "Madur.in",
        description: "Fresh Produce Order",
        order_id: data.orderId,
        handler: async function (response: any) {
          setIsLoading(true);
          const verifyRes = await fetch("/api/razorpay/verify", {
            method: "POST",
            headers: { "Content-Type": "application/json" },
            body: JSON.stringify({
              ...response,
              order_id: internalOrderId,
            }),
          });
          
          const verifyData = await verifyRes.json();
          if (verifyData.success) {
            sendWhatsAppNotification(internalOrderId);
            setIsSuccess(true);
            clearCart();
            setTimeout(() => {
              onClose();
              router.push("/account");
              router.refresh();
            }, 3000);
          } else {
            setError("Payment verification failed. Please contact support.");
          }
          setIsLoading(false);
        },
        modal: {
          ondismiss: function() {
            setIsLoading(false);
          }
        },
        prefill: {
          name: customerName,
          email: customerEmail,
          contact: customerPhone,
        },
        theme: { color: "#2F6B3F" },
      };

      const rzp = new window.Razorpay(options);
      rzp.open();
    } catch (err: any) {
      setError(err.message || "Failed to initiate payment.");
      setIsLoading(false);
    }
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    
    // Manual validation to prevent silent HTML5 blocks
    if (!customerName || !customerEmail || !customerPhone || !address) {
      setError("Please fill in all required fields (Name, Email, Phone, and Address).");
      const form = document.querySelector('.custom-scrollbar');
      if (form) form.scrollTo({ top: 0, behavior: 'smooth' });
      return;
    }

    setIsLoading(true);
    setError("");

    const orderData = {
      total_amount: cartTotal,
      shipping_address: address,
      payment_method: paymentMethod,
      customer_name: customerName,
      customer_phone: customerPhone,
      customer_email: customerEmail,
      location_link: locationLink,
      items: cart.map(item => ({
        product_id: item.id,
        quantity: item.quantity,
        price: item.price,
        unit: item.selectedUnit
      }))
    };

    const result = await placeOrderAction(orderData);

    if (result.success) {
      if (paymentMethod === "Online Payment") {
        await handleOnlinePayment(result.orderId!);
      } else {
        sendWhatsAppNotification(result.orderId!);
        setIsSuccess(true);
        clearCart();
        setTimeout(() => {
          onClose();
          router.push("/account");
          router.refresh();
        }, 3000);
        setIsLoading(false);
      }
    } else {
      setError(result.error || "Failed to place order. Please try again.");
      setIsLoading(false);
    }
  };

  if (isSuccess) {
    return (
      <div className="fixed inset-0 z-[100] flex items-center justify-center p-4 bg-black/60 backdrop-blur-sm">
        <div className="bg-white w-full max-w-md rounded-[2.5rem] p-10 text-center shadow-2xl animate-in zoom-in-95 duration-200">
          <div className="w-24 h-24 bg-green-100 text-green-500 rounded-full flex items-center justify-center mx-auto mb-6 shadow-inner">
            <FontAwesomeIcon icon={faCheckCircle} className="text-5xl" />
          </div>
          <h2 className="text-3xl font-black text-gray-800 mb-3">Order Placed!</h2>
          <p className="text-gray-500 font-bold mb-4">Your order details have been sent to WhatsApp.</p>
          <div className="flex flex-col gap-2">
            <p className="text-[10px] text-gray-400 font-black uppercase tracking-widest animate-pulse">Redirecting to Dashboard...</p>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="fixed inset-0 z-[100] flex items-center justify-center p-4 bg-black/60 backdrop-blur-sm overflow-y-auto">
      <div className="bg-white w-full max-w-xl rounded-[2.5rem] shadow-2xl animate-in zoom-in-95 duration-200 overflow-hidden my-auto max-h-[95vh] flex flex-col">
        <div className="flex items-center justify-between px-8 py-5 border-b border-gray-100 bg-gray-50/50 shrink-0">
          <div className="flex items-center gap-4">
            <div className="w-10 h-10 rounded-xl bg-secondary/10 flex items-center justify-center text-secondary">
              <FontAwesomeIcon icon={faShippingFast} />
            </div>
            <div>
              <h2 className="text-xl font-black text-gray-800">Checkout Details</h2>
            </div>
          </div>
          <button onClick={onClose} className="w-8 h-8 rounded-full bg-white border border-gray-100 flex items-center justify-center text-gray-400 hover:text-red-500 transition-all shadow-sm">
            <FontAwesomeIcon icon={faTimes} />
          </button>
        </div>

        <form onSubmit={handleSubmit} className="p-6 md:p-8 space-y-4 overflow-y-auto custom-scrollbar">
          {error && (
            <div className="p-4 bg-red-50 border border-red-100 text-red-600 rounded-2xl text-[10px] font-black uppercase tracking-widest flex items-center gap-3">
              <div className="w-1.5 h-1.5 rounded-full bg-red-500 animate-pulse"></div>
              {error}
            </div>
          )}

          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div>
              <label className="text-[9px] font-black text-gray-400 uppercase tracking-widest ml-1 mb-2 block">Full Name</label>
              <input 
                type="text" 
                placeholder="Enter your name"
                className="w-full bg-accent/30 rounded-xl py-3.5 px-5 font-bold outline-none border-2 border-transparent focus:border-primary/20 transition-all text-sm"
                value={customerName}
                onChange={e => setCustomerName(e.target.value)}
              />
            </div>
            <div>
              <label className="text-[9px] font-black text-gray-400 uppercase tracking-widest ml-1 mb-2 block">Email Address</label>
              <input 
                type="email" 
                placeholder="your@email.com"
                className="w-full bg-accent/30 rounded-xl py-3.5 px-5 font-bold outline-none border-2 border-transparent focus:border-primary/20 transition-all text-sm"
                value={customerEmail}
                onChange={e => setCustomerEmail(e.target.value)}
              />
            </div>
          </div>

          <div>
            <label className="text-[9px] font-black text-gray-400 uppercase tracking-widest ml-1 mb-2 block">Phone Number</label>
            <input 
              type="tel" 
              placeholder="10-digit number"
              className="w-full bg-accent/30 rounded-xl py-3.5 px-5 font-bold outline-none border-2 border-transparent focus:border-primary/20 transition-all text-sm"
              value={customerPhone}
              onChange={e => setCustomerPhone(e.target.value)}
            />
          </div>

          <div>
            <label className="text-[9px] font-black text-gray-400 uppercase tracking-widest ml-1 mb-2 block">Delivery Address</label>
            <textarea 
              rows={2}
              placeholder="Enter your full address..."
              className="w-full bg-accent/30 rounded-xl py-2.5 px-4 font-bold outline-none border-2 border-transparent focus:border-primary/20 transition-all resize-none text-sm"
              value={address}
              onChange={e => setAddress(e.target.value)}
            />
          </div>

          <div>
             <button 
                type="button" 
                onClick={handleLocateMe}
                disabled={isLocating}
                className="w-full bg-green-50 text-green-700 font-bold py-3 rounded-xl border border-green-100 flex items-center justify-center gap-2 hover:bg-green-100 transition-all active:scale-95 mb-1 text-xs"
              >
                <FontAwesomeIcon icon={faMapMarkerAlt} className={isLocating ? "animate-bounce" : ""} />
                {isLocating ? "Locating..." : "Click here share your location"}
              </button>
              {locationLink && (
                <div className="bg-accent/20 p-3 rounded-xl border border-dashed border-gray-200 truncate text-[10px] font-bold text-gray-500">
                  {locationLink}
                </div>
              )}
          </div>

          <div className="pt-6 border-t border-gray-100">
            <div className="flex justify-between items-center mb-6">
              <span className="text-gray-400 font-black uppercase tracking-widest text-[10px]">Payable Amount</span>
              <span className="text-3xl font-black text-secondary">₹{Math.floor(cartTotal)}</span>
            </div>

            <div className="mb-6 p-4 bg-primary/5 rounded-2xl border border-primary/20 flex items-center gap-4">
               <div className="w-12 h-12 rounded-xl bg-primary/10 flex items-center justify-center text-primary">
                 <FontAwesomeIcon icon={faCreditCard} className="text-xl" />
               </div>
               <div>
                 <p className="text-[10px] font-black text-primary uppercase tracking-widest">Payment Method</p>
                 <p className="text-sm font-black text-gray-800">Online Payment Required</p>
               </div>
            </div>

            <button 
              type="submit"
              disabled={isLoading}
              className="w-full bg-secondary text-white font-black py-5 rounded-2xl shadow-xl hover:opacity-90 transition-all active:scale-95 flex items-center justify-center gap-3 text-sm uppercase tracking-widest"
            >
              {isLoading ? (
                <div className="w-6 h-6 border-4 border-white/30 border-t-white rounded-full animate-spin"></div>
              ) : (
                <>
                  <FontAwesomeIcon icon={faCheckCircle} />
                  Proceed to Payment
                </>
              )}
            </button>
          </div>
        </form>
      </div>
    </div>
  );
}
