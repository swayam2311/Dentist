import type { Metadata, Viewport } from 'next';
import { Newsreader, Manrope } from 'next/font/google';
import '@/styles/globals.css';
import { siteConfig } from '@/config/site.config';
import { Header } from '@/components/navigation/Header';
import { Footer } from '@/components/navigation/Footer';
import { MobileStickyBar } from '@/components/navigation/MobileStickyBar';
import { SmoothScrollProvider } from '@/components/motion/SmoothScrollProvider';

const newsreader = Newsreader({
  subsets: ['latin'],
  display: 'swap',
  variable: '--font-newsreader',
  style: ['normal', 'italic'],
  weight: ['400', '500', '600'],
});

const manrope = Manrope({
  subsets: ['latin'],
  display: 'swap',
  variable: '--font-manrope',
  weight: ['400', '500', '600', '700'],
});

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
  robots: {
    index: true,
    follow: true,
  },
};

export const viewport: Viewport = {
  width: 'device-width',
  initialScale: 1,
  maximumScale: 5,
  themeColor: '#1B6B6F',
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  // Schema.org Dentist / LocalBusiness Structured Data
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
    <html lang="en" className={`${newsreader.variable} ${manrope.variable}`}>
      <head>
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
        />
      </head>
      <body data-theme="warm" className="min-h-screen flex flex-col font-sans bg-theme-surface text-theme-ink">
        <SmoothScrollProvider>
          <Header />
          <main className="flex-1 pt-24">{children}</main>
          <Footer />
          <MobileStickyBar />
        </SmoothScrollProvider>
      </body>
    </html>
  );
}

