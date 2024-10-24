'use client';

import { useCartStore } from '@/lib/store';
import Image from 'next/image';
import { Minus, Plus, Trash2 } from 'lucide-react';
import { useRouter } from 'next/navigation';

export default function CartPage() {
  const { items, removeItem, updateQuantity, total } = useCartStore();
  const router = useRouter();

  if (items.length === 0) {
    return (
      <div className="min-h-[60vh] flex flex-col items-center justify-center">
        <h2 className="text-2xl font-bold text-gray-900 mb-4">Your cart is empty</h2>
        <a
          href="/"
          className="px-6 py-3 bg-green-600 text-white rounded-lg hover:bg-green-700 transition-colors"
        >
          Continue Shopping
        </a>
      </div>
    );
  }

  return (
    <main className="max-w-7xl mx-auto px-4 py-8">
      <h1 className="text-3xl font-bold text-gray-900 mb-8">Shopping Cart</h1>
      
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
        <div className="lg:col-span-2 space-y-4">
          {items.map((item) => (
            <div key={`${item.id}-${item.size}`} className="flex gap-4 bg-white p-4 rounded-lg shadow-sm">
              <div className="relative w-24 h-24">
                <Image
                  src={item.image}
                  alt={item.title}
                  fill
                  className="object-cover rounded-md"
                />
              </div>
              
              <div className="flex-1">
                <h3 className="font-semibold text-gray-900">{item.title}</h3>
                <p className="text-sm text-gray-600">Size: {item.size}</p>
                <p className="font-medium text-green-600">
                  KSh {item.price.toLocaleString()}
                </p>
                
                <div className="mt-2 flex items-center gap-2">
                  <button
                    onClick={() => updateQuantity(item.id, Math.max(1, item.quantity - 1))}
                    className="p-1 rounded-md hover:bg-gray-100"
                  >
                    <Minus className="w-4 h-4" />
                  </button>
                  <span className="w-8 text-center">{item.quantity}</span>
                  <button
                    onClick={() => updateQuantity(item.id, item.quantity + 1)}
                    className="p-1 rounded-md hover:bg-gray-100"
                  >
                    <Plus className="w-4 h-4" />
                  </button>
                  <button
                    onClick={() => removeItem(item.id)}
                    className="ml-auto p-1 text-red-600 hover:bg-red-50 rounded-md"
                  >
                    <Trash2 className="w-4 h-4" />
                  </button>
                </div>
              </div>
            </div>
          ))}
        </div>
        
        <div className="bg-white p-6 rounded-lg shadow-sm h-fit">
          <h2 className="text-xl font-semibold mb-4">Order Summary</h2>
          
          <div className="space-y-2 mb-4">
            <div className="flex justify-between">
              <span className="text-gray-600">Subtotal</span>
              <span className="font-medium">KSh {total().toLocaleString()}</span>
            </div>
            <div className="flex justify-between">
              <span className="text-gray-600">Delivery</span>
              <span className="font-medium">KSh 200</span>
            </div>
            <div className="pt-2 border-t border-gray-200 flex justify-between">
              <span className="font-semibold">Total</span>
              <span className="font-bold text-green-600">
                KSh {(total() + 200).toLocaleString()}
              </span>
            </div>
          </div>
          
          <button
            onClick={() => router.push('/checkout')}
            className="w-full py-3 bg-green-600 text-white rounded-lg hover:bg-green-700 transition-colors"
          >
            Proceed to Checkout
          </button>
        </div>
      </div>
    </main>
  );
}