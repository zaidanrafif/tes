import Image from 'next/image';
import Link from 'next/link';
import { Product } from '@/types/product';
import { Card, CardContent, CardFooter, CardHeader } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';

interface ProductCardProps {
  product: Product;
}

export function ProductCard({ product }: ProductCardProps) {
  return (
    <Link href={`/product/${product.id}`}>
      <Card className="group h-full overflow-hidden transition-all hover:shadow-lg">
        <CardHeader className="p-0">
          <div className="relative aspect-square overflow-hidden bg-gray-100">
            <Image
              src={product.thumbnail}
              alt={product.title}
              fill
              sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
              className="object-cover transition-transform duration-300 group-hover:scale-105"
              loading="lazy"
            />
            {product.discountPercentage > 0 && (
              <Badge className="absolute right-2 top-2 bg-red-500">
                -{Math.round(product.discountPercentage)}%
              </Badge>
            )}
          </div>
        </CardHeader>
        <CardContent className="p-4">
          <div className="mb-1 text-xs text-gray-500 uppercase tracking-wide">
            {product.category}
          </div>
          <h3 className="mb-2 text-lg font-semibold line-clamp-2 group-hover:text-blue-600 transition-colors">
            {product.title}
          </h3>
          <p className="text-sm text-gray-600 line-clamp-2 mb-3">
            {product.description}
          </p>
          <div className="flex items-center gap-2 mb-2">
            <div className="flex items-center">
              <span className="text-yellow-500">★</span>
              <span className="ml-1 text-sm font-medium">{product.rating.toFixed(1)}</span>
            </div>
            <span className="text-xs text-gray-400">•</span>
            <span className="text-xs text-gray-500">
              {product.stock > 0 ? `${product.stock} in stock` : 'Out of stock'}
            </span>
          </div>
        </CardContent>
        <CardFooter className="p-4 pt-0">
          <div className="flex items-baseline gap-2">
            <span className="text-2xl font-bold text-gray-900">
              ${product.price.toFixed(2)}
            </span>
            {product.discountPercentage > 0 && (
              <span className="text-sm text-gray-400 line-through">
                ${(product.price / (1 - product.discountPercentage / 100)).toFixed(2)}
              </span>
            )}
          </div>
        </CardFooter>
      </Card>
    </Link>
  );
}
