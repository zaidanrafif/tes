'use client';

import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { Label } from '@/components/ui/label';

interface ProductFiltersProps {
  categories: string[];
  selectedCategory: string;
  sortOrder: 'asc' | 'desc';
  onCategoryChange: (category: string) => void;
  onSortChange: (sort: 'asc' | 'desc') => void;
}

export function ProductFilters({
  categories,
  selectedCategory,
  sortOrder,
  onCategoryChange,
  onSortChange,
}: ProductFiltersProps) {
  return (
    <div className="flex flex-col sm:flex-row gap-4 mb-8 p-4 bg-white rounded-lg shadow-sm border">
      <div className="flex-1">
        <Label htmlFor="category" className="text-sm font-medium mb-2 block">
          Category
        </Label>
        <Select value={selectedCategory} onValueChange={onCategoryChange}>
          <SelectTrigger id="category" className="w-full">
            <SelectValue placeholder="Select category" />
          </SelectTrigger>
          <SelectContent>
            <SelectItem value="all">All Categories</SelectItem>
            {categories.map((category) => (
              <SelectItem key={category} value={category}>
                {category.charAt(0).toUpperCase() + category.slice(1)}
              </SelectItem>
            ))}
          </SelectContent>
        </Select>
      </div>

      <div className="flex-1">
        <Label htmlFor="sort" className="text-sm font-medium mb-2 block">
          Sort by Price
        </Label>
        <Select value={sortOrder} onValueChange={(value) => onSortChange(value as 'asc' | 'desc')}>
          <SelectTrigger id="sort" className="w-full">
            <SelectValue placeholder="Sort by price" />
          </SelectTrigger>
          <SelectContent>
            <SelectItem value="asc">Price: Low to High</SelectItem>
            <SelectItem value="desc">Price: High to Low</SelectItem>
          </SelectContent>
        </Select>
      </div>
    </div>
  );
}
