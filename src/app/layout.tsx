import type { Metadata, Viewport } from 'next';
import '@/styles/globals.css';
import { siteConfig } from '@/config/site.config';
import { Header } from '@/components/navigation/Header';
import { Footer } from '@/components/navigation/Footer';
import { MobileStickyBar } from '@/components/navigation/MobileStickyBar';
import { SmoothScrollProvider } from '@/components/motion/SmoothScrollProvider';

export const metadata: Metadata = {
  title: {
    default: `${siteConfig.name} — Manpada, Thane`,
    template: `%s · ${siteConfig.name}`,
  },
  description: siteConfig.description,
  metadataBase: new URL(siteConfig.url),
  keywords: [
    'Dentist in Thane',
    'Dental Clinic Manpada',
    'Gangal Dental Clinic',
    'Dr Anand Gangal',
    'Dental Implants Thane',
    'Invisalign Thane',
    'Root Canal Treatment Manpada',
    'Family Dentistry Thane',
    'Happy Valley Shopping Complex Dentist',
  ],
  authors: [{ name: 'Dr. Anand Gangal' }],
  creator: 'Gangal Dental Clinic',
  openGraph: {
    type: 'website',
    locale: 'en_IN',
    url: siteConfig.url,
    title: siteConfig.name,
    description: siteConfig.tagline,
    siteName: siteConfig.name,
  },
  icons: {
    icon: '/logo.svg',
    shortcut: '/logo.svg',
    apple: '/logo.svg',
  },
  robots: {
    index: true,
    follow: true,
  },
};

export const viewport: Viewport = {
  width: 'device-width',
  initialScale: 1,
  maximumScale: 5,
  themeColor: '#005255',
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  const jsonLd = {
    '@context': 'https://schema.org',
    '@type': ['Dentist', 'MedicalBusiness', 'LocalBusiness'],
    name: siteConfig.name,
    description: siteConfig.description,
    url: siteConfig.url,
    telephone: [siteConfig.contact.landline, siteConfig.contact.mobile],
    email: siteConfig.contact.email,
    address: {
      '@type': 'PostalAddress',
      streetAddress: `${siteConfig.address.line1}, ${siteConfig.address.street}`,
      addressLocality: siteConfig.address.city,
      addressRegion: siteConfig.address.state,
      postalCode: siteConfig.address.pincode,
      addressCountry: 'IN',
    },
    geo: {
      '@type': 'GeoCoordinates',
      latitude: siteConfig.address.geo.latitude,
      longitude: siteConfig.address.geo.longitude,
    },
    openingHoursSpecification: [
      {
        '@type': 'OpeningHoursSpecification',
        dayOfWeek: ['Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday'],
        opens: '10:00',
        closes: '13:00',
      },
      {
        '@type': 'OpeningHoursSpecification',
        dayOfWeek: ['Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday'],
        opens: '18:00',
        closes: '22:00',
      },
      {
        '@type': 'OpeningHoursSpecification',
        dayOfWeek: ['Saturday'],
        opens: '10:00',
        closes: '17:00',
      },
    ],
    priceRange: '₹₹',
    medicalSpecialty: ['Dentistry', 'Orthodontics', 'Periodontics', 'Prosthodontics'],
    sameAs: [siteConfig.address.googleMapsUrl],
  };

  return (
    <html lang="en">
      <head>
        <link rel="preconnect" href="https://fonts.googleapis.com" />
        <link rel="preconnect" href="https://fonts.gstatic.com" crossOrigin="" />
        <link
          href="https://fonts.googleapis.com/css2?family=Manrope:wght@400;500;600;700&family=Newsreader:ital,opsz,wght@0,6..72,400;0,6..72,500;0,6..72,600;1,6..72,400&display=swap"
          rel="stylesheet"
        />
        <link
          href="https://fonts.googleapis.com/css2?family=Material+Symbols+Outlined:opsz,wght,FILL,GRAD@20..48,100..700,0..1,-50..200"
          rel="stylesheet"
        />
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
        />
      </head>
      <body data-theme="aqua" className="min-h-screen flex flex-col font-sans bg-surface text-on-surface antialiased selection:bg-secondary-container selection:text-on-secondary-fixed">
        <SmoothScrollProvider>
          <Header />
          <main className="flex-1 pt-20">{children}</main>
          <Footer />
          <MobileStickyBar />
        </SmoothScrollProvider>
      </body>
    </html>
  );
}
