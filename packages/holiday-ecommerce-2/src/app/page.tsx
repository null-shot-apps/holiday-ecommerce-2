'use client';

import { useEffect, useState } from 'react';
import Link from 'next/link';

export default function Home() {
  const [user, setUser] = useState<any>(null);
  const [flashSale, setFlashSale] = useState<any>(null);
  const [notification, setNotification] = useState<string>('');

  useEffect(() => {
    // Auto-login check
    const savedUser = localStorage.getItem('user');
    if (savedUser) {
      setUser(JSON.parse(savedUser));
    }

    // Flash sale timer
    const saleEnd = new Date();
    saleEnd.setHours(saleEnd.getHours() + 2);
    setFlashSale({ endTime: saleEnd, discount: 30 });

    // Simulated push notification
    setTimeout(() => {
      setNotification('🎄 Flash Sale: 30% off all gifts!');
      setTimeout(() => setNotification(''), 5000);
    }, 2000);
  }, []);

  const products = [
    { id: 1, name: 'Christmas Tree Ornament Set', price: 29.99, category: 'adults', image: '🎄' },
    { id: 2, name: 'Kids Toy Bundle', price: 49.99, category: 'kids', image: '🎁' },
    { id: 3, name: 'Holiday Candle Collection', price: 34.99, category: 'adults', image: '🕯️' },
    { id: 4, name: 'Santa Plush Toy', price: 19.99, category: 'kids', image: '🎅' },
  ];

  return (
    <div className="min-h-screen bg-gradient-to-br from-red-50 via-white to-green-50">
      {/* Notification Banner */}
      {notification && (
        <div className="fixed top-0 left-0 right-0 bg-red-600 text-white py-3 px-4 text-center z-50 animate-slide-down">
          {notification}
        </div>
      )}

      {/* Header */}
      <header className="bg-white shadow-sm sticky top-0 z-40">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-4">
          <div className="flex justify-between items-center">
            <h1 className="text-2xl sm:text-3xl font-bold text-red-600">🎄 Christmas Shop</h1>
            <div className="flex items-center gap-4">
              {user ? (
                <div className="flex items-center gap-3">
                  <span className="text-sm sm:text-base">Hi, {user.name}!</span>
                  <button className="bg-red-600 text-white px-4 py-2 rounded-lg text-sm sm:text-base hover:bg-red-700">
                    Cart (0)
                  </button>
                </div>
              ) : (
                <Link href="/login" className="bg-red-600 text-white px-4 py-2 rounded-lg text-sm sm:text-base hover:bg-red-700">
                  Login
                </Link>
              )}
            </div>
          </div>
        </div>
      </header>

      {/* Flash Sale Banner */}
      {flashSale && (
        <div className="bg-gradient-to-r from-red-600 to-green-600 text-white py-6 px-4 text-center">
          <h2 className="text-xl sm:text-2xl font-bold mb-2">⚡ FLASH SALE - {flashSale.discount}% OFF!</h2>
          <p className="text-sm sm:text-base">Ends in 2 hours - Don&apos;t miss out!</p>
        </div>
      )}

      {/* Main Content */}
      <main className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        {/* Gift Recommendations */}
        <section className="mb-12">
          <h2 className="text-2xl sm:text-3xl font-bold text-gray-800 mb-6">🎁 Recommended Gifts</h2>
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
            {products.map((product) => (
              <div key={product.id} className="bg-white rounded-xl shadow-lg overflow-hidden hover:shadow-2xl transition-all transform hover:scale-105">
                <div className="text-6xl sm:text-7xl text-center py-8 bg-gradient-to-br from-red-100 to-green-100">
                  {product.image}
                </div>
                <div className="p-4 sm:p-6">
                  <h3 className="font-semibold text-base sm:text-lg mb-2 text-gray-800">{product.name}</h3>
                  <div className="flex justify-between items-center mb-4">
                    <span className="text-xl sm:text-2xl font-bold text-red-600">${product.price}</span>
                    <span className="text-xs sm:text-sm text-gray-500 bg-gray-100 px-2 py-1 rounded">
                      {product.category === 'kids' ? '👶 Kids' : '👨 Adults'}
                    </span>
                  </div>
                  <Link 
                    href={`/checkout/${product.id}`}
                    className="block w-full bg-green-600 text-white py-2 sm:py-3 rounded-lg text-center font-semibold hover:bg-green-700 transition-colors text-sm sm:text-base"
                  >
                    Quick Checkout
                  </Link>
                </div>
              </div>
            ))}
          </div>
        </section>

        {/* Crypto Payment Info */}
        <section className="bg-gradient-to-r from-purple-600 to-blue-600 text-white rounded-2xl p-6 sm:p-8 mb-12">
          <h2 className="text-2xl sm:text-3xl font-bold mb-4">💰 Pay with Crypto</h2>
          <p className="text-base sm:text-lg mb-4">We accept Bitcoin & Ethereum with real-time exchange rates!</p>
          <div className="flex flex-wrap gap-4">
            <div className="bg-white/20 backdrop-blur-sm rounded-lg px-4 sm:px-6 py-3 sm:py-4">
              <div className="text-xs sm:text-sm opacity-80">Bitcoin (BTC)</div>
              <div className="text-lg sm:text-xl font-bold">$45,230</div>
            </div>
            <div className="bg-white/20 backdrop-blur-sm rounded-lg px-4 sm:px-6 py-3 sm:py-4">
              <div className="text-xs sm:text-sm opacity-80">Ethereum (ETH)</div>
              <div className="text-lg sm:text-xl font-bold">$2,340</div>
            </div>
          </div>
        </section>
      </main>

      {/* Footer */}
      <footer className="bg-gray-800 text-white py-8 px-4 text-center">
        <p className="text-sm sm:text-base">🎅 Merry Christmas! © 2024 Christmas Shop</p>
      </footer>
    </div>
  );
}

