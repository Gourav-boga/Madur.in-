import { Metadata } from 'next';
import HomeContent from '@/components/home/HomeContent';

export const metadata: Metadata = {
  title: "MADUR.IN | Farm Fresh Grocery & Dairy Delivery in Hyderabad",
  description: "Get 100% natural, farm-fresh milk, vegetables, and groceries delivered to your doorstep in Hyderabad. Quality dairy and organic produce from Madur.in.",
  alternates: {
    canonical: "https://www.madur.in",
  },
};

export const dynamic = 'force-dynamic';

export default function Home() {
  const jsonLd = {
    "@context": "https://schema.org",
    "@type": "LocalBusiness",
    "name": "MADUR.IN",
    "image": "https://madur.in/logo-final.png",
    "@id": "https://madur.in",
    "url": "https://madur.in",
    "telephone": "+917416750834",
    "address": {
      "@type": "PostalAddress",
      "streetAddress": "Hyderabad",
      "addressLocality": "Hyderabad",
      "addressRegion": "Telangana",
      "postalCode": "500001",
      "addressCountry": "IN"
    },
    "geo": {
      "@type": "GeoCoordinates",
      "latitude": 17.3850,
      "longitude": 78.4867
    },
    "openingHoursSpecification": {
      "@type": "OpeningHoursSpecification",
      "dayOfWeek": [
        "Monday",
        "Tuesday",
        "Wednesday",
        "Thursday",
        "Friday",
        "Saturday",
        "Sunday"
      ],
      "opens": "00:00",
      "closes": "23:59"
    },
    "sameAs": [
      "https://www.facebook.com/madur.in",
      "https://www.instagram.com/madur.in"
    ]
  };

  return (
    <>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
      />
      <HomeContent />
    </>
  );
}
