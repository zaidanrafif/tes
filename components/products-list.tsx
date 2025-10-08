'use client';

import { useState, useEffect } from 'react';
import { Product } from '@/types/product';
import { ProductCard } from './product-card';
import { ProductFilters } from './product-filters';
import { Skeleton } from '@/components/ui/skeleton';

interface ProductsListProps {
  initialProducts: Product[];
  categories: string[];
}

export function ProductsList({ initialProducts, categories }: ProductsListProps) {
  const [products, setProducts] = useState<Product[]>(initialProducts);
  const [filteredProducts, setFilteredProducts] = useState<Product[]>(initialProducts);
  const [selectedCategory, setSelectedCategory] = useState<string>('all');
  const [sortOrder, setSortOrder] = useState<'asc' | 'desc'>('asc');
  const [isLoading, setIsLoading] = useState(false);

  useEffect(() => {
    async function fetchProducts() {
      setIsLoading(true);
      try {
        const params = new URLSearchParams();
        if (selectedCategory !== 'all') {
          params.set('category', selectedCategory);
        }

        const url = selectedCategory !== 'all'
          ? `https://dummyjson.com/products/category/${selectedCategory}`
          : 'https://dummyjson.com/products?limit=100';

        const response = await fetch(url);
        const data = await response.json();
        setProducts(data.products);
      } catch (error) {
        console.error('Error fetching products:', error);
      } finally {
        setIsLoading(false);
      }
    }

    fetchProducts();
  }, [selectedCategory]);

  useEffect(() => {
    const sorted = [...products].sort((a, b) => {
      if (sortOrder === 'asc') {
        return a.price - b.price;
      } else {
        return b.price - a.price;
      }
    });
    setFilteredProducts(sorted);
  }, [products, sortOrder]);

  return (
    <div>
      <ProductFilters
        categories={categories}
        selectedCategory={selectedCategory}
        sortOrder={sortOrder}
        onCategoryChange={setSelectedCategory}
        onSortChange={setSortOrder}
      />

      {isLoading ? (
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
          {Array.from({ length: 8 }).map((_, i) => (
            <div key={i} className="space-y-3">
              <Skeleton className="aspect-square w-full" />
              <Skeleton className="h-4 w-3/4" />
              <Skeleton className="h-4 w-1/2" />
            </div>
          ))}
        </div>
      ) : (
        <>
          <div className="mb-4 text-sm text-gray-600">
            Showing {filteredProducts.length} products
          </div>
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
            {filteredProducts.map((product) => (
              <ProductCard key={product.id} product={product} />
            ))}
          </div>
        </>
      )}
    </div>
  );
}
