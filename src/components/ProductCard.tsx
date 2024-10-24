'use client';

import Image from 'next/image';
import Link from 'next/link';
import { Star, MessageCircle } from 'lucide-react';

interface ProductCardProps {
  product: {
    id: string;
    title: string;
    price: number;
    images: string[];
    rating?: number;
    seller: {
      name: string;
      whatsappNumber: string;
    };
  };
}

export default function ProductCard({ product }: ProductCardProps) {
  const handleWhatsAppChat = () => {
    const message = `Hi, I'm interested in ${product.title}`;
    const whatsappUrl = `https://wa.me/${product.seller.whatsappNumber}?text=${encodeURIComponent(message)}`;
    window.open(whatsappUrl, '_blank');
  };

  return (
    <div className="bg-white rounded-lg shadow-md overflow-hidden">
      <div className="relative h-64">
        <Image
          src={product.images[0]}
          alt={product.title}
          fill
          className="object-cover"
        />
      </div>
      <div className="p-4">
        <Link href={`/products/${product.id}`}>
          <h3 className="text-lg font-semibold text-gray-800 hover:text-green-600 transition-colors">
            {product.title}
          </h3>
        </Link>
        <div className="mt-2 flex items-center justify-between">
          <p className="text-xl font-bold text-green-600">
            KSh {product.price.toLocaleString()}
          </p>
          {product.rating && (
            <div className="flex items-center">
              <Star className="w-4 h-4 text-yellow-400 fill-current" />
              <span className="ml-1 text-sm text-gray-600">{product.rating}</span>
            </div>
          )}
        </div>
        <div className="mt-4 flex justify-between items-center">
          <button
            onClick={handleWhatsAppChat}
            className="flex items-center text-sm text-green-600 hover:text-green-700"
          >
            <MessageCircle className="w-4 h-4 mr-1" />
            Chat with Seller
          </button>
          <button className="px-4 py-2 bg-green-600 text-white rounded-lg hover:bg-green-700 transition-colors">
            Buy Now
          </button>
        </div>
      </div>
    </div>
  );
}