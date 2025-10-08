import { getProducts, getCategories } from '@/lib/api';
import { ProductsList } from '@/components/products-list';
import { Package } from 'lucide-react';

export default async function Home() {
  const [productsData, categories] = await Promise.all([
    getProducts({ limit: 100 }),
    getCategories(),
  ]);

  return (
    <main className="min-h-screen bg-gradient-to-b from-gray-50 to-white">
      <div className="container mx-auto px-4 py-8">
        <header className="mb-12 text-center">
          <div className="flex items-center justify-center gap-3 mb-4">
            <Package className="w-10 h-10 text-blue-600" />
            <h1 className="text-4xl md:text-5xl font-bold text-gray-900">
              Premium Store
            </h1>
          </div>
          <p className="text-lg text-gray-600 max-w-2xl mx-auto">
            Discover our curated collection of quality products at unbeatable prices
          </p>
        </header>

        <ProductsList
          initialProducts={productsData.products}
          categories={categories}
        />
      </div>
    </main>
  );
}
