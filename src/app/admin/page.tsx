"use client";

import Link from "next/link";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faBox, faShoppingBag, faUsers, faChartLine, faPlus, faSignOutAlt } from "@fortawesome/free-solid-svg-icons";

export default function AdminDashboard() {
  const stats = [
    { label: "Total Products", value: "48", icon: faBox, color: "bg-blue-500" },
    { label: "Active Orders", value: "12", icon: faShoppingBag, color: "bg-green-500" },
    { label: "Total Customers", value: "156", icon: faUsers, color: "bg-purple-500" },
    { label: "Monthly Revenue", value: "₹42,500", icon: faChartLine, color: "bg-primary" },
  ];

  return (
    <div className="min-h-screen bg-accent/30 p-4 md:p-8">
      {/* Admin Header */}
      <div className="flex flex-col md:flex-row justify-between items-center mb-10 gap-4">
        <div>
          <h1 className="text-3xl font-black">Admin Dashboard</h1>
          <p className="text-gray-500">Manage your farm-fresh business here.</p>
        </div>
        <div className="flex gap-4">
          <Link href="/admin/products" className="bg-white text-gray-800 font-bold px-6 py-3 rounded-xl shadow-sm border hover:bg-gray-50 transition-all flex items-center gap-2">
            <FontAwesomeIcon icon={faBox} />
            Manage Products
          </Link>
          <Link href="/" className="bg-red-50 text-red-600 font-bold px-6 py-3 rounded-xl border border-red-100 hover:bg-red-100 transition-all flex items-center gap-2">
            <FontAwesomeIcon icon={faSignOutAlt} />
            Logout
          </Link>
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
              <h3 className="text-2xl font-black">{stat.value}</h3>
            </div>
          </div>
        ))}
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
        {/* Recent Orders Preview */}
        <div className="lg:col-span-2 bg-white rounded-[2.5rem] shadow-sm border border-gray-100 overflow-hidden">
          <div className="p-8 border-b flex justify-between items-center">
            <h3 className="text-xl font-black">Recent Orders</h3>
            <Link href="/admin/orders" className="text-primary font-bold text-sm hover:underline">View All</Link>
          </div>
          <div className="overflow-x-auto">
            <table className="w-full text-left">
              <thead>
                <tr className="bg-accent/50 text-gray-500 text-xs font-black uppercase tracking-widest">
                  <th className="px-8 py-4">Order ID</th>
                  <th className="px-8 py-4">Customer</th>
                  <th className="px-8 py-4">Status</th>
                  <th className="px-8 py-4">Total</th>
                </tr>
              </thead>
              <tbody className="text-sm font-medium">
                {[
                  { id: "#ORD-7281", customer: "Rahul Sharma", status: "In Delivery", total: "₹450", statusColor: "text-blue-500 bg-blue-50" },
                  { id: "#ORD-7280", customer: "Anjali Devi", status: "Pending", total: "₹1,200", statusColor: "text-orange-500 bg-orange-50" },
                  { id: "#ORD-7279", customer: "Suresh P", status: "Delivered", total: "₹280", statusColor: "text-green-500 bg-green-50" },
                  { id: "#ORD-7278", customer: "Kiran G", status: "Cancelled", total: "₹150", statusColor: "text-red-500 bg-red-50" },
                ].map((order, i) => (
                  <tr key={i} className="border-b last:border-none hover:bg-gray-50 transition-colors">
                    <td className="px-8 py-4 text-gray-800 font-bold">{order.id}</td>
                    <td className="px-8 py-4">{order.customer}</td>
                    <td className="px-8 py-4">
                      <span className={`px-3 py-1 rounded-full text-[10px] font-black uppercase ${order.statusColor}`}>
                        {order.status}
                      </span>
                    </td>
                    <td className="px-8 py-4 font-black">{order.total}</td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>

        {/* Quick Actions */}
        <div className="flex flex-col gap-6">
          <div className="bg-white p-8 rounded-[2.5rem] shadow-sm border border-gray-100">
            <h3 className="text-xl font-black mb-6">Quick Actions</h3>
            <div className="flex flex-col gap-4">
              <button className="w-full bg-primary text-primary-foreground font-black py-4 rounded-2xl shadow-lg hover:opacity-90 transition-all flex items-center justify-center gap-3">
                <FontAwesomeIcon icon={faPlus} />
                Add New Product
              </button>
              <button className="w-full bg-secondary text-secondary-foreground font-black py-4 rounded-2xl shadow-lg hover:opacity-90 transition-all flex items-center justify-center gap-3">
                <FontAwesomeIcon icon={faBox} />
                Update Stock
              </button>
            </div>
          </div>

          <div className="bg-primary/10 p-8 rounded-[2.5rem] border border-primary/20">
             <h4 className="font-black text-lg mb-2">Need Help?</h4>
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
