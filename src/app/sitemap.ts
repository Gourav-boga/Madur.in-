import { MetadataRoute } from 'next'
import { query } from '@/lib/mysql'
import { categories as staticCategories } from '@/lib/data'

export default async function sitemap(): Promise<MetadataRoute.Sitemap> {
  const baseUrl = 'https://www.madur.in';

  // 1. Static Routes
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

  // 2. Dynamic Categories
  let categoriesData = [];
  try {
    // Try to get from DB first
    const dbCategories = await query('SELECT name FROM categories');
    if (Array.isArray(dbCategories) && dbCategories.length > 0) {
      categoriesData = dbCategories;
    } else {
      categoriesData = staticCategories;
    }
  } catch (err) {
    console.error('Sitemap DB Error:', err);
    categoriesData = staticCategories;
  }

  // Generate category routes
  const categoryRoutes = categoriesData.map((cat: any) => ({
    url: `${baseUrl}/products?category=${encodeURIComponent(cat.name)}`,
    lastModified: new Date(),
    changeFrequency: 'weekly' as const,
    priority: 0.6,
  }));

  return [...staticRoutes, ...categoryRoutes];
}
