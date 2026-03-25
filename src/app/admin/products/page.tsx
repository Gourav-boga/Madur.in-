"use client";

import { useState, useEffect } from "react";
import { useRouter } from "next/navigation";
import Image from "next/image";
import Link from "next/link";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faPlus, faEdit, faTrash, faArrowLeft, faSearch, faImages, faBox } from "@fortawesome/free-solid-svg-icons";


interface Product {
  id: string;
  name: string;
  category_id: string;
  unit: string;
  price: number;
  image_url: string;
  description: string;
  is_out_of_stock: boolean;
  categories?: { name: string };
}

interface Category {
  id: string;
  name: string;
}

export default function AdminProductsPage() {
  const router = useRouter();
  const [isAuthorized, setIsAuthorized] = useState(false);
  const [products, setProducts] = useState<Product[]>([]);
  const [categories, setCategories] = useState<Category[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  const [searchTerm, setSearchTerm] = useState("");
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [editingProduct, setEditingProduct] = useState<Product | null>(null);
  const [formData, setFormData] = useState({
    name: "",
    category_id: "",
    unit: "",
    price: 0,
    image_url: "",
    description: "",
    is_out_of_stock: false
  });
  const [uploading, setUploading] = useState(false);

  useEffect(() => {
    fetchData();
    setIsAuthorized(true);
  }, []);

  async function fetchData() {
    setIsLoading(true);
    try {
      const [catRes, prodRes] = await Promise.all([
        fetch("/api/categories"),
        fetch("/api/products")
      ]);
      
      const catData = await catRes.json();
      const prodData = await prodRes.json();
      
      setCategories(Array.isArray(catData) ? catData : []);
      // Map MySQL 'category_name' to the expected 'categories.name' structure if needed
      const mappedProducts = (Array.isArray(prodData) ? prodData : []).map((p: any) => ({
        ...p,
        categories: { name: p.category_name },
        is_out_of_stock: !p.is_available
      }));
      setProducts(mappedProducts);

    } catch (err) {
      console.error("Error fetching data:", err);
    } finally {
      setIsLoading(false);
    }
  }

  const handleImageUpload = async (e: React.ChangeEvent<HTMLInputElement>) => {
    try {
      setUploading(true);
      if (!e.target.files || e.target.files.length === 0) return;

      const file = e.target.files[0];

      // Show local preview immediately
      const localPreview = URL.createObjectURL(file);
      setFormData(prev => ({ ...prev, image_url: localPreview }));

      const uploadFormData = new FormData();
      uploadFormData.append("file", file);

      const response = await fetch("/api/upload", {
        method: "POST",
        body: uploadFormData
      });

      if (!response.ok) {
        const err = await response.json();
        throw new Error(err.error || "Upload failed");
      }

      const { publicUrl } = await response.json();
      // Replace preview with the actual saved URL
      setFormData(prev => ({ ...prev, image_url: publicUrl }));
    } catch (error: any) {
      console.error("Error uploading image:", error);
      alert(`Error uploading image: ${error.message}`);
    } finally {
      setUploading(false);
    }
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsLoading(true);

    try {
      const payload = { 
        ...formData,
        id: editingProduct?.id 
      };
      
      const response = await fetch("/api/products", {
        method: editingProduct ? "PATCH" : "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(payload)
      });
      
      if (!response.ok) throw new Error("Failed to save product");

      setIsModalOpen(false);
      setEditingProduct(null);
      setFormData({ name: "", category_id: "", unit: "", price: 0, image_url: "", description: "", is_out_of_stock: false });
      fetchData();
    } catch (error: any) {
      console.error("Error saving product:", error);
      alert(error.message || "Error saving product!");
    } finally {
      setIsLoading(false);
    }
  };

  const handleDelete = async (id: string) => {
    if (confirm("Are you sure you want to delete this product?")) {
      try {
        const response = await fetch(`/api/products?id=${id}`, {
          method: "DELETE"
        });
        if (!response.ok) throw new Error("Failed to delete");
        fetchData();
      } catch (err) {
        alert("Error deleting product!");
      }
    }
  };

  const openModal = (product: Product | null = null) => {
    if (product) {
      setEditingProduct(product);
      setFormData({
        name: product.name,
        category_id: product.category_id,
        unit: product.unit,
        price: product.price,
        image_url: product.image_url,
        description: product.description,
        is_out_of_stock: product.is_out_of_stock || false
      });
    } else {
      setEditingProduct(null);
      setFormData({ name: "", category_id: categories[0]?.id || "", unit: "1litre", price: 0, image_url: "", description: "", is_out_of_stock: false });
    }
    setIsModalOpen(true);
  };

  if (!isAuthorized) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-accent/30">
        <div className="animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-primary"></div>
      </div>
    );
  }

  const filteredProducts = (Array.isArray(products) ? products : []).filter(p => 
    p.name.toLowerCase().includes(searchTerm.toLowerCase()) || 
    p.categories?.name.toLowerCase().includes(searchTerm.toLowerCase())
  );


  return (
    <div className="min-h-screen bg-accent/30 p-4 md:p-8">
      <div className="container mx-auto">
        <div className="flex items-center justify-between mb-8">
          <div className="flex items-center gap-4">
            <Link href="/admin" className="w-10 h-10 rounded-full bg-white border border-gray-200 flex items-center justify-center hover:bg-gray-50 transition-colors shadow-sm">
              <FontAwesomeIcon icon={faArrowLeft} />
            </Link>
            <h1 className="text-3xl font-black">Manage Products</h1>
          </div>
          <button 
            onClick={() => openModal()}
            className="bg-primary text-black font-black px-6 py-3 rounded-xl shadow-lg hover:opacity-90 transition-all flex items-center gap-2 active:scale-95"
          >
            <FontAwesomeIcon icon={faPlus} />
            Add Product
          </button>
        </div>

        <div className="bg-white rounded-[2.5rem] shadow-xl border border-gray-100 overflow-hidden">
          <div className="p-8 border-b">
            <div className="relative w-full md:w-96">
              <FontAwesomeIcon icon={faSearch} className="absolute left-4 top-1/2 -translate-y-1/2 text-gray-400" />
              <input 
                type="text" 
                placeholder="Search products..." 
                className="w-full bg-accent/50 border-none rounded-2xl py-4 pl-12 pr-4 text-sm outline-none focus:ring-2 ring-primary"
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
              />
            </div>
          </div>

          <div className="overflow-x-auto">
            <table className="w-full text-left">
              <thead>
                <tr className="bg-accent/50 text-gray-500 text-xs font-black uppercase tracking-widest">
                  <th className="px-8 py-5">Product</th>
                  <th className="px-8 py-5">Category</th>
                  <th className="px-8 py-5">Price</th>
                  <th className="px-8 py-5">Unit</th>
                  <th className="px-8 py-5">Status</th>
                  <th className="px-8 py-5 text-right">Actions</th>
                </tr>
              </thead>
              <tbody>
                {isLoading ? (
                   <tr><td colSpan={5} className="py-20 text-center text-gray-400">Loading products...</td></tr>
                ) : filteredProducts.length === 0 ? (
                   <tr><td colSpan={5} className="py-20 text-center text-gray-400">No products found.</td></tr>
                ) : (Array.isArray(filteredProducts) ? filteredProducts : []).map((product) => (
                  <tr key={product.id} className="border-b last:border-none hover:bg-gray-50 transition-colors">
                    <td className="px-8 py-5">
                      <div className="flex items-center gap-4">
                        <div className="relative w-12 h-12 rounded-xl overflow-hidden shadow-sm shrink-0 bg-accent/20">
                          {product.image_url ? (
                            <Image src={product.image_url} alt={product.name} fill className="object-cover" />
                          ) : (
                            <FontAwesomeIcon icon={faBox} className="absolute inset-0 m-auto text-gray-300" />
                          )}
                        </div>
                        <span className="font-bold text-gray-800">{product.name}</span>
                      </div>
                    </td>
                    <td className="px-8 py-5">
                      <span className="bg-secondary/10 text-secondary font-bold text-[10px] px-3 py-1 rounded-full uppercase tracking-wider">
                        {product.categories?.name}
                      </span>
                    </td>
                    <td className="px-8 py-5 font-black text-primary text-lg">₹{product.price}</td>
                    <td className="px-8 py-5 font-bold text-sm">{product.unit}</td>
                    <td className="px-8 py-5">
                      {product.is_out_of_stock ? (
                        <span className="bg-red-100 text-red-600 font-black text-[10px] px-3 py-1 rounded-full uppercase tracking-wider">
                          Out of Stock
                        </span>
                      ) : (
                        <span className="bg-green-100 text-green-600 font-black text-[10px] px-3 py-1 rounded-full uppercase tracking-wider">
                          In Stock
                        </span>
                      )}
                    </td>
                    <td className="px-8 py-5 text-right">
                      <div className="flex justify-end gap-3">
                        <button 
                          onClick={() => openModal(product)}
                          className="w-10 h-10 rounded-xl hover:bg-blue-50 hover:text-blue-500 transition-all flex items-center justify-center border border-transparent hover:border-blue-100"
                        >
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
        </div>
      </div>

      {/* Add/Edit Modal */}
      {isModalOpen && (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/60 backdrop-blur-sm p-4 overflow-y-auto">
          <div className="bg-white rounded-[3rem] p-10 max-w-2xl w-full shadow-2xl animate-in zoom-in-95 duration-200 my-8">
            <h2 className="text-2xl font-black mb-6">{editingProduct ? "Edit Product" : "New Product"}</h2>
            
            <form onSubmit={handleSubmit} className="space-y-6">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <div className="space-y-2">
                  <label className="text-[11px] font-black text-gray-400 uppercase tracking-widest ml-1">Product Name</label>
                  <input 
                    type="text" required
                    className="w-full bg-accent/50 border-none rounded-2xl py-4 px-6 font-bold outline-none focus:ring-4 ring-primary/20"
                    value={formData.name}
                    onChange={(e) => setFormData({...formData, name: e.target.value})}
                  />
                </div>
                <div className="space-y-2">
                  <label className="text-[11px] font-black text-gray-400 uppercase tracking-widest ml-1">Category</label>
                  <select 
                    className="w-full bg-accent/50 border-none rounded-2xl py-4 px-6 font-bold outline-none focus:ring-4 ring-primary/20 appearance-none"
                    value={formData.category_id}
                    onChange={(e) => setFormData({...formData, category_id: e.target.value})}
                  >
                    {(Array.isArray(categories) ? categories : []).map(cat => <option key={cat.id} value={cat.id}>{cat.name}</option>)}
                  </select>

                </div>
              </div>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <div className="space-y-2">
                  <label className="text-[11px] font-black text-gray-400 uppercase tracking-widest ml-1">Price (₹)</label>
                  <input 
                    type="number" required
                    className="w-full bg-accent/50 border-none rounded-2xl py-4 px-6 font-bold outline-none focus:ring-4 ring-primary/20"
                    value={formData.price}
                    onChange={(e) => setFormData({...formData, price: parseFloat(e.target.value)})}
                  />
                </div>
                <div className="space-y-2">
                  <label className="text-[11px] font-black text-gray-400 uppercase tracking-widest ml-1">Unit</label>
                  <select 
                    className="w-full bg-accent/50 border-none rounded-2xl py-4 px-6 font-bold outline-none focus:ring-4 ring-primary/20 appearance-none"
                    value={formData.unit}
                    onChange={(e) => setFormData({...formData, unit: e.target.value})}
                  >
                    <option value="1litre">1litre</option>
                    <option value="500ml">500ml</option>
                    <option value="250ml">250ml</option>
                    <option value="100grms">100grms</option>
                    <option value="250grms">250grms</option>
                    <option value="500grms">500grms</option>
                    <option value="1000grms">1000grms</option>
                  </select>
                </div>
              </div>

              <div className="flex items-center gap-3 p-4 bg-accent/30 rounded-2xl border-2 border-dashed border-gray-100">
                <input 
                  type="checkbox"
                  id="is_out_of_stock"
                  className="w-5 h-5 accent-primary cursor-pointer"
                  checked={formData.is_out_of_stock}
                  onChange={(e) => setFormData({...formData, is_out_of_stock: e.target.checked})}
                />
                <label htmlFor="is_out_of_stock" className="text-sm font-black text-gray-700 cursor-pointer uppercase tracking-tight">
                  Mark as Out of Stock
                </label>
              </div>

              <div className="space-y-2">
                <label className="text-[11px] font-black text-gray-400 uppercase tracking-widest ml-1">Description</label>
                <textarea 
                  className="w-full bg-accent/50 border-none rounded-2xl py-4 px-6 font-bold outline-none focus:ring-4 ring-primary/20 h-24"
                  value={formData.description}
                  onChange={(e) => setFormData({...formData, description: e.target.value})}
                />
              </div>

              <div className="space-y-2">
                <label className="text-[11px] font-black text-gray-400 uppercase tracking-widest ml-1">Product Image</label>
                <div className="flex items-center gap-4">
                   <div className="relative w-32 h-32 rounded-2xl bg-accent/50 flex items-center justify-center overflow-hidden border-2 border-dashed border-gray-200">
                      {formData.image_url ? (
                        <Image src={formData.image_url} alt="Preview" fill className="object-cover" />
                      ) : (
                        <FontAwesomeIcon icon={faImages} className="text-gray-300 text-3xl" />
                      )}
                      {uploading && <div className="absolute inset-0 bg-white/80 flex items-center justify-center"><div className="w-6 h-6 border-2 border-primary border-t-transparent animate-spin rounded-full"></div></div>}
                   </div>
                   <label className="flex-1">
                      <div className="bg-accent hover:bg-accent/70 transition-colors py-6 px-6 rounded-2xl text-center cursor-pointer font-bold text-sm flex flex-col items-center gap-2">
                        <FontAwesomeIcon icon={faPlus} />
                        {uploading ? "Uploading..." : "Upload Image"}
                      </div>
                      <input type="file" className="hidden" accept="image/*" onChange={handleImageUpload} />
                   </label>
                </div>
              </div>

              <div className="flex gap-4 pt-4">
                <button 
                  type="button"
                  onClick={() => setIsModalOpen(false)}
                  className="flex-1 bg-gray-100 font-bold py-4 rounded-2xl hover:bg-gray-200 transition-colors"
                >
                  Cancel
                </button>
                <button 
                  type="submit"
                  disabled={isLoading || uploading}
                  className="flex-1 bg-primary text-black font-black py-4 rounded-2xl shadow-lg hover:opacity-90 transition-all disabled:opacity-50"
                >
                   {isLoading ? "Saving..." : "Save Product"}
                </button>
              </div>
            </form>
          </div>
        </div>
      )}
    </div>
  );
}
