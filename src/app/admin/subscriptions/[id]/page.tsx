"use client";

import { useState, useEffect } from "react";
import { useRouter, useParams } from "next/navigation";
import Image from "next/image";
import Link from "next/link";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faArrowLeft, faUser, faCalendarAlt, faMapMarkerAlt, faPhone, faEnvelope, faTrash, faEdit, faCheckCircle, faClock, faCalendarPlus } from "@fortawesome/free-solid-svg-icons";
import { supabase } from "@/lib/supabase";

interface Subscription {
  id: string;
  customer_name: string;
  customer_email: string;
  customer_phone: string;
  address: string;
  plan_details: string;
  status: string;
  created_at: string;
  location_link?: string;
  street?: string;
  payment_screenshot_url?: string;
  amount_paid?: number;
}

interface Delivery {
  id: string;
  delivery_date: string;
  status: string;
  notes: string;
}

export default function SubscriberDetailsPage() {
  const router = useRouter();
  const { id } = useParams();
  const [isAuthorized, setIsAuthorized] = useState(false);
  const [subscriber, setSubscriber] = useState<Subscription | null>(null);
  const [deliveries, setDeliveries] = useState<Delivery[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  const [isAddingPast, setIsAddingPast] = useState(false);
  const [pastDate, setPastDate] = useState(new Date().toISOString().split('T')[0]);

  useEffect(() => {
    const isAdmin = localStorage.getItem("isAdminAuthenticated");
    if (isAdmin !== "true") {
      router.push("/admin/login");
    } else {
      setIsAuthorized(true);
      fetchData();
    }
  }, [router, id]);

  async function fetchData() {
    setIsLoading(true);
    
    // Fetch subscriber details
    const { data: subData, error: subError } = await supabase
      .from("subscriptions")
      .select("*")
      .eq("id", id)
      .single();

    if (subError) {
      console.error("Error fetching subscriber:", subError);
      router.push("/admin/subscriptions");
      return;
    }

    setSubscriber(subData);

    // Fetch delivery history
    const { data: delData } = await supabase
      .from("deliveries")
      .select("*")
      .eq("subscription_id", id)
      .order("delivery_date", { ascending: false });

    setDeliveries(delData || []);
    setIsLoading(false);
  }

  const handleDeleteSub = async () => {
    if (confirm("Are you sure you want to delete this subscriber's folder? All history will be lost.")) {
      const { error } = await supabase.from("subscriptions").delete().eq("id", id);
      if (error) alert("Error deleting subscriber");
      else router.push("/admin/subscriptions");
    }
  };

  const handleAddDelivery = async () => {
    const { error } = await supabase.from("deliveries").insert([{
      subscription_id: id,
      delivery_date: pastDate,
      status: 'delivered'
    }]);

    if (error) {
      if (error.code === '23505') alert("Delivery already marked for this date!");
      else alert("Error adding delivery");
    } else {
      setIsAddingPast(false);
      fetchData();
    }
  };

  const removeDelivery = async (delId: string) => {
    if (confirm("Remove this delivery log?")) {
      const { error } = await supabase.from("deliveries").delete().eq("id", delId);
      if (error) alert("Error removing log");
      else fetchData();
    }
  };

  if (!isAuthorized || isLoading) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-accent/30 text-primary">
        <div className="animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-current"></div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-accent/30 p-4 md:p-8">
      <div className="container mx-auto max-w-5xl">
        {/* Header Navigation */}
        <div className="flex items-center justify-between mb-10">
           <div className="flex items-center gap-4">
              <Link href="/admin/subscriptions" className="w-12 h-12 rounded-2xl bg-white border border-gray-100 flex items-center justify-center hover:bg-gray-50 shadow-sm transition-all">
                <FontAwesomeIcon icon={faArrowLeft} />
              </Link>
              <div>
                <h1 className="text-3xl font-black text-black">Subscriber Account</h1>
                <p className="text-gray-500 font-bold text-sm uppercase tracking-widest">Customer Folder: {subscriber?.id.slice(0, 8)}</p>
              </div>
           </div>
           <div className="flex gap-3">
              <button 
                onClick={handleDeleteSub}
                className="bg-red-50 text-red-600 font-bold px-6 py-3 rounded-xl border border-red-100 hover:bg-red-100 transition-all flex items-center gap-2"
              >
                <FontAwesomeIcon icon={faTrash} />
                Delete Folder
              </button>
           </div>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
           {/* Left Column: Personal Info Card */}
           <div className="lg:col-span-1 space-y-6">
              <div className="bg-white p-8 rounded-[3rem] shadow-xl border border-gray-100">
                 <div className="w-20 h-20 bg-secondary/10 text-secondary rounded-[2rem] flex items-center justify-center text-3xl mb-6 mx-auto">
                    <FontAwesomeIcon icon={faUser} />
                 </div>
                 <h2 className="text-2xl font-black text-center mb-1 text-black uppercase tracking-tight">{subscriber?.customer_name}</h2>
                 <p className="text-primary font-black text-center text-xs uppercase tracking-[0.2em] mb-8">{subscriber?.plan_details}</p>
                 
                 <div className="space-y-4 pt-6 border-t border-gray-100">
                    <div className="flex items-center gap-4 text-gray-800">
                       <span className="w-8 h-8 rounded-lg bg-accent flex items-center justify-center text-gray-400"><FontAwesomeIcon icon={faPhone} size="xs" /></span>
                       <span className="font-bold">{subscriber?.customer_phone}</span>
                    </div>
                    <div className="flex items-center gap-4 text-gray-800">
                       <span className="w-8 h-8 rounded-lg bg-accent flex items-center justify-center text-gray-400"><FontAwesomeIcon icon={faEnvelope} size="xs" /></span>
                       <span className="font-bold text-sm line-clamp-1">{subscriber?.customer_email || 'No email provided'}</span>
                    </div>
                     <div className="flex items-start gap-4 text-gray-800">
                       <span className="w-8 h-8 rounded-lg bg-accent flex items-center justify-center text-gray-400 mt-1 shrink-0"><FontAwesomeIcon icon={faMapMarkerAlt} size="xs" /></span>
                       <div className="flex flex-col gap-1">
                          <span className="font-bold text-sm leading-relaxed">{subscriber?.address}</span>
                          {subscriber?.street && <span className="text-[10px] font-black uppercase text-gray-400">Street: {subscriber.street}</span>}
                          {subscriber?.location_link && (
                            <a href={subscriber.location_link} target="_blank" rel="noopener noreferrer" className="text-secondary hover:underline font-black text-[10px] uppercase tracking-widest mt-1">View on Google Maps</a>
                          )}
                       </div>
                    </div>
                 </div>
              </div>

              {subscriber?.payment_screenshot_url && (
                <div className="bg-white p-8 rounded-[3rem] shadow-xl border border-gray-100">
                  <h4 className="font-black text-sm mb-4 uppercase tracking-[0.2em] text-gray-400">Payment Proof</h4>
                  <div className="relative aspect-square w-full rounded-2xl overflow-hidden border border-gray-100 bg-accent/20">
                    <Image src={subscriber.payment_screenshot_url} alt="Payment" fill className="object-cover" />
                  </div>
                  <div className="mt-4 flex justify-between items-center px-1">
                    <span className="text-[10px] font-black uppercase text-gray-400">Amount Paid</span>
                    <span className="text-lg font-black text-primary">₹{subscriber?.amount_paid || '0'}</span>
                  </div>
                </div>
              )}

              <div className="bg-primary p-8 rounded-[3rem] shadow-xl text-black">
                 <h4 className="font-black text-lg mb-4 uppercase tracking-tight">Delivery Performance</h4>
                 <div className="flex items-end gap-2 mb-2">
                    <span className="text-5xl font-black">{deliveries.length}</span>
                    <span className="font-black text-sm mb-2 text-black/60">Days Delivered</span>
                 </div>
                 <p className="text-xs font-bold text-black/60 leading-relaxed uppercase tracking-widest">Since {new Date(subscriber?.created_at || '').toDateString()}</p>
              </div>
           </div>

           {/* Right Column: delivery History Log */}
           <div className="lg:col-span-2">
              <div className="bg-white rounded-[3rem] shadow-xl border border-gray-100 overflow-hidden min-h-[600px] flex flex-col">
                 <div className="p-8 border-b flex justify-between items-center">
                    <div>
                      <h3 className="text-xl font-black text-black">Delivery History</h3>
                      <p className="text-sm font-bold text-gray-400 uppercase tracking-widest mt-1">Manual logging system</p>
                    </div>
                    <button 
                      onClick={() => setIsAddingPast(true)}
                      className="bg-accent text-primary font-black px-5 py-3 rounded-xl hover:bg-primary hover:text-white transition-all flex items-center gap-2"
                    >
                      <FontAwesomeIcon icon={faCalendarPlus} />
                      Log Past Delivery
                    </button>
                 </div>

                 {isAddingPast && (
                   <div className="p-8 bg-primary/5 border-b animate-in slide-in-from-top duration-300">
                      <div className="flex items-end gap-4">
                         <div className="flex-1">
                            <label className="text-[10px] font-black text-gray-400 uppercase tracking-widest ml-1 mb-1 block">Select Date</label>
                            <input 
                              type="date" 
                              className="w-full bg-white border-none rounded-xl py-3 px-4 font-bold outline-none ring-2 ring-primary/20 focus:ring-primary"
                              value={pastDate}
                              onChange={e => setPastDate(e.target.value)}
                            />
                         </div>
                         <button 
                           onClick={handleAddDelivery}
                           className="bg-primary text-black font-black px-6 py-3 rounded-xl shadow-lg h-[48px]"
                         >
                           Add Log
                         </button>
                         <button 
                           onClick={() => setIsAddingPast(false)}
                           className="bg-white border border-gray-200 text-gray-500 font-bold px-6 py-3 rounded-xl h-[48px]"
                         >
                           Cancel
                         </button>
                      </div>
                   </div>
                 )}

                 <div className="flex-1 p-8">
                    {deliveries.length === 0 ? (
                       <div className="h-full flex flex-col items-center justify-center text-center opacity-30">
                          <FontAwesomeIcon icon={faCalendarAlt} className="text-5xl mb-4" />
                          <p className="font-black italic">No history logged yet</p>
                       </div>
                    ) : (
                       <div className="space-y-4">
                          {deliveries.map((del) => (
                            <div key={del.id} className="group flex items-center justify-between p-5 rounded-2xl bg-accent/30 border border-gray-50 hover:bg-accent/50 transition-all">
                               <div className="flex items-center gap-5">
                                  <div className="w-10 h-10 rounded-full bg-green-500 text-white flex items-center justify-center shadow-lg shadow-green-100">
                                     <FontAwesomeIcon icon={faCheckCircle} />
                                  </div>
                                  <div>
                                     <span className="font-black text-gray-800 block text-lg">{new Date(del.delivery_date).toDateString()}</span>
                                     <span className="text-[10px] font-black text-green-600 uppercase tracking-widest">Delivered Successfully</span>
                                  </div>
                               </div>
                               <button 
                                 onClick={() => removeDelivery(del.id)}
                                 className="opacity-0 group-hover:opacity-100 w-10 h-10 rounded-xl bg-red-100 text-red-500 hover:bg-red-500 hover:text-white transition-all flex items-center justify-center"
                               >
                                  <FontAwesomeIcon icon={faTrash} size="sm" />
                               </button>
                            </div>
                          ))}
                       </div>
                    )}
                 </div>
              </div>
           </div>
        </div>
      </div>
    </div>
  );
}
