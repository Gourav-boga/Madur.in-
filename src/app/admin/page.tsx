"use client";

import Link from "next/link";
import { useState, useEffect } from "react";
import { useRouter } from "next/navigation";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faBox, faShoppingBag, faUsers, faChartLine, faPlus, faSignOutAlt, faCog } from "@fortawesome/free-solid-svg-icons";
import { supabase } from "@/lib/supabase";

export default function AdminDashboard() {
  const router = useRouter();
  const [isAuthorized, setIsAuthorized] = useState(false);
  const [counts, setCounts] = useState({
    products: 0,
    subscriptions: 0,
    deliveries: 0,
    totalSubs: 0
  });
  const [recentSubs, setRecentSubs] = useState<any[]>([]);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    const isAdmin = localStorage.getItem("isAdminAuthenticated");
    if (isAdmin !== "true") {
      router.push("/admin/login");
    } else {
      setIsAuthorized(true);
      fetchDashboardData();
    }
  }, [router]);

  async function fetchDashboardData() {
    setIsLoading(true);
    const today = new Date().toISOString().split('T')[0];

    // Fetch counts
    const { count: prodCount } = await supabase.from("products").select("*", { count: 'exact', head: true });
    const { count: subCount } = await supabase.from("subscriptions").select("*", { count: 'exact', head: true });
    const { count: delCount } = await supabase.from("deliveries").select("*", { count: 'exact', head: true }).eq("delivery_date", today);
    
    // Fetch recent subscriptions
    const { data: recent } = await supabase
      .from("subscriptions")
      .select("*")
      .order("created_at", { ascending: false })
      .limit(5);

    setCounts({
      products: prodCount || 0,
      subscriptions: subCount || 0,
      deliveries: delCount || 0,
      totalSubs: subCount || 0
    });
    setRecentSubs(recent || []);
    setIsLoading(false);
  }

  // Handle Logout
  const handleLogout = () => {
    localStorage.removeItem("isAdminAuthenticated");
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
    { label: "Total Products", value: counts.products.toString(), icon: faBox, color: "bg-blue-500" },
    { label: "Active Subscriptions", value: counts.subscriptions.toString(), icon: faShoppingBag, color: "bg-green-500" },
    { label: "Daily Deliveries", value: `${counts.deliveries}/${counts.totalSubs}`, icon: faUsers, color: "bg-purple-500" },
    { label: "Monthly Revenue", value: "₹42,500", icon: faChartLine, color: "bg-primary" },
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
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6 mb-10">
        {stats.map((stat, i) => (
          <div key={i} className="bg-white p-6 rounded-3xl shadow-sm border border-gray-100 flex items-center gap-6">
            <div className={`w-14 h-14 ${stat.color} text-white rounded-2xl flex items-center justify-center shadow-lg shrink-0`}>
              <FontAwesomeIcon icon={stat.icon} className="text-2xl" />
            </div>
            <div>
              <p className="text-sm font-bold text-gray-400 uppercase tracking-wider">{stat.label}</p>
              <h3 className="text-2xl font-black text-black">{isLoading ? "..." : stat.value}</h3>
            </div>
          </div>
        ))}
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
        {/* Recent Subscriptions Preview */}
        <div className="lg:col-span-2 bg-white rounded-[2.5rem] shadow-sm border border-gray-100 overflow-hidden">
          <div className="p-8 border-b flex justify-between items-center text-black">
            <h3 className="text-xl font-black">Recent Subscriptions</h3>
            <Link href="/admin/subscriptions" className="text-primary font-bold text-sm hover:underline">View All</Link>
          </div>
          <div className="overflow-x-auto text-black">
            <table className="w-full text-left">
              <thead>
                <tr className="bg-accent/50 text-gray-500 text-xs font-black uppercase tracking-widest">
                  <th className="px-8 py-4">Customer</th>
                  <th className="px-8 py-4">Phone</th>
                  <th className="px-8 py-4">Status</th>
                  <th className="px-8 py-4">Plan</th>
                </tr>
              </thead>
              <tbody className="text-sm font-medium">
                {recentSubs.length === 0 ? (
                  <tr><td colSpan={4} className="px-8 py-10 text-center text-gray-400">No recent subscriptions</td></tr>
                ) : recentSubs.map((sub, i) => (
                  <tr key={i} className="border-b last:border-none hover:bg-gray-50 transition-colors">
                    <td className="px-8 py-4 text-gray-800 font-bold">{sub.customer_name}</td>
                    <td className="px-8 py-4">{sub.customer_phone}</td>
                    <td className="px-8 py-4">
                      <span className={`px-3 py-1 rounded-full text-[10px] font-black uppercase text-green-500 bg-green-50`}>
                        {sub.status}
                      </span>
                    </td>
                    <td className="px-8 py-4 font-black text-secondary">{sub.plan_details}</td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>

        {/* Quick Actions */}
        <div className="flex flex-col gap-6">
          <div className="bg-white p-8 rounded-[2.5rem] shadow-sm border border-gray-100">
            <h3 className="text-xl font-black mb-6 text-black">Management</h3>
            <div className="flex flex-col gap-4">
              <Link href="/admin/products" className="w-full bg-primary text-black font-black py-4 rounded-2xl shadow-lg hover:opacity-90 transition-all flex items-center justify-center gap-3">
                <FontAwesomeIcon icon={faBox} />
                Products
              </Link>
              <Link href="/admin/categories" className="w-full bg-secondary text-white font-black py-4 rounded-2xl shadow-lg hover:opacity-90 transition-all flex items-center justify-center gap-3">
                <FontAwesomeIcon icon={faPlus} />
                Categories
              </Link>
              <Link href="/admin/subscriptions" className="w-full bg-blue-600 text-white font-black py-4 rounded-2xl shadow-lg hover:opacity-90 transition-all flex items-center justify-center gap-3">
                <FontAwesomeIcon icon={faShoppingBag} />
                Subscriptions
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
             <h4 className="font-black text-lg mb-2 text-black">Need Help?</h4>
             <p className="text-sm text-gray-600 mb-6">Contact the development team at Codtech IT Solutions if you face any issues.</p>
             <button className="text-primary font-black text-sm flex items-center gap-2 hover:gap-3 transition-all">
                Send Support Ticket <FontAwesomeIcon icon={faPlus} className="rotate-45" />
             </button>
          </div>
        </div>
      </div>
    </div>
  );
}
