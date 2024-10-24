'use client';

import { useEffect, useState } from 'react';
import { useRouter } from 'next/navigation';
import { useCartStore } from '@/lib/store';
import { Loader2 } from 'lucide-react';

export default function PaymentPage() {
  const router = useRouter();
  const { total, clearCart } = useCartStore();
  const [status, setStatus] = useState<'pending' | 'success' | 'failed'>('pending');

  useEffect(() => {
    // Simulate M-PESA payment process
    const timer = setTimeout(() => {
      setStatus('success');
      clearCart();
    }, 5000);

    return () => clearTimeout(timer);
  }, [clearCart]);

  if (status === 'success') {
    return (
      <div className="min-h-[60vh] flex flex-col items-center justify-center">
        <div className="bg-white p-8 rounded-lg shadow-sm text-center">
          <div className="w-16 h-16 bg-green-100 rounded-full flex items-center justify-center mx-auto mb-4">
            <svg className="w-8 h-8 text-green-600" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
            </svg>
          </div>
          <h2 className="text-2xl font-bold text-gray-900 mb-2">Payment Successful!</h2>
          <p className="text-gray-600 mb-6">
            Your order has been confirmed and will be delivered soon.
          </p>
          <button
            onClick={() => router.push('/')}
            className="px-6 py-3 bg-green-600 text-white rounded-lg hover:bg-green-700 transition-colors"
          >
            Continue Shopping
          </button>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-[60vh] flex flex-col items-center justify-center">
      <div className="bg-white p-8 rounded-lg shadow-sm text-center">
        <Loader2 className="w-12 h-12 text-green-600 animate-spin mx-auto mb-4" />
        <h2 className="text-2xl font-bold text-gray-900 mb-2">Processing Payment</h2>
        <p className="text-gray-600 mb-4">
          Please check your phone for the M-PESA prompt and enter your PIN.
        </p>
        <p className="text-sm text-gray-500">
          Amount: KSh {(total() + 200).toLocaleString()}
        </p>
      </div>
    </div>
  );
}