"use client";

import React, { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faTimes, faCheckCircle, faMapMarkerAlt, faUser, faEnvelope, faRoad, faCreditCard, faUpload, faCheck, faPhone } from "@fortawesome/free-solid-svg-icons";


interface SubscriptionModalProps {
  isOpen: boolean;
  onClose: () => void;
}

declare global {
  interface Window {
    Razorpay: any;
  }
}

export default function SubscriptionModal({ isOpen, onClose }: SubscriptionModalProps) {
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    phone: "",
    location: "",
    address: "",
    street: "",
    payment_screenshot_url: null as string | null,
    product_id: "",
    quantity: 1,
  });

  const [subscriptionAmount, setSubscriptionAmount] = useState(599);
  const [isLocating, setIsLocating] = useState(false);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [isSuccess, setIsSuccess] = useState(false);
  const [dairyProducts, setDairyProducts] = useState<any[]>([]);

  // Fetch details from local APIs
  React.useEffect(() => {
    async function fetchDetails() {
      try {
        // 1. Fetch fee
        const settingsRes = await fetch("/api/settings");
        const settings = await settingsRes.json();
        if (settings.subscription_fee) setSubscriptionAmount(parseInt(settings.subscription_fee));
  
        // 2. Fetch Milk Products (via API)
        const productsRes = await fetch("/api/productList?category=Milk%20&%20Dairy");
        const prods = await productsRes.json();
        
        setDairyProducts(prods || []);
        if (prods && prods.length > 0) setFormData(prev => ({ ...prev, product_id: prods[0].id }));
      } catch (err) {
        console.error("Error fetching subscription details:", err);
      }
    }

    if (isOpen) {
      fetchDetails();
      setIsSuccess(false);
      
      const script = document.createElement("script");
      script.src = "https://checkout.razorpay.com/v1/checkout.js";
      script.async = true;
      document.body.appendChild(script);

      return () => {
        const existingScript = document.querySelector('script[src="https://checkout.razorpay.com/v1/checkout.js"]');
        if (existingScript) document.body.removeChild(existingScript);
      };
    }
  }, [isOpen]);

  const handleGetCurrentLocation = () => {
    if (!navigator.geolocation) {
      alert("Geolocation is not supported by your browser.");
      return;
    }

    setIsLocating(true);
    navigator.geolocation.getCurrentPosition(
      (position) => {
        const { latitude, longitude } = position.coords;
        const mapsLink = `https://www.google.com/maps?q=${latitude},${longitude}`;
        setFormData((prev) => ({ ...prev, location: mapsLink }));
        setIsLocating(false);
      },
      (error) => {
        let errorMessage = "Unable to fetch your location.";
        switch (error.code) {
          case error.PERMISSION_DENIED:
            errorMessage = "Location access was denied. Please enable location permissions in your browser settings.";
            break;
          case error.POSITION_UNAVAILABLE:
            errorMessage = "Location information is unavailable. Please try again or enter manually.";
            break;
          case error.TIMEOUT:
            errorMessage = "The request to get user location timed out. Please try again.";
            break;
        }
        console.error("Geolocation Error:", error.message);
        alert(errorMessage);
        setIsLocating(false);
      },
      { enableHighAccuracy: true, timeout: 5000, maximumAge: 0 }
    );
  };


  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
  };

  const handleRazorpayPayment = async (subscriptionId: string) => {
    try {
      const res = await fetch("/api/razorpay/order", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ 
          amount: subscriptionAmount,
          receipt: `sub_${subscriptionId}`
        }),
      });
      
      const data = await res.json();
      if (!data.success) throw new Error(data.error);

      const options = {
        key: process.env.NEXT_PUBLIC_RAZORPAY_KEY_ID,
        amount: data.amount,
        currency: data.currency,
        name: "Madur.in",
        description: "Fresh Milk Subscription",
        order_id: data.orderId,
        handler: async function (response: any) {
          setIsSubmitting(true);
          const verifyRes = await fetch("/api/razorpay/verify", {
            method: "POST",
            headers: { "Content-Type": "application/json" },
            body: JSON.stringify({
              ...response,
              order_id: subscriptionId,
              type: 'subscription',
              amount: subscriptionAmount
            }),
          });
          
          const verifyData = await verifyRes.json();
          if (verifyData.success) {
            setIsSuccess(true);
            setTimeout(() => {
              onClose();
              window.location.reload();
            }, 3000);
          } else {
            alert("Payment verification failed. Please contact support.");
          }
          setIsSubmitting(false);
        },
        modal: {
          ondismiss: function() {
            setIsSubmitting(false);
          }
        },
        prefill: {
          name: formData.name,
          email: formData.email,
          contact: formData.phone,
        },
        theme: { color: "#2F6B3F" },
      };

      const rzp = new window.Razorpay(options);
      rzp.open();
    } catch (err: any) {
      alert(err.message || "Failed to initiate payment.");
      setIsSubmitting(false);
    }
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsSubmitting(true);
    try {
      const response = await fetch("/api/subscriptions", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          customer_name: formData.name,
          customer_email: formData.email,
          customer_phone: formData.phone,
          address: formData.address,
          location_link: formData.location,
          street: formData.street,
          payment_screenshot_url: formData.payment_screenshot_url,
          product_id: formData.product_id,
          quantity: formData.quantity
        })
      });

      if (!response.ok) throw new Error("Failed to save subscription");
      const result = await response.json();
      await handleRazorpayPayment(result.insertId || result.id);
    } catch (error: any) {
      console.error("Submission error details:", error);
      alert(`Error saving subscription: ${error.message || "Please contact support."}`);
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <AnimatePresence>
      {isOpen && (
        <>
          {/* Backdrop */}
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            onClick={onClose}
            className="fixed inset-0 bg-black/60 backdrop-blur-sm z-[100]"
          />

          {/* Modal Container */}
          <div className="fixed inset-0 flex items-center justify-center pointer-events-none z-[101] p-4 overflow-y-auto">
            <motion.div
              initial={{ opacity: 0, scale: 0.9, y: 20 }}
              animate={{ opacity: 1, scale: 1, y: 0 }}
              exit={{ opacity: 0, scale: 0.9, y: 20 }}
              className="bg-white w-full max-w-lg rounded-[2.5rem] shadow-2xl pointer-events-auto relative flex flex-col max-h-[90vh] overflow-hidden my-auto"
            >
              {/* Close Button */}
              <button
                onClick={onClose}
                className="absolute top-6 right-6 w-10 h-10 rounded-full bg-gray-100 flex items-center justify-center text-gray-500 hover:bg-red-50 hover:text-red-500 transition-all z-10"
              >
                <FontAwesomeIcon icon={faTimes} />
              </button>

              <div className="p-8 md:p-10 overflow-y-auto flex-1">
                {isSuccess ? (
                  <div className="py-20 flex flex-col items-center text-center">
                    <div className="w-20 h-20 bg-green-100 text-green-500 rounded-full flex items-center justify-center mb-6 animate-bounce">
                      <FontAwesomeIcon icon={faCheck} className="text-3xl" />
                    </div>
                    <h3 className="text-2xl font-black text-gray-800 mb-2">Registration Successful!</h3>
                    <p className="text-gray-500 font-bold">Your subscription is now active. Thank you!</p>
                  </div>
                ) : (
                  <>
                    <div className="mb-8">
                       <h3 className="text-2xl font-black text-gray-800 mb-1">
                          Subscription Details
                       </h3>
                       <p className="text-gray-500 font-bold text-sm">
                          Tell us where to deliver your fresh milk.
                       </p>
                    </div>

                    <form onSubmit={handleSubmit} className="space-y-6">
                      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                        <div className="relative">
                          <label className="text-[10px] font-bold text-gray-400 uppercase tracking-widest mb-2 block ml-1">Full Name</label>
                          <div className="relative">
                            <FontAwesomeIcon icon={faUser} className="absolute left-4 top-1/2 -translate-y-1/2 text-gray-300 text-sm" />
                            <input 
                              required
                              type="text" 
                              name="name"
                              placeholder="Your Name"
                              className="w-full bg-accent/30 border border-gray-100 rounded-2xl py-4 pl-12 pr-4 text-sm outline-none focus:ring-2 ring-primary transition-all font-bold"
                              value={formData.name}
                              onChange={handleChange}
                            />
                          </div>
                        </div>
                        <div className="relative">
                          <label className="text-[10px] font-bold text-gray-400 uppercase tracking-widest mb-2 block ml-1">Email Address</label>
                          <div className="relative">
                            <FontAwesomeIcon icon={faEnvelope} className="absolute left-4 top-1/2 -translate-y-1/2 text-gray-300 text-sm" />
                            <input 
                              required
                              type="email" 
                              name="email"
                              placeholder="your@email.com"
                              className="w-full bg-accent/30 border border-gray-100 rounded-2xl py-4 pl-12 pr-4 text-sm outline-none focus:ring-2 ring-primary transition-all font-bold"
                              value={formData.email}
                              onChange={handleChange}
                            />
                          </div>
                        </div>
                      </div>

                      <div className="relative">
                        <label className="text-[10px] font-bold text-gray-400 uppercase tracking-widest mb-2 block ml-1">Phone Number</label>
                        <div className="relative">
                          <FontAwesomeIcon icon={faPhone} className="absolute left-4 top-1/2 -translate-y-1/2 text-gray-300 text-sm" />
                          <input 
                            required
                            type="tel" 
                            name="phone"
                            placeholder="Your Phone"
                            className="w-full bg-accent/30 border border-gray-100 rounded-2xl py-4 pl-12 pr-4 text-sm outline-none focus:ring-2 ring-primary transition-all font-bold"
                            value={formData.phone}
                            onChange={handleChange}
                          />
                        </div>
                      </div>

                      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                        <div className="relative">
                          <label className="text-[10px] font-bold text-gray-400 uppercase tracking-widest mb-2 block ml-1">Daily Qty (Litres)</label>
                          <input 
                            required
                            type="number" 
                            step="0.1"
                            min="0.1"
                            name="quantity"
                            className="w-full bg-accent/30 border border-gray-100 rounded-2xl py-4 px-4 text-sm outline-none focus:ring-2 ring-primary transition-all font-bold"
                            value={formData.quantity}
                            onChange={(e) => setFormData(p => ({...p, quantity: parseFloat(e.target.value)}))}
                          />
                        </div>
                        <div className="relative">
                          <label className="text-[10px] font-bold text-gray-400 uppercase tracking-widest mb-2 block ml-1 flex justify-between items-center">
                            Maps Link / City
                            <button 
                              type="button"
                              onClick={handleGetCurrentLocation}
                              disabled={isLocating}
                              className="text-[#689f38] normal-case tracking-normal hover:underline active:scale-95 transition-all disabled:opacity-50"
                            >
                              {isLocating ? "Locating..." : "Locate Me"}
                            </button>
                          </label>
                          <div className="relative">
                            <FontAwesomeIcon icon={faMapMarkerAlt} className="absolute left-4 top-1/2 -translate-y-1/2 text-gray-300 text-sm" />
                            <input 
                              required
                              type="text" 
                              name="location"
                              placeholder="Locate me or paste link"
                              className="w-full bg-accent/30 border border-gray-100 rounded-2xl py-4 pl-12 pr-4 text-sm outline-none focus:ring-2 ring-primary transition-all font-bold"
                              value={formData.location}
                              onChange={handleChange}
                            />
                          </div>
                        </div>
                      </div>

                      <div>
                        <label className="text-[10px] font-bold text-gray-400 uppercase tracking-widest mb-2 block ml-1">Street / Landmark / House No.</label>
                        <div className="relative">
                          <FontAwesomeIcon icon={faRoad} className="absolute left-4 top-1/2 -translate-y-1/2 text-gray-300 text-sm" />
                          <input 
                            required
                            type="text" 
                            name="street"
                            placeholder="e.g. Near Hanuman Temple"
                            className="w-full bg-accent/30 border border-gray-100 rounded-2xl py-4 pl-12 pr-4 text-sm outline-none focus:ring-2 ring-primary transition-all font-bold"
                            value={formData.street}
                            onChange={handleChange}
                          />
                        </div>
                      </div>

                      <div>
                        <label className="text-[10px] font-bold text-gray-400 uppercase tracking-widest mb-2 block ml-1">Full Delivery Address</label>
                        <textarea 
                          required
                          name="address"
                          rows={2}
                          placeholder="Enter your complete address..."
                          className="w-full bg-accent/30 border border-gray-100 rounded-2xl py-4 px-5 text-sm outline-none focus:ring-2 ring-primary transition-all font-bold resize-none"
                          value={formData.address}
                          onChange={handleChange}
                        />
                      </div>

                      <div className="pt-4 border-t border-gray-50">
                         <div className="flex justify-between items-center mb-6">
                            <span className="text-[10px] font-black uppercase text-gray-400 tracking-[0.2em]">Payable Amount</span>
                            <span className="text-3xl font-black text-black">₹{subscriptionAmount}</span>
                         </div>
                         <button
                          type="submit"
                          disabled={isSubmitting}
                          className="w-full bg-secondary hover:opacity-90 text-white font-black py-5 rounded-2xl flex items-center justify-center gap-3 transition-all active:scale-[0.98] shadow-xl shadow-brown/20 text-sm uppercase tracking-widest disabled:opacity-50"
                        >
                          {isSubmitting ? (
                             <div className="w-5 h-5 border-2 border-white/30 border-t-white animate-spin rounded-full"></div>
                          ) : (
                            <>
                              <FontAwesomeIcon icon={faCreditCard} />
                              Continue to Payment
                            </>
                          )}
                        </button>
                      </div>
                    </form>
                  </>
                )}
              </div>
            </motion.div>
          </div>
        </>
      )}
    </AnimatePresence>
  );
}
