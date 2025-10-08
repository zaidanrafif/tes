import { Product, ProductsResponse } from '@/types/product';

const API_BASE = 'https://dummyjson.com';

export async function getProducts(params?: {
  limit?: number;
  skip?: number;
  category?: string;
  sortBy?: string;
  order?: 'asc' | 'desc';
}): Promise<ProductsResponse> {
  try {
    let url = `${API_BASE}/products`;

    if (params?.category && params.category !== 'all') {
      url = `${API_BASE}/products/category/${params.category}`;
    }

    const searchParams = new URLSearchParams();
    if (params?.limit) searchParams.set('limit', params.limit.toString());
    if (params?.skip) searchParams.set('skip', params.skip.toString());
    if (params?.sortBy) searchParams.set('sortBy', params.sortBy);
    if (params?.order) searchParams.set('order', params.order);

    const queryString = searchParams.toString();
    if (queryString) {
      url += `?${queryString}`;
    }

    const response = await fetch(url, {
      next: { revalidate: 3600 }
    });

    if (!response.ok) {
      throw new Error('Failed to fetch products');
    }

    return response.json();
  } catch (error) {
    console.error('Error fetching products:', error);
    throw error;
  }
}

export async function getProduct(id: number): Promise<Product> {
  try {
    const response = await fetch(`${API_BASE}/products/${id}`, {
      next: { revalidate: 3600 }
    });

    if (!response.ok) {
      throw new Error('Failed to fetch product');
    }

    return response.json();
  } catch (error) {
    console.error('Error fetching product:', error);
    throw error;
  }
}

export async function getCategories(): Promise<string[]> {
  try {
    const response = await fetch(`${API_BASE}/products/categories`, {
      next: { revalidate: 86400 }
    });

    if (!response.ok) {
      throw new Error('Failed to fetch categories');
    }

    const data = await response.json();

    return Array.isArray(data)
      ? data.map(cat => typeof cat === 'string' ? cat : cat.slug || cat.name || String(cat))
      : [];
  } catch (error) {
    console.error('Error fetching categories:', error);
    return [];
  }
}
