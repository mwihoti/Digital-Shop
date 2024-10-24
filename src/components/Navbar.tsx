'use client';

import { useState } from 'react';
import Link from 'next/link';
import { useRouter } from 'next/navigation';
import { useAuth } from './AuthProvider';
import { Bell, Menu, ShoppingCart, User, LogOut } from 'lucide-react';
import { useCartStore } from '@/lib/store';

export default function Navbar() {
  const { user, signOut } = useAuth();
  const router = useRouter();
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const { items } = useCartStore();

  const cartItemCount = items.reduce((sum, item) => sum + item.quantity, 0);

  return (
    <nav className="bg-white border-b border-gray-100">
      <div className="max-w-7xl mx-auto px-4">
        <div className="flex items-center justify-between h-16">
          <div className="flex items-center">
            <button 
              onClick={() => setIsMenuOpen(!isMenuOpen)}
              className="p-2 rounded-lg hover:bg-gray-100 lg:hidden"
            >
              <Menu className="w-6 h-6" />
            </button>
            <Link href="/" className="ml-4 text-xl font-bold text-green-600">
              M-PESA
            </Link>
          </div>

          <div className="hidden lg:flex items-center space-x-8">
            <Link href="/" className="text-gray-600 hover:text-gray-900">
              Home
            </Link>
            {user?.role === 'SELLER' && (
              <Link href="/dashboard" className="text-gray-600 hover:text-gray-900">
                Dashboard
              </Link>
            )}
            {user?.role === 'ADMIN' && (
              <Link href="/admin" className="text-gray-600 hover:text-gray-900">
                Admin Panel
              </Link>
            )}
          </div>

          <div className="flex items-center space-x-4">
            {user ? (
              <>
                <Link href="/notifications" className="p-2 rounded-lg hover:bg-gray-100 relative">
                  <Bell className="w-6 h-6" />
                  <span className="absolute top-0 right-0 w-2 h-2 bg-red-500 rounded-full"></span>
                </Link>
                <Link href="/cart" className="p-2 rounded-lg hover:bg-gray-100 relative">
                  <ShoppingCart className="w-6 h-6" />
                  {cartItemCount > 0 && (
                    <span className="absolute -top-1 -right-1 w-5 h-5 bg-green-600 text-white rounded-full text-xs flex items-center justify-center">
                      {cartItemCount}
                    </span>
                  )}
                </Link>
                <div className="relative">
                  <button
                    onClick={() => setIsMenuOpen(!isMenuOpen)}
                    className="p-2 rounded-lg hover:bg-gray-100"
                  >
                    <User className="w-6 h-6" />
                  </button>
                  {isMenuOpen && (
                    <div className="absolute right-0 mt-2 w-48 bg-white rounded-lg shadow-lg py-1">
                      <Link
                        href="/profile"
                        className="block px-4 py-2 text-gray-700 hover:bg-gray-100"
                      >
                        Profile
                      </Link>
                      {user.role === 'SELLER' && (
                        <Link
                          href="/messages"
                          className="block px-4 py-2 text-gray-700 hover:bg-gray-100"
                        >
                          Messages
                        </Link>
                      )}
                      <button
                        onClick={() => signOut()}
                        className="w-full text-left px-4 py-2 text-gray-700 hover:bg-gray-100"
                      >
                        Sign Out
                      </button>
                    </div>
                  )}
                </div>
              </>
            ) : (
              <Link
                href="/auth/login"
                className="px-4 py-2 text-green-600 border border-green-600 rounded-lg hover:bg-green-50"
              >
                Sign In
              </Link>
            )}
          </div>
        </div>
      </div>
    </nav>
  );
}