import { Suspense } from 'react';
import ProductGrid from '../components/ProductGrid';

// Temporary mock data until we connect to the database
const mockProducts = [
  {
    id: '1',
    title: 'Classic White Shirt',
    price: 2999,
    images: ['https://images.unsplash.com/photo-1521572163474-6864f9cf17ab?w=500&auto=format'],
    rating: 4.5,
    seller: {
      name: 'Fashion Store',
      whatsappNumber: '254700000000'
    }
  },
  {
    id: '2',
    title: 'Black Denim Jeans',
    price: 3999,
    images: ['https://images.unsplash.com/photo-1541099649105-f69ad21f3246?w=500&auto=format'],
    rating: 4.8,
    seller: {
      name: 'Denim Hub',
      whatsappNumber: '254711000000'
    }
  }
];

export default function Home() {
  return (
    <main className="max-w-7xl mx-auto px-4 py-8">
      <h1 className="text-3xl font-bold text-gray-900 mb-8">
        Featured Men's Wear
      </h1>
      <div className="mb-8">
        <div className="flex gap-4 overflow-x-auto pb-4">
          {['All', 'Shirts', 'Pants', 'Suits', 'Accessories'].map((category) => (
            <button
              key={category}
              className="px-4 py-2 rounded-full bg-gray-100 text-gray-700 hover:bg-green-600 hover:text-white transition-colors whitespace-nowrap"
            >
              {category}
            </button>
          ))}
        </div>
      </div>
      <Suspense fallback={<div>Loading products...</div>}>
        <ProductGrid products={mockProducts} />
      </Suspense>
    </main>
  );
}