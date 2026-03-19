"use client";

import React, { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faTimes, faCheckCircle, faMapMarkerAlt, faUser, faEnvelope, faRoad, faCreditCard, faUpload, faCheck, faPhone } from "@fortawesome/free-solid-svg-icons";
import { supabase } from "@/lib/supabase";

interface SubscriptionModalProps {
  isOpen: boolean;
  onClose: () => void;
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
  const [currentStep, setCurrentStep] = useState(1); // 1: Details, 2: Payment
  const [isLocating, setIsLocating] = useState(false);
  const [isUploading, setIsUploading] = useState(false);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [isSuccess, setIsSuccess] = useState(false);
  const [dairyProducts, setDairyProducts] = useState<any[]>([]);

  // Fetch subscription fee from settings
  React.useEffect(() => {
    async function fetchDetails() {
      // Fetch fee
      const { data: feeData } = await supabase.from("settings").select("value").eq("key", "subscription_fee").maybeSingle();
      if (feeData) setSubscriptionAmount(parseInt(feeData.value));

      // Fetch Milk Products
      const { data: catData } = await supabase.from("categories").select("id").ilike("name", "%Milk%").limit(1).maybeSingle();
      let prods: any[] = [];
      if (catData) {
        const { data: milkProds } = await supabase.from("products").select("*").eq("category_id", catData.id);
        prods = milkProds || [];
      }
      if (prods.length === 0) {
        const { data: allProds } = await supabase.from("products").select("*").limit(10);
        prods = allProds || [];
      }
      setDairyProducts(prods);
      if (prods.length > 0) setFormData(prev => ({ ...prev, product_id: prods[0].id }));
    }

    if (isOpen) {
      fetchDetails();
      setIsSuccess(false);
      setCurrentStep(1);
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

  const handleFileUpload = async (e: React.ChangeEvent<HTMLInputElement>) => {
    try {
      if (!e.target.files || e.target.files.length === 0) return;
      setIsUploading(true);
      
      const file = e.target.files[0];
      const fileExt = file.name.split(".").pop();
      const fileName = `${Math.random()}.${fileExt}`;
      const filePath = `payments/${fileName}`;

      const { error: uploadError } = await supabase.storage
        .from("madur")
        .upload(filePath, file);

      if (uploadError) throw uploadError;

      const { data: { publicUrl } } = supabase.storage
        .from("madur")
        .getPublicUrl(filePath);

      setFormData(prev => ({ ...prev, payment_screenshot_url: publicUrl }));
    } catch (error) {
      console.error("Upload error:", error);
      alert("Error uploading screenshot. Please try again.");
    } finally {
      setIsUploading(false);
    }
  };

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
  };

  const handleNextStep = (e: React.FormEvent) => {
    e.preventDefault();
    setCurrentStep(2);
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!formData.payment_screenshot_url) {
      alert("Please upload a payment screenshot first.");
      return;
    }

    setIsSubmitting(true);
    try {
      const { error } = await supabase.from("subscriptions").insert([{
        customer_name: formData.name,
        customer_email: formData.email,
        customer_phone: formData.phone,
        address: formData.address,
        location_link: formData.location,
        street: formData.street,
        payment_screenshot_url: formData.payment_screenshot_url,
        amount_paid: subscriptionAmount,
        status: 'active',
        product_id: formData.product_id,
        quantity: formData.quantity,
        plan_details: `Monthly Subscription (₹${subscriptionAmount})`
      }]);

      if (error) throw error;
      setIsSuccess(true);
      setTimeout(() => {
        onClose();
        setIsSuccess(false);
      }, 3000);
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
          <div className="fixed inset-0 flex items-center justify-center pointer-events-none z-[101] p-4">
            <motion.div
              initial={{ opacity: 0, scale: 0.9, y: 20 }}
              animate={{ opacity: 1, scale: 1, y: 0 }}
              exit={{ opacity: 0, scale: 0.9, y: 20 }}
              className="bg-white w-full max-w-lg rounded-[2.5rem] overflow-hidden shadow-2xl pointer-events-auto relative"
            >
              {/* Close Button */}
              <button
                onClick={onClose}
                className="absolute top-6 right-6 w-10 h-10 rounded-full bg-gray-100 flex items-center justify-center text-gray-500 hover:bg-red-50 hover:text-red-500 transition-all z-10"
              >
                <FontAwesomeIcon icon={faTimes} />
              </button>

              <div className="p-8 md:p-10">
                {isSuccess ? (
                  <div className="py-20 flex flex-col items-center text-center">
                    <div className="w-20 h-20 bg-green-100 text-green-500 rounded-full flex items-center justify-center mb-6 animate-bounce">
                      <FontAwesomeIcon icon={faCheck} className="text-3xl" />
                    </div>
                    <h3 className="text-2xl font-black text-gray-800 mb-2">Registration Successful!</h3>
                    <p className="text-gray-500 font-bold">Our team will verify your payment and contact you soon.</p>
                  </div>
                ) : (
                  <>
                    <div className="mb-8">
                       <div className="flex items-center gap-3 mb-2">
                          <span className={`w-8 h-8 rounded-full flex items-center justify-center text-xs font-black ${currentStep === 1 ? 'bg-primary text-black' : 'bg-green-500 text-white'}`}>
                             {currentStep > 1 ? <FontAwesomeIcon icon={faCheck} /> : "1"}
                          </span>
                          <div className={`h-1 flex-1 rounded-full ${currentStep > 1 ? 'bg-green-500' : 'bg-gray-100'}`}></div>
                          <span className={`w-8 h-8 rounded-full flex items-center justify-center text-xs font-black ${currentStep === 2 ? 'bg-primary text-black' : 'bg-gray-100 text-gray-400'}`}>
                             2
                          </span>
                       </div>
                       <h3 className="text-2xl font-black text-gray-800 mb-1">
                          {currentStep === 1 ? "Your Details" : "Upload Payment"}
                       </h3>
                       <p className="text-gray-500 font-bold text-sm">
                          {currentStep === 1 ? "Tell us where to deliver your fresh milk." : "Attach your payment confirmation screenshot."}
                       </p>
                    </div>

                    {currentStep === 1 ? (
                      <form onSubmit={handleNextStep} className="space-y-6">
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

                        <button
                          type="submit"
                          className="w-full bg-brown hover:bg-brown/90 text-white font-black py-5 rounded-2xl flex items-center justify-center gap-3 transition-all active:scale-[0.98] shadow-xl shadow-brown/20 text-sm uppercase tracking-widest"
                        >
                          Continue to Payment
                        </button>
                      </form>
                    ) : (
                      <form onSubmit={handleSubmit} className="space-y-8">
                        <div className="bg-accent/20 p-6 rounded-[2rem] border border-accent/30">
                           <div className="flex justify-between items-center mb-4">
                              <span className="text-[10px] font-black uppercase text-gray-400 tracking-[0.2em]">Total Amount</span>
                              <span className="text-3xl font-black text-black">₹{subscriptionAmount}</span>
                           </div>
                           <p className="text-xs text-gray-500 font-bold leading-relaxed">
                              Please complete the payment and upload the screenshot below. Your subscription will be activated after verification.
                           </p>
                        </div>

                        <div>
                          <label className="text-[10px] font-bold text-gray-400 uppercase tracking-widest mb-3 block ml-1">Payment Confirmation Screenshot</label>
                          <div className="flex flex-col items-center gap-6">
                            <div className="relative w-full aspect-video rounded-3xl bg-accent/10 flex items-center justify-center overflow-hidden border-2 border-dashed border-gray-100 group transition-all hover:border-primary/50">
                              {formData.payment_screenshot_url ? (
                                <img src={formData.payment_screenshot_url} alt="Payment" className="w-full h-full object-cover" />
                              ) : (
                                <div className="flex flex-col items-center text-gray-300 transition-all group-hover:text-primary/50">
                                   <FontAwesomeIcon icon={faUpload} className="text-4xl mb-3" />
                                   <span className="font-black text-xs uppercase">Choose File</span>
                                </div>
                              )}
                              {isUploading && (
                                <div className="absolute inset-0 bg-white/80 flex items-center justify-center">
                                   <div className="w-8 h-8 border-4 border-primary border-t-transparent animate-spin rounded-full"></div>
                                </div>
                              )}
                              <input type="file" className="absolute inset-0 opacity-0 cursor-pointer" accept="image/*" onChange={handleFileUpload} />
                            </div>
                            
                            <div className="w-full flex gap-4">
                               <button 
                                 type="button"
                                 onClick={() => setCurrentStep(1)}
                                 className="flex-1 bg-gray-50 text-gray-500 font-bold py-5 rounded-2xl hover:bg-gray-100 transition-all active:scale-95"
                               >
                                  Go Back
                               </button>
                               <button
                                 type="submit"
                                 disabled={isSubmitting || isUploading}
                                 className="flex-[2] bg-brown hover:bg-brown/90 text-white font-black py-5 rounded-2xl flex items-center justify-center gap-3 transition-all active:scale-[0.98] shadow-xl shadow-brown/20 text-sm uppercase tracking-widest disabled:opacity-50"
                               >
                                 {isSubmitting ? "Submitting..." : (
                                   <>
                                     <FontAwesomeIcon icon={faCheckCircle} />
                                     Confirm & Subscribe
                                   </>
                                 )}
                               </button>
                            </div>
                          </div>
                        </div>
                      </form>
                    )}
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
