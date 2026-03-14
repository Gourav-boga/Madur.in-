"use client";

import { useState, useEffect } from "react";
import { useRouter } from "next/navigation";
import Image from "next/image";
import Link from "next/link";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faPlus, faEdit, faTrash, faArrowLeft, faSearch, faImages, faBox } from "@fortawesome/free-solid-svg-icons";
import { supabase } from "@/lib/supabase";

interface Product {
  id: string;
  name: string;
  category_id: string;
  unit: string;
  price: number;
  image_url: string;
  description: string;
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
    description: ""
  });
  const [uploading, setUploading] = useState(false);

  useEffect(() => {
    const isAdmin = localStorage.getItem("isAdminAuthenticated");
    if (isAdmin !== "true") {
      router.push("/admin/login");
    } else {
      setIsAuthorized(true);
      fetchData();
    }
  }, [router]);

  async function fetchData() {
    setIsLoading(true);
    const { data: catData } = await supabase.from("categories").select("id, name");
    setCategories(catData || []);

    const { data: prodData, error } = await supabase
      .from("products")
      .select("*, categories(name)")
      .order("created_at", { ascending: false });

    if (error) {
      console.error("Error fetching products:", error);
    } else {
      setProducts(prodData || []);
    }
    setIsLoading(false);
  }

  const handleImageUpload = async (e: React.ChangeEvent<HTMLInputElement>) => {
    try {
      setUploading(true);
      if (!e.target.files || e.target.files.length === 0) return;

      const file = e.target.files[0];
      const fileExt = file.name.split(".").pop();
      const fileName = `${Math.random()}.${fileExt}`;
      const filePath = `products/${fileName}`;

      const { error: uploadError } = await supabase.storage
        .from("madur")
        .upload(filePath, file);

      if (uploadError) throw uploadError;

      const { data: { publicUrl } } = supabase.storage
        .from("madur")
        .getPublicUrl(filePath);

      setFormData({ ...formData, image_url: publicUrl });
    } catch (error) {
      console.error("Error uploading image:", error);
      alert("Error uploading image!");
    } finally {
      setUploading(false);
    }
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsLoading(true);

    try {
      const payload = { ...formData };
      if (editingProduct) {
        const { error } = await supabase
          .from("products")
          .update(payload)
          .eq("id", editingProduct.id);
        if (error) throw error;
      } else {
        const { error } = await supabase
          .from("products")
          .insert([payload]);
        if (error) throw error;
      }

      setIsModalOpen(false);
      setEditingProduct(null);
      setFormData({ name: "", category_id: "", unit: "", price: 0, image_url: "", description: "" });
      fetchData();
    } catch (error) {
      console.error("Error saving product:", error);
      alert("Error saving product!");
    } finally {
      setIsLoading(false);
    }
  };

  const handleDelete = async (id: string) => {
    if (confirm("Are you sure you want to delete this product?")) {
      const { error } = await supabase.from("products").delete().eq("id", id);
      if (error) {
        alert("Error deleting product!");
      } else {
        fetchData();
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
        description: product.description
      });
    } else {
      setEditingProduct(null);
      setFormData({ name: "", category_id: categories[0]?.id || "", unit: "1litre", price: 0, image_url: "", description: "" });
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

  const filteredProducts = products.filter(p => 
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
                  <th className="px-8 py-5 text-right">Actions</th>
                </tr>
              </thead>
              <tbody>
                {isLoading ? (
                   <tr><td colSpan={5} className="py-20 text-center text-gray-400">Loading products...</td></tr>
                ) : filteredProducts.length === 0 ? (
                   <tr><td colSpan={5} className="py-20 text-center text-gray-400">No products found.</td></tr>
                ) : filteredProducts.map((product) => (
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
                    {categories.map(cat => <option key={cat.id} value={cat.id}>{cat.name}</option>)}
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
