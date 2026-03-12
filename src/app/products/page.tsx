"use client";

import { useSearchParams } from "next/navigation";
import { products, categories } from "@/lib/data";
import { Suspense, useState, useMemo, useEffect } from "react";
import ProductCard from "@/components/common/ProductCard";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faFilter, faSearch, faTimes } from "@fortawesome/free-solid-svg-icons";
import Link from "next/link";
import Image from "next/image";

function ProductsContent() {
  const searchParams = useSearchParams();
  const categoryFilter = searchParams.get("category");
  const urlSearchTerm = searchParams.get("search") || "";
  const [searchTerm, setSearchTerm] = useState(urlSearchTerm);

  // Sync state with URL search param if it changes
  useEffect(() => {
    setSearchTerm(urlSearchTerm);
  }, [urlSearchTerm]);

  const filteredProducts = useMemo(() => {
    const cleanSearch = searchTerm.toLowerCase().replace(/\s/g, "");
    
    return products.filter((product) => {
      const matchesCategory = categoryFilter 
        ? product.category.toLowerCase() === categoryFilter.toLowerCase() 
        : true;
        
      const cleanName = product.name.toLowerCase().replace(/\s/g, "");
      const cleanProductCategory = product.category.toLowerCase().replace(/\s/g, "");
      
      const matchesSearch = cleanName.includes(cleanSearch) ||
                           cleanProductCategory.includes(cleanSearch);
                           
      return matchesCategory && matchesSearch;
    });
  }, [categoryFilter, searchTerm]);

  const currentCategory = categories.find(c => c.name.toLowerCase() === categoryFilter?.toLowerCase());

  return (
    <div className="container pt-32 pb-24 min-h-screen">
      <div className="flex flex-col md:flex-row justify-between items-start md:items-center mb-12 gap-6">
        <div>
          <h1 className="text-4xl font-black mb-2 flex items-center gap-4">
            {categoryFilter ? (
              <>
                {currentCategory?.image ? (
                  <div className="relative w-24 h-24 rounded-2xl overflow-hidden shadow-md bg-gray-50">
                    <Image src={currentCategory.image} alt={currentCategory.name} fill className="object-cover" />
                  </div>
                ) : (
                  <span className="text-4xl">{currentCategory?.icon}</span>
                )}
                <span className="text-secondary">{categoryFilter}</span> Products
              </>
            ) : "All Products"}
          </h1>
          <p className="text-gray-500">
            {filteredProducts.length} items found for your healthy diet
          </p>
        </div>

        <div className="flex flex-col sm:flex-row gap-4 w-full md:w-auto">
          <div className="relative flex-1 sm:w-80">
            <FontAwesomeIcon icon={faSearch} className="absolute left-4 top-1/2 -translate-y-1/2 text-gray-400" />
            <input 
              type="text" 
              placeholder="Search products..." 
              className="w-full bg-accent/50 border-none rounded-2xl py-4 pl-12 pr-4 text-sm outline-none focus:ring-2 ring-primary transition-all"
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
                  !categoryFilter ? "bg-primary text-primary-foreground shadow-lg" : "hover:bg-accent"
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
                      ? "bg-secondary text-secondary-foreground shadow-lg" 
                      : "hover:bg-accent"
                  }`}
                >
                  {cat.image ? (
                    <div className="flex items-center gap-3">
                      <div className="relative w-12 h-12 rounded-lg overflow-hidden border border-gray-100 flex-shrink-0 bg-gray-50">
                        <Image src={cat.image} alt={cat.name} fill className="object-cover" />
                      </div>
                      <span className="text-sm line-clamp-1">{cat.name}</span>
                    </div>
                  ) : (
                    <span>{cat.icon} {cat.name}</span>
                  )}
                </Link>
              ))}
            </div>
          </div>
        </div>

        {/* Product Grid */}
        <div className="lg:col-span-3">
          {filteredProducts.length > 0 ? (
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
