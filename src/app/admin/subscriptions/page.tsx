"use client";

import { useState, useEffect } from "react";
import { useRouter } from "next/navigation";
import Image from "next/image";
import Link from "next/link";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faPlus, faTrash, faArrowLeft, faImages, faCheck, faClock, faUserPlus, faChevronRight } from "@fortawesome/free-solid-svg-icons";
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
  payment_screenshot_url?: string;
  amount_paid?: number;
  delivery_count?: number;
}

interface Delivery {
  id: string;
  subscription_id: string;
  delivery_date: string;
  status: string;
  notes: string;
}

export default function AdminSubscriptionsPage() {
  const router = useRouter();
  const [isAuthorized, setIsAuthorized] = useState(false);
  const [subscriptions, setSubscriptions] = useState<Subscription[]>([]);
  const [deliveriesToday, setDeliveriesToday] = useState<Delivery[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [formData, setFormData] = useState({
    customer_name: "",
    customer_email: "",
    customer_phone: "",
    address: "",
    plan_details: "Daily 1L Cow Milk",
    status: "active"
  });

  const today = new Date().toISOString().split('T')[0];

  useEffect(() => {
    fetchData();
    setIsAuthorized(true);
  }, []);

  async function fetchData() {
    setIsLoading(true);
    
    // Fetch all subscriptions
    const { data: subData } = await supabase.from("subscriptions").select("*").order("created_at", { ascending: false });
    
    // Fetch all deliveries to calculate counts
    const { data: allDeliveries } = await supabase.from("deliveries").select("subscription_id");
    
    // Calculate delivery counts
    const counts: Record<string, number> = {};
    allDeliveries?.forEach(d => {
      counts[d.subscription_id] = (counts[d.subscription_id] || 0) + 1;
    });

    const enrichedSubscriptions = (subData || []).map(sub => ({
      ...sub,
      delivery_count: counts[sub.id] || 0
    }));

    setSubscriptions(enrichedSubscriptions);

    // Fetch only today's deliveries for the toggle buttons
    const { data: todayDel } = await supabase.from("deliveries").select("*").eq("delivery_date", today);
    setDeliveriesToday(todayDel || []);
    
    setIsLoading(false);
  }

  const handleAddSubscription = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsLoading(true);
    const { error } = await supabase.from("subscriptions").insert([formData]);
    if (error) {
      alert("Error adding subscription!");
    } else {
      setIsModalOpen(false);
      setFormData({ 
        customer_name: "", 
        customer_email: "", 
        customer_phone: "", 
        address: "", 
        plan_details: "Daily 1L Cow Milk", 
        status: "active" 
      });
      fetchData();
    }
  };

  const toggleDelivery = async (subId: string) => {
    const existing = deliveriesToday.find(d => d.subscription_id === subId);
    if (existing) {
      await supabase.from("deliveries").delete().eq("id", existing.id);
    } else {
      await supabase.from("deliveries").insert([{
        subscription_id: subId,
        delivery_date: today,
        status: 'delivered'
      }]);
    }
    fetchData();
  };

  if (!isAuthorized) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-accent/30 text-primary">
        <div className="animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-current"></div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-accent/30 p-4 md:p-8">
      <div className="container mx-auto max-w-7xl">
        <div className="flex items-center justify-between mb-8">
          <div className="flex items-center gap-4">
            <Link href="/admin" className="w-10 h-10 rounded-full bg-white border border-gray-200 flex items-center justify-center hover:bg-gray-50 shadow-sm transition-all duration-300">
              <FontAwesomeIcon icon={faArrowLeft} />
            </Link>
            <div>
               <h1 className="text-3xl font-black text-black">Subscription Board</h1>
               <p className="text-gray-500 font-bold text-sm">Today: {new Date().toDateString()}</p>
            </div>
          </div>
          <button 
            onClick={() => setIsModalOpen(true)}
            className="bg-primary text-black font-black px-6 py-3 rounded-xl shadow-lg hover:opacity-90 transition-all flex items-center gap-2"
          >
            <FontAwesomeIcon icon={faUserPlus} />
            New Subscriber
          </button>
        </div>

        <div className="grid grid-cols-1 gap-8">
          <div className="bg-white rounded-[2.5rem] shadow-xl border border-gray-100 overflow-hidden">
             <div className="p-8 border-b bg-primary/5">
                <h3 className="text-xl font-black text-black">Active Subscribers & Daily Tracking</h3>
                <p className="text-sm text-gray-400 font-bold mt-1 uppercase tracking-widest">Mark delivery status for today</p>
             </div>

             <div className="overflow-x-auto">
               <table className="w-full text-left">
                 <thead>
                     <tr className="bg-accent/50 text-gray-500 text-[10px] font-black uppercase tracking-[0.2em]">
                       <th className="px-8 py-5 text-center">Status</th>
                       <th className="px-8 py-5">Customer</th>
                       <th className="px-8 py-5">Maps Link</th>
                       <th className="px-8 py-5">Payment Proof</th>
                       <th className="px-8 py-5 text-right">Details</th>
                    </tr>
                 </thead>
                 <tbody className="divide-y divide-gray-100">
                    {subscriptions.length === 0 ? (
                       <tr><td colSpan={5} className="px-8 py-20 text-center text-gray-400 font-bold">No active subscribers found.</td></tr>
                    ) : subscriptions.map(sub => {
                      const isDelivered = deliveriesToday.some(d => d.subscription_id === sub.id);
                      return (
                        <tr key={sub.id} className={`hover:bg-gray-50/50 transition-colors ${isDelivered ? 'bg-green-50/30' : ''}`}>
                          <td className="px-8 py-6 text-center">
                             <button 
                               onClick={() => toggleDelivery(sub.id)}
                               className={`w-12 h-12 rounded-2xl flex items-center justify-center transition-all shadow-md active:scale-90 ${isDelivered ? 'bg-green-500 text-white shadow-green-200' : 'bg-white text-gray-300 border border-gray-100 hover:border-primary/50'}`}
                             >
                                <FontAwesomeIcon icon={isDelivered ? faCheck : faClock} className={isDelivered ? 'text-xl' : 'text-lg'} />
                             </button>
                          </td>
                           <td className="px-8 py-6">
                             <div className="flex flex-col">
                                <span className="font-black text-gray-800 text-sm uppercase tracking-tight">{sub.customer_name}</span>
                                <span className="text-[10px] text-gray-400 font-bold uppercase">{sub.customer_phone}</span>
                             </div>
                           </td>
                           <td className="px-8 py-6">
                              {sub.location_link ? (
                                <a href={sub.location_link} target="_blank" rel="noopener noreferrer" className="text-secondary hover:underline font-bold text-xs uppercase tracking-tighter">Open Maps</a>
                              ) : (
                                <span className="text-gray-300 text-xs">-</span>
                              )}
                           </td>
                           <td className="px-8 py-6">
                              {sub.payment_screenshot_url ? (
                                <Link href={sub.payment_screenshot_url} target="_blank" className="relative block w-12 h-12 rounded-lg overflow-hidden border border-gray-200 hover:border-primary transition-all">
                                  <Image src={sub.payment_screenshot_url} alt="Payment" fill className="object-cover" />
                                </Link>
                              ) : (
                                <span className="text-gray-300 text-xs">-</span>
                              )}
                           </td>
                           <td className="px-8 py-6 text-right">
                             <Link 
                               href={`/admin/subscriptions/${sub.id}`} 
                               className="w-10 h-10 rounded-xl bg-accent text-primary flex items-center justify-center hover:bg-primary hover:text-white transition-all ml-auto shadow-sm"
                             >
                                <FontAwesomeIcon icon={faChevronRight} />
                             </Link>
                           </td>
                        </tr>
                      )
                    })}
                 </tbody>
               </table>
             </div>
          </div>
        </div>
      </div>

      {/* Add Subscription Modal */}
      {isModalOpen && (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/60 backdrop-blur-sm p-4 overflow-y-auto">
          <div className="bg-white rounded-[3rem] p-10 max-w-lg w-full shadow-2xl animate-in zoom-in-95 my-8">
            <h2 className="text-2xl font-black mb-6 text-black">New Subscription</h2>
            <form onSubmit={handleAddSubscription} className="space-y-4">
               <div>
                  <label className="text-[10px] font-black text-gray-400 uppercase tracking-widest ml-1">Customer Name</label>
                  <input required
                    className="w-full bg-accent/50 rounded-2xl py-4 px-6 font-bold outline-none border-none focus:ring-4 ring-primary/20 text-black"
                    value={formData.customer_name}
                    onChange={e => setFormData({...formData, customer_name: e.target.value})}
                  />
               </div>
               <div className="grid grid-cols-2 gap-4">
                  <div>
                    <label className="text-[10px] font-black text-gray-400 uppercase tracking-widest ml-1">Phone</label>
                    <input required
                      className="w-full bg-accent/50 rounded-2xl py-4 px-6 font-bold outline-none border-none focus:ring-4 ring-primary/20 text-black"
                      value={formData.customer_phone}
                      onChange={e => setFormData({...formData, customer_phone: e.target.value})}
                    />
                  </div>
                  <div>
                    <label className="text-[10px] font-black text-gray-400 uppercase tracking-widest ml-1">Plan</label>
                    <select 
                      className="w-full bg-accent/50 rounded-2xl py-4 px-6 font-bold outline-none border-none focus:ring-4 ring-primary/20 appearance-none text-black"
                      value={formData.plan_details}
                      onChange={e => setFormData({...formData, plan_details: e.target.value})}
                    >
                      <option>Daily 1L Cow Milk</option>
                      <option>Daily 500ml Buffalo Milk</option>
                      <option>Custom Plan</option>
                    </select>
                  </div>
               </div>
               <div>
                  <label className="text-[10px] font-black text-gray-400 uppercase tracking-widest ml-1">Address</label>
                  <textarea required
                    className="w-full bg-accent/50 rounded-2xl py-4 px-6 font-bold outline-none border-none focus:ring-4 ring-primary/20 h-24 text-black"
                    value={formData.address}
                    onChange={e => setFormData({...formData, address: e.target.value})}
                  />
               </div>
               <div className="flex gap-4 pt-4">
                  <button type="button" onClick={() => setIsModalOpen(false)} className="flex-1 bg-gray-100 font-bold py-4 rounded-xl text-black">Cancel</button>
                  <button type="submit" className="flex-1 bg-primary text-black font-black py-4 rounded-xl shadow-lg">Save Subscriber</button>
               </div>
            </form>
          </div>
        </div>
      )}
    </div>
  );
}
