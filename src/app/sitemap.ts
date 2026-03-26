import { MetadataRoute } from 'next'

export default async function sitemap(): Promise<MetadataRoute.Sitemap> {
  const baseUrl = 'https://www.madur.in';

  const routes = [
    '',
    '/about',
    '/contact',
    '/services',
    '/products',
    '/reviews',
    '/privacy',
    '/terms',
    '/products?category=Milk%20%26%20Dairy',
    '/products?category=Vegetables',
    '/products?category=Groceries%20%2F%20Staples',
    '/products?category=Spices%20%26%20Powders',
    '/products?category=Cold%20Pressed%20Oils',
    '/products?category=Pickles',
    '/products?category=Traditional%20Snacks',
    '/products?category=Eggs',
    '/products?category=Honey%20%26%20Natural%20Products',
    '/products?category=Dry%20Fruits',
  ].map((route) => ({
    url: `${baseUrl}${route}`,
    lastModified: new Date(),
    changeFrequency: 'weekly' as const,
    priority: route === '' ? 1 : 0.8,
  }));

  return routes;
}
