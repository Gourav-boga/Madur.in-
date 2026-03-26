import { MetadataRoute } from 'next'
import { query } from '@/lib/mysql'
import { categories as staticCategories } from '@/lib/data'

export default async function sitemap(): Promise<MetadataRoute.Sitemap> {
  const baseUrl = 'https://www.madur.in';

  // Static routes
  const staticRoutes = [
    '',
    '/about',
    '/contact',
    '/services',
    '/products',
    '/reviews',
    '/privacy',
    '/terms',
  ].map((route) => ({
    url: `${baseUrl}${route}`,
    lastModified: new Date(),
    changeFrequency: 'weekly' as const,
    priority: route === '' ? 1 : 0.8,
  }));

  // Fetch categories from DB for dynamic routes
  let categoryRoutes: MetadataRoute.Sitemap = [];
  try {
    const categories = await query('SELECT name FROM categories');
    
    const displayCategories = (Array.isArray(categories) && categories.length > 0) 
      ? categories 
      : staticCategories;

    categoryRoutes = displayCategories.map((cat: any) => ({
      url: `${baseUrl}/products?category=${encodeURIComponent(cat.name)}`,
      lastModified: new Date(),
      changeFrequency: 'weekly' as const,
      priority: 0.6,
    }));
  } catch (error) {
    console.error('Sitemap: DB query failed, using static categories', error);
    categoryRoutes = staticCategories.map((cat: any) => ({
      url: `${baseUrl}/products?category=${encodeURIComponent(cat.name)}`,
      lastModified: new Date(),
      changeFrequency: 'weekly' as const,
      priority: 0.6,
    }));
  }

  return [...staticRoutes, ...categoryRoutes];
}
