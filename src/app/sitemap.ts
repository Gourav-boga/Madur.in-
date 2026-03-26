import { MetadataRoute } from 'next'

export default async function sitemap(): Promise<MetadataRoute.Sitemap> {
  const baseUrl = 'https://madur.in';

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

  // Fetch categories for dynamic routes
  let categoryRoutes: MetadataRoute.Sitemap = [];
  try {
    const response = await fetch(`${baseUrl}/api/categories`);
    const categories = await response.json();
    
    if (Array.isArray(categories)) {
      categoryRoutes = categories.map((cat) => ({
        url: `${baseUrl}/products?category=${encodeURIComponent(cat.name)}`,
        lastModified: new Date(),
        changeFrequency: 'weekly' as const,
        priority: 0.6,
      }));
    }
  } catch (error) {
    console.error('Sitemap: Failed to fetch categories', error);
  }

  return [...staticRoutes, ...categoryRoutes];
}
