"use client";

import { useState, useEffect } from "react";
import { useRouter } from "next/navigation";
import Link from "next/link";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faArrowLeft, faShoppingBag, faTrash, faChevronRight, faMapMarkerAlt, faPhone } from "@fortawesome/free-solid-svg-icons";

interface Order {
  id: string;
  customer_name: string;
  customer_email: string;
  customer_phone: string;
  shipping_address: string;
  location_link?: string;
  total_amount: number;
  payment_method: string;
  status: string;
  created_at: string;
  item_count: number;
}

export default function AdminOrdersPage() {
  const router = useRouter();
  const [isAuthorized, setIsAuthorized] = useState(false);
  const [orders, setOrders] = useState<Order[]>([]);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    const isAdmin = sessionStorage.getItem("isAdminAuthenticated");
    if (isAdmin !== "true") {
      router.push("/admin/login");
    } else {
      setIsAuthorized(true);
      fetchOrders();
    }
  }, []);

  async function fetchOrders() {
    setIsLoading(true);
    try {
      const res = await fetch("/api/admin/orders");
      const data = await res.json();
      setOrders(Array.isArray(data) ? data : []);
    } catch (err) {
      console.error("Error fetching orders:", err);
    } finally {
      setIsLoading(false);
    }
  }

  const deleteOrder = async (orderId: string, name: string) => {
    if (!confirm(`Delete order #${orderId} from ${name}?`)) return;
    try {
      const response = await fetch(`/api/admin/orders?id=${orderId}`, { method: "DELETE" });
      if (!response.ok) throw new Error("Failed to delete");
      fetchOrders();
    } catch (err) {
      alert("Error deleting order!");
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
              <h1 className="text-3xl font-black text-black">Order Management</h1>
              <p className="text-gray-500 font-bold text-sm uppercase tracking-widest text-black">Manage one-off customer orders</p>
            </div>
          </div>
        </div>

        <div className="bg-white rounded-[2.5rem] shadow-xl border border-gray-100 overflow-hidden text-black">
          <div className="p-8 border-b bg-secondary/5">
            <h3 className="text-xl font-black">All Orders</h3>
            <p className="text-sm text-gray-400 font-bold mt-1 uppercase tracking-widest text-black/50">Tracking {orders.length} orders in total</p>
          </div>

          <div className="overflow-x-auto">
            <table className="w-full text-left">
              <thead>
                <tr className="bg-accent/50 text-gray-500 text-[10px] font-black uppercase tracking-[0.2em]">
                  <th className="px-8 py-5">Order ID</th>
                  <th className="px-8 py-5">Customer</th>
                  <th className="px-8 py-5">Amount</th>
                  <th className="px-8 py-5">Status</th>
                  <th className="px-8 py-5 text-right">Actions</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-gray-100">
                {isLoading ? (
                  <tr><td colSpan={5} className="px-8 py-20 text-center"><div className="animate-spin h-8 w-8 border-4 border-primary border-t-transparent rounded-full mx-auto"></div></td></tr>
                ) : orders.length === 0 ? (
                  <tr><td colSpan={5} className="px-8 py-20 text-center text-gray-400 font-bold">No orders found.</td></tr>
                ) : orders.map(order => (
                  <tr key={order.id} className="hover:bg-gray-50/50 transition-colors group cursor-pointer" onClick={() => router.push(`/admin/orders/${order.id}`)}>
                    <td className="px-8 py-6 font-mono text-xs font-black text-gray-400">#{order.id.toString().slice(-6).toUpperCase()}</td>
                    <td className="px-8 py-6">
                      <div className="flex flex-col">
                        <span className="font-black text-gray-800 text-sm uppercase tracking-tight">{order.customer_name || "Guest Order"}</span>
                        <div className="flex items-center gap-2 mt-1">
                          <FontAwesomeIcon icon={faPhone} className="text-[8px] text-gray-300" />
                          <span className="text-[10px] text-gray-400 font-bold">{order.customer_phone || "No Phone"}</span>
                        </div>
                      </div>
                    </td>
                    <td className="px-8 py-6">
                      <span className="font-black text-secondary">₹{Math.floor(order.total_amount)}</span>
                      <p className="text-[9px] font-bold text-gray-400 uppercase tracking-widest">{order.item_count} items • {order.payment_method}</p>
                    </td>
                    <td className="px-8 py-6">
                      <span className={`px-3 py-1 rounded-full text-[10px] font-black uppercase ${
                        order.status === 'completed' ? 'text-green-500 bg-green-50' : 
                        order.status === 'pending' ? 'text-orange-500 bg-orange-50' : 
                        'text-gray-500 bg-gray-50'
                      }`}>
                        {order.status}
                      </span>
                    </td>
                    <td className="px-8 py-6 text-right">
                      <div className="flex items-center justify-end gap-2">
                        {order.location_link && (
                          <a href={order.location_link} target="_blank" rel="noopener noreferrer" 
                             onClick={e => e.stopPropagation()}
                             className="w-10 h-10 rounded-xl bg-green-50 text-green-500 flex items-center justify-center hover:bg-green-500 hover:text-white transition-all shadow-sm">
                            <FontAwesomeIcon icon={faMapMarkerAlt} size="sm" />
                          </a>
                        )}
                        <button
                          onClick={(e) => { e.stopPropagation(); deleteOrder(order.id, order.customer_name || 'Guest'); }}
                          className="w-10 h-10 rounded-xl bg-red-50 text-red-400 flex items-center justify-center hover:bg-red-500 hover:text-white transition-all shadow-sm"
                        >
                          <FontAwesomeIcon icon={faTrash} size="sm" />
                        </button>
                        <Link href={`/admin/orders/${order.id}`} className="w-10 h-10 rounded-xl bg-accent text-primary flex items-center justify-center hover:bg-primary hover:text-white transition-all shadow-sm">
                          <FontAwesomeIcon icon={faChevronRight} />
                        </Link>
                      </div>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>
      </div>
    </div>
  );
}
