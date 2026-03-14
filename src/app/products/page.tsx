"use client";

import { useSearchParams } from "next/navigation";
import { Suspense, useState, useMemo, useEffect } from "react";
import ProductCard from "@/components/common/ProductCard";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faFilter, faSearch, faTimes, faBox } from "@fortawesome/free-solid-svg-icons";
import Link from "next/link";
import Image from "next/image";
import { supabase } from "@/lib/supabase";

function ProductsContent() {
  const searchParams = useSearchParams();
  const categoryFilter = searchParams.get("category");
  const urlSearchTerm = searchParams.get("search") || "";
  
  const [products, setProducts] = useState<any[]>([]);
  const [categories, setCategories] = useState<any[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  const [searchTerm, setSearchTerm] = useState(urlSearchTerm);

  useEffect(() => {
    async function fetchData() {
      setIsLoading(true);
      const { data: catData } = await supabase.from("categories").select("*");
      const { data: prodData } = await supabase.from("products").select("*, categories(name)");
      
      setCategories(catData || []);
      setProducts(prodData || []);
      setIsLoading(false);
    }
    fetchData();
  }, []);

  // Sync state with URL search param if it changes
  useEffect(() => {
    setSearchTerm(urlSearchTerm);
  }, [urlSearchTerm]);

  const filteredProducts = useMemo(() => {
    const cleanSearch = searchTerm.toLowerCase().replace(/\s/g, "");
    
    return products.filter((product) => {
      // product.categories.name comes from Supabase join
      const prodCategoryName = product.categories?.name || product.category || "";
      
      const matchesCategory = categoryFilter 
        ? prodCategoryName.toLowerCase() === categoryFilter.toLowerCase() 
        : true;
        
      const cleanName = product.name.toLowerCase().replace(/\s/g, "");
      const cleanProductCategory = prodCategoryName.toLowerCase().replace(/\s/g, "");
      
      const matchesSearch = cleanName.includes(cleanSearch) ||
                           cleanProductCategory.includes(cleanSearch);
                           
      return matchesCategory && matchesSearch;
    });
  }, [categoryFilter, searchTerm, products]);

  const currentCategory = categories.find(c => c.name.toLowerCase() === categoryFilter?.toLowerCase());

  return (
    <div className="container pt-32 pb-24 min-h-screen text-black">
      <div className="flex flex-col md:flex-row justify-between items-start md:items-center mb-12 gap-6">
        <div>
          <h1 className="text-2xl md:text-4xl font-black mb-2 flex flex-col sm:flex-row items-start sm:items-center gap-4">
            {categoryFilter ? (
              <>
                {(currentCategory?.image_url || currentCategory?.image) ? (
                  <div className="relative w-16 h-16 sm:w-24 sm:h-24 rounded-2xl overflow-hidden shadow-md bg-gray-50 flex-shrink-0">
                    <Image src={currentCategory.image_url || currentCategory.image} alt={currentCategory.name} fill className="object-cover" />
                  </div>
                ) : (
                  <div className="w-16 h-16 sm:w-24 sm:h-24 rounded-2xl bg-gray-100 flex items-center justify-center text-gray-300">
                    <FontAwesomeIcon icon={faBox} size="lg" />
                  </div>
                )}
                <div className="flex flex-wrap items-center gap-2">
                  <span className="text-brown">{categoryFilter}</span> 
                  <span>Products</span>
                </div>
              </>
            ) : "All Products"}
          </h1>
          <p className="text-gray-500 font-bold text-sm uppercase tracking-wide">
            {filteredProducts.length} items found for your healthy diet
          </p>
        </div>

        <div className="flex flex-col sm:flex-row gap-4 w-full md:w-auto">
          <div className="relative flex-1 sm:w-80">
            <FontAwesomeIcon icon={faSearch} className="absolute left-4 top-1/2 -translate-y-1/2 text-gray-400" />
            <input 
              type="text" 
              placeholder="Search products..." 
              className="w-full bg-white border border-gray-100 rounded-2xl py-4 pl-12 pr-4 text-sm outline-none focus:ring-2 ring-primary shadow-sm transition-all font-bold"
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
            />
          </div>
        </div>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-4 gap-12">
        {/* Sidebar Filters */}
        <div className="hidden lg:block space-y-8 sticky top-32 self-start">
          <div>
            <h3 className="text-lg font-black mb-6 flex items-center gap-2">
              <FontAwesomeIcon icon={faFilter} className="text-primary" />
              Categories
            </h3>
            <div className="flex flex-col gap-2">
              <Link 
                href="/products"
                className={`px-4 py-3 rounded-xl font-bold transition-all ${
                  !categoryFilter ? "bg-primary text-black shadow-lg" : "hover:bg-accent text-gray-500"
                }`}
              >
                All Products
              </Link>
              {categories.map((cat) => (
                <Link 
                  key={cat.id}
                  href={`/products?category=${encodeURIComponent(cat.name)}`}
                  className={`px-4 py-3 rounded-xl font-bold transition-all ${
                    categoryFilter?.toLowerCase() === cat.name.toLowerCase() 
                      ? "bg-brown text-white shadow-lg" 
                      : "hover:bg-accent text-gray-500"
                  }`}
                >
                  {(cat.image_url || cat.image) ? (
                    <div className="flex items-center gap-3 text-left">
                      <div className="relative w-10 h-10 rounded-lg overflow-hidden border border-gray-100 flex-shrink-0 bg-gray-50">
                        <Image src={cat.image_url || cat.image} alt={cat.name} fill className="object-cover" />
                      </div>
                      <span className="text-xs font-black uppercase tracking-tight">{cat.name}</span>
                    </div>
                  ) : (
                    <div className="flex items-center gap-3 text-left">
                       <div className="w-10 h-10 rounded-lg bg-gray-100 flex items-center justify-center text-gray-300">
                         <FontAwesomeIcon icon={faBox} size="xs" />
                       </div>
                       <span className="text-xs font-black uppercase tracking-tight">{cat.name}</span>
                    </div>
                  )}
                </Link>
              ))}
            </div>
          </div>
        </div>

        {/* Product Grid */}
        <div className="lg:col-span-3">
          {isLoading ? (
            <div className="grid grid-cols-1 sm:grid-cols-2 xl:grid-cols-3 gap-8">
               {[...Array(6)].map((_, i) => <div key={i} className="h-80 bg-gray-100 animate-pulse rounded-[2.5rem]"></div>)}
            </div>
          ) : filteredProducts.length > 0 ? (
            <div className="grid grid-cols-1 sm:grid-cols-2 xl:grid-cols-3 gap-8">
              {filteredProducts.map((product) => (
                <div key={product.id}>
                  <ProductCard product={product} />
                </div>
              ))}
            </div>
          ) : (
            <div className="py-24 text-center bg-accent/30 rounded-[3rem] border border-dashed border-gray-300">
              <div className="text-6xl mb-6 opacity-20 text-gray-400">📦</div>
              <h3 className="text-xl font-black mb-2">No products found</h3>
              <p className="text-gray-500 mb-8">Try adjusting your filters or search term.</p>
              <button 
                onClick={() => {setSearchTerm(""); window.location.href="/products"}}
                className="bg-primary text-primary-foreground font-black px-8 py-4 rounded-xl shadow-lg hover:opacity-90 transition-all"
              >
                Clear All Filters
              </button>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}

export default function ProductsPage() {
  return (
    <Suspense fallback={
      <div className="container py-24 min-h-screen flex items-center justify-center">
        <div className="animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-primary"></div>
      </div>
    }>
      <ProductsContent />
    </Suspense>
  );
}
