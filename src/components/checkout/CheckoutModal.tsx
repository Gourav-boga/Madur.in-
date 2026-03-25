"use client";

import { useState } from "react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faTimes, faCheckCircle, faShippingFast, faCreditCard, faTruck } from "@fortawesome/free-solid-svg-icons";
import { placeOrderAction } from "@/lib/actions/orders";
import { useCart } from "@/context/CartContext";
import { useRouter } from "next/navigation";

interface CheckoutModalProps {
  isOpen: boolean;
  onClose: () => void;
}

export default function CheckoutModal({ isOpen, onClose }: CheckoutModalProps) {
  const { cart, cartTotal, clearCart } = useCart();
  const router = useRouter();
  const [isLoading, setIsLoading] = useState(false);
  const [isSuccess, setIsSuccess] = useState(false);
  const [address, setAddress] = useState("");
  const [paymentMethod, setPaymentMethod] = useState("Cash on Delivery");
  const [error, setError] = useState("");

  if (!isOpen) return null;

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsLoading(true);
    setError("");

    const orderData = {
      total_amount: cartTotal,
      shipping_address: address,
      payment_method: paymentMethod,
      items: cart.map(item => ({
        product_id: item.id,
        quantity: item.quantity,
        price: item.price,
        unit: item.selectedUnit
      }))
    };

    const result = await placeOrderAction(orderData);

    if (result.success) {
      setIsSuccess(true);
      clearCart();
      setTimeout(() => {
        onClose();
        router.push("/account");
        router.refresh();
      }, 2000);
    } else {
      setError(result.error || "Failed to place order. Please try again.");
    }
    setIsLoading(false);
  };

  if (isSuccess) {
    return (
      <div className="fixed inset-0 z-[100] flex items-center justify-center p-4 bg-black/60 backdrop-blur-sm">
        <div className="bg-white w-full max-w-md rounded-[2.5rem] p-10 text-center shadow-2xl animate-in zoom-in-95 duration-200">
          <div className="w-24 h-24 bg-green-100 text-green-500 rounded-full flex items-center justify-center mx-auto mb-6 shadow-inner">
            <FontAwesomeIcon icon={faCheckCircle} className="text-5xl" />
          </div>
          <h2 className="text-3xl font-black text-gray-800 mb-3">Order Placed!</h2>
          <p className="text-gray-500 font-bold mb-0">Your fresh produce is on its way.</p>
          <p className="text-[10px] text-gray-400 font-black uppercase tracking-widest mt-4 animate-pulse">Redirecting to Dashboard...</p>
        </div>
      </div>
    );
  }

  return (
    <div className="fixed inset-0 z-[100] flex items-center justify-center p-4 bg-black/60 backdrop-blur-sm overflow-y-auto">
      <div className="bg-white w-full max-w-xl rounded-[2.5rem] shadow-2xl animate-in zoom-in-95 duration-200 overflow-hidden my-8">
        <div className="flex items-center justify-between px-10 py-8 border-b border-gray-100 bg-gray-50/50">
          <div className="flex items-center gap-4">
            <div className="w-12 h-12 rounded-2xl bg-secondary/10 flex items-center justify-center text-secondary shadow-inner">
              <FontAwesomeIcon icon={faShippingFast} />
            </div>
            <div>
              <h2 className="text-2xl font-black text-gray-800">Checkout</h2>
              <p className="text-[10px] font-bold text-gray-400 uppercase tracking-widest">Finalize your order</p>
            </div>
          </div>
          <button onClick={onClose} className="w-10 h-10 rounded-xl bg-white border border-gray-100 flex items-center justify-center text-gray-400 hover:text-red-500 transition-all shadow-sm">
            <FontAwesomeIcon icon={faTimes} />
          </button>
        </div>

        <form onSubmit={handleSubmit} className="p-10">
          {error && (
            <div className="mb-8 p-4 bg-red-50 border border-red-100 text-red-600 rounded-2xl text-sm font-bold flex items-center gap-3">
              <div className="w-2 h-2 rounded-full bg-red-500 animate-pulse"></div>
              {error}
            </div>
          )}

          <div className="space-y-6">
            <div>
              <label className="text-[10px] font-black text-gray-400 uppercase tracking-widest ml-1 mb-2 block">Shipping Address</label>
              <textarea 
                required
                rows={3}
                placeholder="Enter your full delivery address..."
                className="w-full bg-accent/30 rounded-2xl py-4 px-6 font-bold outline-none border-2 border-transparent focus:border-primary/20 transition-all resize-none text-black"
                value={address}
                onChange={e => setAddress(e.target.value)}
              />
            </div>

            <div>
              <label className="text-[10px] font-black text-gray-400 uppercase tracking-widest ml-1 mb-3 block">Payment Method</label>
              <div className="grid grid-cols-1 gap-4">
                <button 
                  type="button"
                  onClick={() => setPaymentMethod("Cash on Delivery")}
                  className={`flex items-center justify-between p-5 rounded-2xl border-2 transition-all group ${paymentMethod === "Cash on Delivery" ? 'border-secondary bg-secondary/5' : 'border-gray-100 bg-white hover:border-accent'}`}
                >
                  <div className="flex items-center gap-4">
                    <div className={`w-10 h-10 rounded-xl flex items-center justify-center transition-all ${paymentMethod === "Cash on Delivery" ? 'bg-secondary text-white' : 'bg-gray-100 text-gray-400'}`}>
                      <FontAwesomeIcon icon={faTruck} />
                    </div>
                    <div className="text-left">
                      <p className="font-black text-gray-800">Cash on Delivery</p>
                      <p className="text-[10px] font-bold text-gray-400 uppercase">Pay when you receive</p>
                    </div>
                  </div>
                  <div className={`w-6 h-6 rounded-full border-2 flex items-center justify-center transition-all ${paymentMethod === "Cash on Delivery" ? 'border-secondary' : 'border-gray-200'}`}>
                    {paymentMethod === "Cash on Delivery" && <div className="w-3 h-3 bg-secondary rounded-full"></div>}
                  </div>
                </button>

                <button 
                  type="button"
                  disabled
                  className="flex items-center justify-between p-5 rounded-2xl border-2 border-gray-100 bg-gray-50 opacity-60 cursor-not-allowed group"
                >
                  <div className="flex items-center gap-4">
                    <div className="w-10 h-10 rounded-xl bg-gray-200 flex items-center justify-center text-gray-400">
                      <FontAwesomeIcon icon={faCreditCard} />
                    </div>
                    <div className="text-left">
                      <p className="font-black text-gray-800">Online Payment</p>
                      <p className="text-[10px] font-bold text-gray-400 uppercase">Temporarily Disabled</p>
                    </div>
                  </div>
                </button>
              </div>
            </div>
          </div>

          <div className="mt-10 pt-8 border-t border-gray-100">
            <div className="flex justify-between items-center mb-6">
              <span className="text-gray-400 font-black uppercase tracking-widest text-[10px]">Total Order Value</span>
              <span className="text-3xl font-black text-primary font-mono tracking-tighter">₹{cartTotal}</span>
            </div>
            <button 
              type="submit"
              disabled={isLoading}
              className="w-full bg-secondary text-white font-black py-5 rounded-2xl shadow-xl hover:opacity-90 transition-all active:scale-95 flex items-center justify-center gap-3"
            >
              {isLoading ? (
                <div className="w-6 h-6 border-4 border-white/30 border-t-white rounded-full animate-spin"></div>
              ) : (
                <>
                  <FontAwesomeIcon icon={faCheckCircle} />
                  CONFIRM ORDER
                </>
              )}
            </button>
          </div>
        </form>
      </div>
    </div>
  );
}
