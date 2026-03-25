"use client";

import Link from "next/link";
import { useState, useEffect } from "react";
import { useRouter } from "next/navigation";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faBox, faShoppingBag, faPlus, faSignOutAlt, faCog, faChartLine, faUsers } from "@fortawesome/free-solid-svg-icons";


export default function AdminDashboard() {
  const router = useRouter();
  const [isAuthorized, setIsAuthorized] = useState(false);
  const [counts, setCounts] = useState({
    products: 0,
    pendingOrders: 0,
    todayRevenue: 0,
    yesterdayRevenue: 0,
    completedDeliveries: 0
  });
  const [recentSubs, setRecentSubs] = useState<any[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  const [selectedDate, setSelectedDate] = useState(new Date().toISOString().split('T')[0]);
  const [customRevenue, setCustomRevenue] = useState<number | null>(null);
  const [isCheckingCustom, setIsCheckingCustom] = useState(false);

  useEffect(() => {
    fetchDashboardData();
    setIsAuthorized(true);
  }, []);

  async function fetchDashboardData() {
    setIsLoading(true);
    try {
      const res = await fetch("/api/admin/stats");
      const data = await res.json();
      
      setCounts({
        products: data.products || 0,
        pendingOrders: data.activeSubscriptions || 0,
        todayRevenue: data.todayRevenue || 0,
        yesterdayRevenue: data.yesterdayRevenue || 0,
        completedDeliveries: data.completedDeliveries || 0
      });
      setRecentSubs(data.recentSubs || []);
    } catch (err) {
      console.error("Error fetching dashboard stats:", err);
    } finally {
      setIsLoading(false);
    }
  }

  const checkCustomRevenue = async () => {
    setIsCheckingCustom(true);
    try {
      const res = await fetch(`/api/admin/stats?date=${selectedDate}`);
      const data = await res.json();
      setCustomRevenue(data.customRevenue || 0);
    } catch (err) {
      console.error("Error checking custom revenue:", err);
    } finally {
      setIsCheckingCustom(false);
    }
  };

  // Handle Logout
  const handleLogout = () => {
    sessionStorage.removeItem("isAdminAuthenticated");
    router.push("/admin/login");
  };

  if (!isAuthorized) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-accent/30">
        <div className="animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-primary"></div>
      </div>
    );
  }

  const stats = [
    { label: "Today's Revenue", value: `₹${counts.todayRevenue.toLocaleString()}`, icon: faChartLine, color: "bg-green-500" },
    { label: "Yesterday's Revenue", value: `₹${counts.yesterdayRevenue.toLocaleString()}`, icon: faUsers, color: "bg-purple-500" },
    { label: "Active Subscriptions", value: counts.pendingOrders.toString(), icon: faShoppingBag, color: "bg-orange-500" },
    { label: "Deliveries Done", value: counts.completedDeliveries.toString(), icon: faPlus, color: "bg-indigo-500" },
    { label: "Total Products", value: counts.products.toString(), icon: faBox, color: "bg-blue-500" },
  ];

  return (
    <div className="min-h-screen bg-accent/30 p-4 md:p-8">
      {/* Admin Header */}
      <div className="flex flex-col md:flex-row justify-between items-center mb-10 gap-4">
        <div>
          <h1 className="text-3xl font-black text-black">Admin Dashboard</h1>
          <p className="text-gray-500">Manage your farm-fresh business here.</p>
        </div>
        <div className="flex gap-4">
          <Link href="/admin/products" className="bg-white text-gray-800 font-bold px-6 py-3 rounded-xl shadow-sm border hover:bg-gray-50 transition-all flex items-center gap-2">
            <FontAwesomeIcon icon={faBox} />
            Manage Products
          </Link>
          <Link href="/admin/settings" className="bg-white text-gray-800 font-bold px-6 py-3 rounded-xl shadow-sm border hover:bg-gray-50 transition-all flex items-center gap-2">
            <FontAwesomeIcon icon={faCog} />
            Settings
          </Link>
          <button 
            onClick={handleLogout}
            className="bg-red-50 text-red-600 font-bold px-6 py-3 rounded-xl border border-red-100 hover:bg-red-100 transition-all flex items-center gap-2"
          >
            <FontAwesomeIcon icon={faSignOutAlt} />
            Logout
          </button>
        </div>
      </div>

      {/* Stats Grid */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-5 gap-6 mb-10">
        {(Array.isArray(stats) ? stats : []).map((stat, i) => (
          <div key={i} className="bg-white p-6 rounded-[2rem] shadow-sm border border-gray-100 flex flex-col gap-4 hover:shadow-md transition-all">
            <div className={`w-12 h-12 ${stat.color} text-white rounded-xl flex items-center justify-center shadow-lg shrink-0`}>
              <FontAwesomeIcon icon={stat.icon} className="text-xl" />
            </div>
            <div>
              <p className="text-[10px] font-black text-gray-400 uppercase tracking-widest mb-1">{stat.label}</p>
              <h3 className="text-2xl font-black text-black">{isLoading ? "..." : stat.value}</h3>
            </div>
          </div>
        ))}
      </div>


      <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
        {/* Recent Subscriptions Preview */}
        <div className="lg:col-span-2 bg-white rounded-[2.5rem] shadow-sm border border-gray-100 overflow-hidden">
          <div className="p-8 border-b flex justify-between items-center text-black">
            <h3 className="text-xl font-black">Recent Subscribers</h3>
            <Link href="/admin/subscriptions" className="text-primary font-bold text-sm hover:underline">View All</Link>
          </div>
          <div className="overflow-x-auto text-black">
            <table className="w-full text-left">
              <thead>
                <tr className="bg-accent/50 text-gray-500 text-xs font-black uppercase tracking-widest">
                  <th className="px-8 py-4">Customer</th>
                  <th className="px-8 py-4">Phone</th>
                  <th className="px-8 py-4">Status</th>
                  <th className="px-8 py-4">Details</th>
                </tr>
              </thead>
              <tbody className="text-sm font-medium">
                {(!Array.isArray(recentSubs) || recentSubs.length === 0) ? (
                  <tr><td colSpan={4} className="px-8 py-10 text-center text-gray-400">No subscribers found</td></tr>
                ) : recentSubs.map((sub, i) => (
                  <tr 
                    key={sub.id || i} 
                    className="border-b last:border-none hover:bg-gray-50 transition-colors group cursor-pointer"
                    onClick={() => sub.id && router.push(`/admin/subscriptions/${sub.id}`)}
                  >
                    <td className="px-8 py-4">
                      <div className="flex items-center gap-3">
                        <div className="w-8 h-8 rounded-lg bg-accent flex items-center justify-center text-primary/60 group-hover:bg-primary group-hover:text-white transition-all">
                          <FontAwesomeIcon icon={faUsers} size="xs" />
                        </div>
                        <span className="text-gray-800 font-bold group-hover:text-primary transition-colors">{sub.customer_name || "Unknown"}</span>
                      </div>
                    </td>
                    <td className="px-8 py-4 text-xs font-bold text-gray-500">{sub.customer_phone}</td>
                    <td className="px-8 py-4">
                      <span className={`px-3 py-1 rounded-full text-[10px] font-black uppercase ${sub.status === 'active' ? 'text-green-500 bg-green-50' : 'text-gray-500 bg-gray-50'}`}>
                        {sub.status}
                      </span>
                    </td>
                    <td className="px-8 py-4 text-right">
                       <button 
                         onClick={(e) => {
                           e.stopPropagation();
                           if (sub.id) router.push(`/admin/subscriptions/${sub.id}`);
                         }}
                         className="bg-primary text-black font-black px-4 py-2 rounded-xl text-[10px] uppercase tracking-widest hover:opacity-90 flex items-center justify-center ml-auto"
                       >
                         Open Folder
                       </button>
                    </td>
                  </tr>
                ))}

              </tbody>
            </table>
          </div>
        </div>

          <div className="bg-white p-8 rounded-[2.5rem] shadow-sm border border-gray-100">
            <h3 className="text-xl font-black mb-6 text-black">Revenue Lookup</h3>
            <div className="flex flex-col gap-4">
              <div className="relative">
                <input 
                  type="date" 
                  className="w-full bg-accent/50 border-none rounded-2xl py-4 px-6 font-bold outline-none ring-2 ring-primary/10 focus:ring-primary transition-all text-sm"
                  value={selectedDate}
                  onChange={(e) => setSelectedDate(e.target.value)}
                />
              </div>
              <button 
                onClick={checkCustomRevenue}
                disabled={isCheckingCustom}
                className="w-full bg-black text-white font-black py-4 rounded-2xl shadow-xl hover:bg-gray-800 transition-all flex items-center justify-center gap-3 active:scale-95"
              >
                {isCheckingCustom ? (
                  <div className="w-5 h-5 border-2 border-white/30 border-t-white rounded-full animate-spin"></div>
                ) : (
                  <>
                    <FontAwesomeIcon icon={faChartLine} />
                    Check Revenue
                  </>
                )}
              </button>
              
              {customRevenue !== null && (
                <div className="mt-4 p-6 rounded-3xl bg-primary/10 border border-primary/20 text-center animate-in zoom-in duration-300">
                  <p className="text-[10px] font-black text-primary uppercase tracking-[0.2em] mb-1">Total Earned on {new Date(selectedDate).toDateString()}</p>
                  <p className="text-4xl font-black text-black">₹{customRevenue.toLocaleString()}</p>
                </div>
              )}
            </div>
          </div>

          <div className="bg-white p-8 rounded-[2.5rem] shadow-sm border border-gray-100">
            <h3 className="text-xl font-black mb-6 text-black">Management</h3>
            <div className="flex flex-col gap-4">
              <Link href="/admin/products" className="w-full bg-primary text-black font-black py-4 rounded-2xl shadow-lg hover:opacity-90 transition-all flex items-center justify-center gap-3">
                <FontAwesomeIcon icon={faBox} />
                Products
              </Link>
              <Link href="/admin/subscriptions" className="w-full bg-blue-600 text-white font-black py-4 rounded-2xl shadow-lg hover:opacity-90 transition-all flex items-center justify-center gap-3">
                <FontAwesomeIcon icon={faShoppingBag} />
                Subscriptions
              </Link>
              <Link href="/admin/categories" className="w-full bg-secondary text-white font-black py-4 rounded-2xl shadow-lg hover:opacity-90 transition-all flex items-center justify-center gap-3">
                <FontAwesomeIcon icon={faPlus} />
                Categories
              </Link>
              <Link href="/admin/hero" className="w-full bg-purple-600 text-white font-black py-4 rounded-2xl shadow-lg hover:opacity-90 transition-all flex items-center justify-center gap-3">
                <FontAwesomeIcon icon={faPlus} />
                Hero Section
              </Link>
              <Link href="/admin/settings" className="w-full bg-gray-800 text-white font-black py-4 rounded-2xl shadow-lg hover:opacity-90 transition-all flex items-center justify-center gap-3">
                <FontAwesomeIcon icon={faCog} />
                Global Settings
              </Link>
            </div>
          </div>

          <div className="bg-primary/10 p-8 rounded-[2.5rem] border border-primary/20">
             <h4 className="font-black text-lg mb-2 text-black text-center">Need Help?</h4>
             <p className="text-[10px] text-gray-500 font-bold text-center mb-6 uppercase tracking-widest truncate">Codtech IT Solutions Support</p>
             <button className="w-full bg-primary/20 text-primary font-black py-3 rounded-2xl text-xs uppercase tracking-widest hover:bg-primary hover:text-white transition-all">Support Ticket</button>
          </div>
        </div>
      </div>
  );
}
