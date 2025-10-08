import './globals.css';
import type { Metadata } from 'next';
import { Inter } from 'next/font/google';
import Link from 'next/link';
import { Package } from 'lucide-react';

const inter = Inter({ subsets: ['latin'] });

export const metadata: Metadata = {
  title: 'Premium Store - Quality Products at Great Prices',
  description: 'Discover our curated collection of quality products. Browse by category, compare prices, and find exactly what you need.',
  keywords: 'e-commerce, online shopping, products, deals, quality products',
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en">
      <body className={inter.className}>
        <nav className="border-b bg-white sticky top-0 z-50 shadow-sm">
          <div className="container mx-auto px-4 py-4">
            <Link href="/" className="flex items-center gap-2 hover:opacity-80 transition-opacity w-fit">
              <Package className="w-6 h-6 text-blue-600" />
              <span className="text-xl font-bold text-gray-900">Premium Store</span>
            </Link>
          </div>
        </nav>
        {children}
        <footer className="border-t bg-gray-50 mt-16">
          <div className="container mx-auto px-4 py-8">
            <div className="text-center text-gray-600 text-sm">
              <p>&copy; {new Date().getFullYear()} Premium Store. All rights reserved.</p>
            </div>
          </div>
        </footer>
      </body>
    </html>
  );
}
