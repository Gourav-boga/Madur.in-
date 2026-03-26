import { Metadata } from 'next';
import ProductsContent from '@/components/products/ProductsContent';

export const metadata: Metadata = {
  title: "Fresh Products | MADUR.IN",
  description: "Browse our wide range of farm-fresh products including pure milk, ghee, paneer, and organic vegetables. Order online for home delivery in Hyderabad.",
  alternates: {
    canonical: "https://madur.in/products",
  },
};

export const dynamic = 'force-dynamic';

export default function ProductsPage() {
  return <ProductsContent />;
}
