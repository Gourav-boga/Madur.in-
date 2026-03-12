"use client";

import { products as initialProducts } from "@/lib/data";
import { useState } from "react";
import Image from "next/image";
import Link from "next/link";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faPlus, faEdit, faTrash, faArrowLeft, faSearch } from "@fortawesome/free-solid-svg-icons";

export default function AdminProductsPage() {
  const [products, setProducts] = useState(initialProducts);
  const [searchTerm, setSearchTerm] = useState("");

  const filteredProducts = products.filter(p => 
    p.name.toLowerCase().includes(searchTerm.toLowerCase()) || 
    p.category.toLowerCase().includes(searchTerm.toLowerCase())
  );

  const handleDelete = (id: string) => {
    if(confirm("Are you sure you want to delete this product?")) {
      setProducts(products.filter(p => p.id !== id));
    }
  };

  return (
    <div className="min-h-screen bg-accent/30 p-4 md:p-8">
      <div className="container mx-auto">
        <div className="flex items-center gap-4 mb-8">
          <Link href="/admin" className="w-10 h-10 rounded-full bg-white border border-gray-200 flex items-center justify-center hover:bg-gray-50 transition-colors shadow-sm">
            <FontAwesomeIcon icon={faArrowLeft} />
          </Link>
          <h1 className="text-3xl font-black">Manage Products</h1>
        </div>

        <div className="bg-white rounded-[2.5rem] shadow-xl border border-gray-100 overflow-hidden">
          {/* Controls */}
          <div className="p-8 border-b flex flex-col md:flex-row justify-between items-center gap-6">
            <div className="relative w-full md:w-96">
              <FontAwesomeIcon icon={faSearch} className="absolute left-4 top-1/2 -translate-y-1/2 text-gray-400" />
              <input 
                type="text" 
                placeholder="Search products or categories..." 
                className="w-full bg-accent/50 border-none rounded-2xl py-4 pl-12 pr-4 text-sm outline-none focus:ring-2 ring-primary"
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
              />
            </div>
            <button className="bg-primary text-primary-foreground font-black px-8 py-4 rounded-2xl shadow-lg hover:opacity-90 transition-all flex items-center gap-3 w-full md:w-auto active:scale-95">
              <FontAwesomeIcon icon={faPlus} />
              Add New Product
            </button>
          </div>

          {/* Table */}
          <div className="overflow-x-auto">
            <table className="w-full text-left">
              <thead>
                <tr className="bg-accent/50 text-gray-500 text-xs font-black uppercase tracking-widest">
                  <th className="px-8 py-5">Product</th>
                  <th className="px-8 py-5">Category</th>
                  <th className="px-8 py-5">Price</th>
                  <th className="px-8 py-5">Stock</th>
                  <th className="px-8 py-5 text-right">Actions</th>
                </tr>
              </thead>
              <tbody>
                {filteredProducts.map((product, i) => (
                  <tr key={product.id} className="border-b last:border-none hover:bg-gray-50 transition-colors">
                    <td className="px-8 py-5">
                      <div className="flex items-center gap-4">
                        <div className="relative w-12 h-12 rounded-xl overflow-hidden shadow-sm shrink-0">
                          <Image src={product.image} alt={product.name} fill className="object-cover" />
                        </div>
                        <span className="font-bold text-gray-800">{product.name}</span>
                      </div>
                    </td>
                    <td className="px-8 py-5">
                      <span className="bg-secondary/10 text-secondary font-bold text-[10px] px-3 py-1 rounded-full uppercase tracking-wider">
                        {product.category}
                      </span>
                    </td>
                    <td className="px-8 py-5 font-black text-primary text-lg">₹{product.price}</td>
                    <td className="px-8 py-5">
                      <div className="flex items-center gap-2">
                        <div className="w-2 h-2 rounded-full bg-green-500"></div>
                        <span className="font-bold text-sm">In Stock</span>
                      </div>
                    </td>
                    <td className="px-8 py-5 text-right">
                      <div className="flex justify-end gap-3 text-gray-400">
                        <button className="w-10 h-10 rounded-xl hover:bg-blue-50 hover:text-blue-500 transition-all flex items-center justify-center border border-transparent hover:border-blue-100">
                          <FontAwesomeIcon icon={faEdit} />
                        </button>
                        <button 
                          onClick={() => handleDelete(product.id)}
                          className="w-10 h-10 rounded-xl hover:bg-red-50 hover:text-red-500 transition-all flex items-center justify-center border border-transparent hover:border-red-100"
                        >
                          <FontAwesomeIcon icon={faTrash} />
                        </button>
                      </div>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
          
          {filteredProducts.length === 0 && (
            <div className="py-20 text-center">
              <div className="text-6xl mb-4 opacity-10">📦</div>
              <p className="text-gray-400 font-bold uppercase tracking-widest text-xs">No products found matching your search</p>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}
