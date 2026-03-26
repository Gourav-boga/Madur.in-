"use client";

import { useState, useEffect } from "react";
import { useRouter } from "next/navigation";
import Image from "next/image";
import Link from "next/link";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faPlus, faTrash, faArrowLeft, faImages, faCheck, faClock, faUserPlus, faChevronRight } from "@fortawesome/free-solid-svg-icons";


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
  product_id?: string;
  quantity?: number;
  products?: {
    name: string;
    unit: string;
  };
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
    plan_details: "",
    status: "active",
    product_id: "",
    quantity: 1,
    street: "",
    location_link: ""
  });
  const [dairyProducts, setDairyProducts] = useState<any[]>([]);
  const [selectedDate, setSelectedDate] = useState(new Date().toISOString().split('T')[0]);

  useEffect(() => {
    const isAdmin = sessionStorage.getItem("isAdminAuthenticated");
    if (isAdmin !== "true") {
      router.push("/admin/login");
    } else {
      setIsAuthorized(true);
      fetchData();
    }
  }, [selectedDate]);

  async function fetchData() {
    setIsLoading(true);
    try {
      // 1. Fetch Products
      const prodRes = await fetch("/api/products");
      const prodData = await prodRes.json();
      setDairyProducts(Array.isArray(prodData) ? prodData : []);
      if (Array.isArray(prodData) && prodData.length > 0 && !formData.product_id) {
        setFormData(prev => ({ ...prev, product_id: prodData[0].id }));
      }

      // 2. Fetch all subscriptions
      const subRes = await fetch("/api/subscriptions");
      const fetchedSubData = await subRes.json();

      // 3. Fetch all deliveries (to calculate counts)
      const delAllRes = await fetch("/api/deliveries");
      const allDeliveries = await delAllRes.json();

      // Calculate delivery counts
      const counts: Record<string, number> = {};
      (Array.isArray(allDeliveries) ? allDeliveries : []).forEach((d: any) => {
        counts[d.subscription_id] = (counts[d.subscription_id] || 0) + 1;
      });

      // 4. Fetch today's deliveries
      const delTodayRes = await fetch(`/api/deliveries?date=${selectedDate}`);
      const dateDel = await delTodayRes.json();
      setDeliveriesToday(Array.isArray(dateDel) ? dateDel : []);

      // Enrich subscriptions with counts and product names
      const enrichedSubscriptions = (Array.isArray(fetchedSubData) ? fetchedSubData : []).map((sub: any) => {
        const prod = (Array.isArray(prodData) ? prodData : []).find((p: any) => p.id === sub.product_id);
        return {
          ...sub,
          delivery_count: counts[sub.id] || 0,
          products: prod ? { name: prod.name, unit: prod.unit } : null
        };
      });

      setSubscriptions(enrichedSubscriptions);

    } catch (err) {
      console.error("Error fetching admin data:", err);
    } finally {
      setIsLoading(false);
    }
  }

  const handleAddSubscription = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsLoading(true);

    try {
      const selectedProd = dairyProducts.find(p => p.id === formData.product_id);
      const finalPlanDetails = formData.plan_details || `Daily ${formData.quantity}${selectedProd?.unit || 'L'} ${selectedProd?.name || 'Milk'}`;

      const response = await fetch("/api/subscriptions", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          ...formData,
          plan_details: finalPlanDetails
        })
      });

      if (!response.ok) throw new Error("Failed to add subscription");

      setIsModalOpen(false);
      setFormData({
        customer_name: "",
        customer_email: "",
        customer_phone: "",
        address: "",
        plan_details: "",
        status: "active",
        product_id: dairyProducts[0]?.id || "",
        quantity: 1,
        street: "",
        location_link: ""
      });
      fetchData();
    } catch (err) {
      alert("Error adding subscription!");
    } finally {
      setIsLoading(false);
    }
  };

  const deleteSubscriber = async (subId: string, name: string) => {
    if (!confirm(`Delete "${name}"? This will also remove all their delivery history.`)) return;
    try {
      const response = await fetch(`/api/subscriptions?id=${subId}`, { method: "DELETE" });
      if (!response.ok) throw new Error("Failed to delete");
      fetchData();
    } catch (err) {
      alert("Error deleting subscriber!");
    }
  };

  const toggleDelivery = async (subId: string) => {
    const existing = deliveriesToday.find(d => d.subscription_id === subId);
    try {
      if (existing) {
        await fetch(`/api/deliveries?id=${existing.id}`, { method: "DELETE" });
      } else {
        await fetch("/api/deliveries", {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify({
            subscription_id: subId,
            delivery_date: selectedDate,
            status: 'delivered'
          })
        });
      }
      fetchData();
    } catch (err) {
      alert("Error toggling delivery!");
    }
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
              <p className="text-gray-500 font-bold text-sm uppercase tracking-widest">Active Date: {new Date(selectedDate).toDateString()}</p>
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
            <div className="p-8 border-b bg-primary/5 flex flex-col md:flex-row justify-between items-center gap-4">
              <div>
                <h3 className="text-xl font-black text-black">Active Subscribers & Daily Tracking</h3>
                <p className="text-sm text-gray-400 font-bold mt-1 uppercase tracking-widest">Mark delivery status for {new Date(selectedDate).toLocaleDateString()}</p>
              </div>
              <div className="flex items-center gap-3 bg-white p-2 rounded-2xl shadow-sm border border-gray-100">
                 <span className="text-[10px] font-black text-gray-400 uppercase tracking-widest ml-2">Change Date:</span>
                 <input 
                   type="date" 
                   className="bg-accent/50 border-none rounded-xl py-2 px-4 font-bold outline-none focus:ring-2 ring-primary/20 text-sm cursor-pointer"
                   value={selectedDate}
                   onChange={(e) => setSelectedDate(e.target.value)}
                 />
              </div>
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
                  {(!Array.isArray(subscriptions) || subscriptions.length === 0) ? (
                    <tr><td colSpan={5} className="px-8 py-20 text-center text-gray-400 font-bold">No active subscribers found.</td></tr>
                  ) : subscriptions.map(sub => {
                    const isDelivered = Array.isArray(deliveriesToday) && deliveriesToday.some(d => d.subscription_id === sub.id);
                    return (
                      <tr
                        key={sub.id}
                        className={`hover:bg-gray-50/50 transition-colors cursor-pointer ${isDelivered ? 'bg-green-50/30' : ''}`}
                        onClick={(e) => {
                          if ((e.target as HTMLElement).closest('button') || (e.target as HTMLElement).closest('a')) return;
                          router.push(`/admin/subscriptions/${sub.id}`);
                        }}
                      >
                        <td className="px-8 py-6 text-center">
                          <button
                            onClick={() => toggleDelivery(sub.id)}
                            className={`w-12 h-12 rounded-2xl flex items-center justify-center transition-all shadow-md active:scale-90 ${isDelivered ? 'bg-green-500 text-white shadow-green-200' : 'bg-white text-gray-300 border border-gray-100 hover:border-primary/50'}`}
                          >
                            <FontAwesomeIcon icon={isDelivered ? faCheck : faClock} className={isDelivered ? 'text-xl' : 'text-lg'} />
                          </button>
                        </td>
                        <td className="px-8 py-6">
                          <Link href={`/admin/subscriptions/${sub.id}`} className="group/name flex flex-col">
                            <span className="font-black text-gray-800 text-sm uppercase tracking-tight group-hover/name:text-primary transition-colors">{sub.customer_name}</span>
                            <div className="flex items-center gap-2">
                              <span className="text-[10px] text-primary font-black uppercase">
                                {(sub.quantity ?? 1) >= 1 ? `${sub.quantity ?? 1} L` : `${Math.round((sub.quantity ?? 1) * 1000)} ml`}
                              </span>
                              <span className="text-[10px] text-gray-400 font-bold uppercase">•</span>
                              <span className="text-[10px] text-secondary font-black uppercase">Fresh Milk</span>
                            </div>
                            <span className="text-[10px] text-gray-400 font-bold uppercase">{sub.customer_phone}</span>
                          </Link>
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
                          <div className="flex items-center justify-end gap-2">
                            <button
                              onClick={() => deleteSubscriber(sub.id, sub.customer_name)}
                              className="w-10 h-10 rounded-xl bg-red-50 text-red-400 flex items-center justify-center hover:bg-red-500 hover:text-white transition-all shadow-sm"
                              title="Delete customer"
                            >
                              <FontAwesomeIcon icon={faTrash} size="sm" />
                            </button>
                            <Link
                              href={`/admin/subscriptions/${sub.id}`}
                              className="w-10 h-10 rounded-xl bg-accent text-primary flex items-center justify-center hover:bg-primary hover:text-white transition-all shadow-sm"
                            >
                              <FontAwesomeIcon icon={faChevronRight} />
                            </Link>
                          </div>
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
                  onChange={e => setFormData({ ...formData, customer_name: e.target.value })}
                />
              </div>
              <div>
                <label className="text-[10px] font-black text-gray-400 uppercase tracking-widest ml-1">Customer Email (to link with account)</label>
                <input required type="email"
                  className="w-full bg-accent/50 rounded-2xl py-4 px-6 font-bold outline-none border-none focus:ring-4 ring-primary/20 text-black"
                  placeholder="customer@email.com"
                  value={formData.customer_email}
                  onChange={e => setFormData({ ...formData, customer_email: e.target.value })}
                />
              </div>
              <div className="grid grid-cols-2 gap-4">
                <div>
                  <label className="text-[10px] font-black text-gray-400 uppercase tracking-widest ml-1">Phone</label>
                  <input required
                    className="w-full bg-accent/50 rounded-2xl py-4 px-6 font-bold outline-none border-none focus:ring-4 ring-primary/20 text-black"
                    value={formData.customer_phone}
                    onChange={e => setFormData({ ...formData, customer_phone: e.target.value })}
                  />
                </div>
                <div>
                  <label className="text-[10px] font-black text-gray-400 uppercase tracking-widest ml-1">Quantity (Daily)</label>
                  <select
                    required
                    className="w-full bg-accent/50 rounded-2xl py-4 px-6 font-bold outline-none border-none focus:ring-4 ring-primary/20 appearance-none text-black"
                    value={formData.quantity}
                    onChange={e => setFormData({ ...formData, quantity: parseFloat(e.target.value) })}
                  >
                    <option value="1">1 Litre</option>
                    <option value="0.5">500 ml</option>
                    <option value="1.5">1.5 Litres</option>
                    <option value="2">2 Litres</option>
                  </select>
                </div>
              </div>
              <div>
                <label className="text-[10px] font-black text-gray-400 uppercase tracking-widest ml-1">Plan Details (Optional)</label>
                <input
                  placeholder="e.g. Daily 1L Milk (Auto-generated if empty)"
                  className="w-full bg-accent/50 rounded-2xl py-4 px-6 font-bold outline-none border-none focus:ring-4 ring-primary/20 text-black"
                  value={formData.plan_details}
                  onChange={e => setFormData({ ...formData, plan_details: e.target.value })}
                />
              </div>
              <div>
                <label className="text-[10px] font-black text-gray-400 uppercase tracking-widest ml-1">Street / Landmark / House No.</label>
                <input
                  className="w-full bg-accent/50 rounded-2xl py-4 px-6 font-bold outline-none border-none focus:ring-4 ring-primary/20 text-black"
                  placeholder="e.g. Near Hanuman Temple, Road No 1"
                  value={formData.street}
                  onChange={e => setFormData({ ...formData, street: e.target.value })}
                />
              </div>
              <div>
                <label className="text-[10px] font-black text-gray-400 uppercase tracking-widest ml-1">Location Link (Google Maps)</label>
                <input
                  type="url"
                  className="w-full bg-accent/50 rounded-2xl py-4 px-6 font-bold outline-none border-none focus:ring-4 ring-primary/20 text-black"
                  placeholder="https://maps.google.com/..."
                  value={formData.location_link}
                  onChange={e => setFormData({ ...formData, location_link: e.target.value })}
                />
              </div>
              <div>
                <label className="text-[10px] font-black text-gray-400 uppercase tracking-widest ml-1">Address</label>
                <textarea required
                  className="w-full bg-accent/50 rounded-2xl py-4 px-6 font-bold outline-none border-none focus:ring-4 ring-primary/20 h-24 text-black"
                  value={formData.address}
                  onChange={e => setFormData({ ...formData, address: e.target.value })}
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
