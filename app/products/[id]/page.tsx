import { getProduct, getProducts } from '@/lib/api';
import { ProductCarousel } from '@/components/product-carousel';
import { Badge } from '@/components/ui/badge';
import { Card } from '@/components/ui/card';
import { Star, Package, Truck, RefreshCw, Shield } from 'lucide-react';
import { notFound } from 'next/navigation';

export async function generateStaticParams() {
  const data = await getProducts({ limit: 30 });
  return data.products.map((product) => ({
    id: product.id.toString(),
  }));
}

export default async function ProductPage({
  params,
}: {
  params: { id: string };
}) {
  let product;

  try {
    product = await getProduct(Number(params.id));
  } catch (error) {
    notFound();
  }

  const availabilityColor =
    product.availabilityStatus === 'In Stock'
      ? 'bg-green-500'
      : product.availabilityStatus === 'Low Stock'
      ? 'bg-yellow-500'
      : 'bg-red-500';

  return (
    <main className="min-h-screen bg-gradient-to-b from-gray-50 to-white">
      <div className="container mx-auto px-4 py-8">
        <div className="grid md:grid-cols-2 gap-8 lg:gap-12">
          <div>
            <ProductCarousel images={product.images} title={product.title} />
          </div>

          <div className="space-y-6">
            <div>
              <div className="text-sm text-gray-500 uppercase tracking-wide mb-2">
                {product.category} • {product.brand}
              </div>
              <h1 className="text-3xl md:text-4xl font-bold text-gray-900 mb-4">
                {product.title}
              </h1>

              <div className="flex items-center gap-4 mb-4">
                <div className="flex items-center gap-1">
                  <Star className="w-5 h-5 fill-yellow-500 text-yellow-500" />
                  <span className="font-semibold">{product.rating.toFixed(1)}</span>
                  <span className="text-gray-500">({product.reviews.length} reviews)</span>
                </div>
                <Badge className={availabilityColor}>
                  {product.availabilityStatus}
                </Badge>
              </div>

              <div className="flex items-baseline gap-3 mb-6">
                <span className="text-4xl font-bold text-gray-900">
                  ${product.price.toFixed(2)}
                </span>
                {product.discountPercentage > 0 && (
                  <>
                    <span className="text-xl text-gray-400 line-through">
                      ${(product.price / (1 - product.discountPercentage / 100)).toFixed(2)}
                    </span>
                    <Badge variant="destructive" className="text-sm">
                      Save {Math.round(product.discountPercentage)}%
                    </Badge>
                  </>
                )}
              </div>

              <p className="text-gray-700 leading-relaxed mb-6">
                {product.description}
              </p>
            </div>

            <Card className="p-6 space-y-4">
              <div className="flex items-center gap-3">
                <Package className="w-5 h-5 text-gray-600" />
                <div>
                  <div className="font-medium">Stock Available</div>
                  <div className="text-sm text-gray-600">
                    {product.stock} units available
                  </div>
                </div>
              </div>

              <div className="flex items-center gap-3">
                <Truck className="w-5 h-5 text-gray-600" />
                <div>
                  <div className="font-medium">Shipping</div>
                  <div className="text-sm text-gray-600">
                    {product.shippingInformation}
                  </div>
                </div>
              </div>

              <div className="flex items-center gap-3">
                <RefreshCw className="w-5 h-5 text-gray-600" />
                <div>
                  <div className="font-medium">Return Policy</div>
                  <div className="text-sm text-gray-600">
                    {product.returnPolicy}
                  </div>
                </div>
              </div>

              <div className="flex items-center gap-3">
                <Shield className="w-5 h-5 text-gray-600" />
                <div>
                  <div className="font-medium">Warranty</div>
                  <div className="text-sm text-gray-600">
                    {product.warrantyInformation}
                  </div>
                </div>
              </div>
            </Card>

            <div className="grid grid-cols-2 gap-4 text-sm">
              <div className="p-4 bg-gray-50 rounded-lg">
                <div className="text-gray-600">SKU</div>
                <div className="font-medium">{product.sku}</div>
              </div>
              <div className="p-4 bg-gray-50 rounded-lg">
                <div className="text-gray-600">Weight</div>
                <div className="font-medium">{product.weight} kg</div>
              </div>
              <div className="p-4 bg-gray-50 rounded-lg">
                <div className="text-gray-600">Dimensions</div>
                <div className="font-medium">
                  {product.dimensions.width} × {product.dimensions.height} × {product.dimensions.depth} cm
                </div>
              </div>
              <div className="p-4 bg-gray-50 rounded-lg">
                <div className="text-gray-600">Min. Order</div>
                <div className="font-medium">{product.minimumOrderQuantity} units</div>
              </div>
            </div>

            {product.tags.length > 0 && (
              <div>
                <h3 className="font-semibold mb-2">Tags</h3>
                <div className="flex flex-wrap gap-2">
                  {product.tags.map((tag, index) => (
                    <Badge key={index} variant="outline">
                      {tag}
                    </Badge>
                  ))}
                </div>
              </div>
            )}
          </div>
        </div>

        {product.reviews.length > 0 && (
          <div className="mt-12">
            <h2 className="text-2xl font-bold mb-6">Customer Reviews</h2>
            <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-4">
              {product.reviews.map((review, index) => (
                <Card key={index} className="p-6">
                  <div className="flex items-center gap-2 mb-3">
                    <div className="flex items-center">
                      {Array.from({ length: 5 }).map((_, i) => (
                        <Star
                          key={i}
                          className={`w-4 h-4 ${
                            i < review.rating
                              ? 'fill-yellow-500 text-yellow-500'
                              : 'text-gray-300'
                          }`}
                        />
                      ))}
                    </div>
                    <span className="text-sm font-semibold">{review.rating}/5</span>
                  </div>
                  <p className="text-gray-700 mb-3">{review.comment}</p>
                  <div className="text-sm text-gray-600">
                    <div className="font-medium">{review.reviewerName}</div>
                    <div className="text-xs">
                      {new Date(review.date).toLocaleDateString('en-US', {
                        year: 'numeric',
                        month: 'long',
                        day: 'numeric',
                      })}
                    </div>
                  </div>
                </Card>
              ))}
            </div>
          </div>
        )}
      </div>
    </main>
  );
}
