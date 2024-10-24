'use client';

import { useState } from 'react';
import { notFound, useRouter } from 'next/navigation';
import Image from 'next/image';
import { Star, MessageCircle, ShoppingCart } from 'lucide-react';
import { useCartStore } from '@/lib/store';
import toast from 'react-hot-toast';

// This would typically come from your database
const getProduct = (id: string) => {
  const products = [
    {
      id: '1',
      title: 'Classic White Shirt',
      description: 'A timeless classic white shirt made from premium cotton. Perfect for any formal occasion.',
      price: 2999,
      images: ['https://images.unsplash.com/photo-1521572163474-6864f9cf17ab?w=500&auto=format'],
      rating: 4.5,
      seller: {
        name: 'Fashion Store',
        whatsappNumber: '254700000000'
      },
      sizes: ['S', 'M', 'L', 'XL'],
      inStock: true
    },
    {
      id: '2',
      title: 'Black Denim Jeans',
      description: 'Premium black denim jeans with a perfect fit and lasting comfort.',
      price: 3999,
      images: ['https://images.unsplash.com/photo-1541099649105-f69ad21f3246?w=500&auto=format'],
      rating: 4.8,
      seller: {
        name: 'Denim Hub',
        whatsappNumber: '254711000000'
      },
      sizes: ['30', '32', '34', '36'],
      inStock: true
    }
  ];
  
  return products.find(p => p.id === id);
};

export default function ProductPage({ params }: { params: { id: string } }) {
  const router = useRouter();
  const product = getProduct(params.id);
  const [selectedSize, setSelectedSize] = useState<string>('');
  const { addItem } = useCartStore();

  if (!product) {
    notFound();
  }

  const handleWhatsAppChat = () => {
    const message = `Hi, I'm interested in ${product.title}`;
    const whatsappUrl = `https://wa.me/${product.seller.whatsappNumber}?text=${encodeURIComponent(message)}`;
    window.open(whatsappUrl, '_blank');
  };

  const handleAddToCart = () => {
    if (!selectedSize) {
      toast.error('Please select a size');
      return;
    }

    addItem({
      id: product.id,
      title: product.title,
      price: product.price,
      image: product.images[0],
      size: selectedSize,
      quantity: 1,
    });

    toast.success('Added to cart');
    router.push('/cart');
  };

  return (
    <main className="max-w-7xl mx-auto px-4 py-8">
      <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
        <div className="relative h-[500px] rounded-lg overflow-hidden">
          <Image
            src={product.images[0]}
            alt={product.title}
            fill
            className="object-cover"
            priority
          />
        </div>

        <div className="space-y-6">
          <div>
            <h1 className="text-3xl font-bold text-gray-900">{product.title}</h1>
            <div className="mt-2 flex items-center">
              <Star className="w-5 h-5 text-yellow-400 fill-current" />
              <span className="ml-1 text-gray-600">{product.rating}</span>
            </div>
          </div>

          <p className="text-gray-600">{product.description}</p>

          <div className="text-3xl font-bold text-green-600">
            KSh {product.price.toLocaleString()}
          </div>

          <div>
            <h3 className="text-lg font-semibold mb-2">Available Sizes</h3>
            <div className="flex gap-2">
              {product.sizes.map((size) => (
                <button
                  key={size}
                  onClick={() => setSelectedSize(size)}
                  className={`px-4 py-2 border rounded-md transition-colors ${
                    selectedSize === size
                      ? 'border-green-600 text-green-600 bg-green-50'
                      : 'border-gray-300 hover:border-green-600 hover:text-green-600'
                  }`}
                >
                  {size}
                </button>
              ))}
            </div>
          </div>

          <div className="flex gap-4">
            <button
              onClick={handleWhatsAppChat}
              className="flex items-center px-6 py-3 text-green-600 border border-green-600 rounded-lg hover:bg-green-50 transition-colors"
            >
              <MessageCircle className="w-5 h-5 mr-2" />
              Chat with Seller
            </button>
            <button
              onClick={handleAddToCart}
              className="flex items-center px-6 py-3 bg-green-600 text-white rounded-lg hover:bg-green-700 transition-colors"
            >
              <ShoppingCart className="w-5 h-5 mr-2" />
              Buy Now
            </button>
          </div>

          <div className="pt-6 border-t border-gray-200">
            <h3 className="text-lg font-semibold mb-2">Seller Information</h3>
            <p className="text-gray-600">{product.seller.name}</p>
          </div>
        </div>
      </div>
    </main>
  );
}