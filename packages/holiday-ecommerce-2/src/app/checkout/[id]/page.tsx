'use client';

import { useState, useEffect } from 'react';
import { useRouter, useParams } from 'next/navigation';
import Link from 'next/link';

export default function Checkout() {
  const router = useRouter();
  const params = useParams();
  const [product, setProduct] = useState<any>(null);
  const [paymentMethod, setPaymentMethod] = useState('card');
  const [cryptoRates, setCryptoRates] = useState({ btc: 45230, eth: 2340 });
  const [processing, setProcessing] = useState(false);
  const [orderComplete, setOrderComplete] = useState(false);

  useEffect(() => {
    // Fetch product details
    const products = [
      { id: 1, name: 'Christmas Tree Ornament Set', price: 29.99, image: '🎄' },
      { id: 2, name: 'Kids Toy Bundle', price: 49.99, image: '🎁' },
      { id: 3, name: 'Holiday Candle Collection', price: 34.99, image: '🕯️' },
      { id: 4, name: 'Santa Plush Toy', price: 19.99, image: '🎅' },
    ];
    const foundProduct = products.find(p => p.id === parseInt(params.id as string));
    setProduct(foundProduct);

    // Simulate real-time crypto rate updates
    const interval = setInterval(() => {
      setCryptoRates({
        btc: 45230 + Math.random() * 100 - 50,
        eth: 2340 + Math.random() * 20 - 10
      });
    }, 3000);

    return () => clearInterval(interval);
  }, [params.id]);

  const handleOneClickCheckout = () => {
    setProcessing(true);
    
    // Simulate payment processing
    setTimeout(() => {
      setProcessing(false);
      setOrderComplete(true);
      
      // Send email notification (simulated)
      console.log('📧 Email notification sent: Order confirmed!');
      
      // Show push notification
      if ('Notification' in window && Notification.permission === 'granted') {
        new Notification('Order Confirmed! 🎉', {
          body: `Your ${product?.name} is on the way!`,
          icon: '🎄'
        });
      }
      
      setTimeout(() => {
        router.push('/');
      }, 3000);
    }, 2000);
  };

  if (!product) return <div className="min-h-screen flex items-center justify-center">Loading...</div>;

  if (orderComplete) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-green-50 via-white to-red-50 flex items-center justify-center px-4">
        <div className="bg-white rounded-2xl shadow-2xl p-8 max-w-md w-full text-center">
          <div className="text-6xl mb-4">🎉</div>
          <h1 className="text-3xl font-bold text-green-600 mb-4">Order Confirmed!</h1>
          <p className="text-gray-600 mb-6">
            Your {product.name} is on the way! Check your email for order details.
          </p>
          <div className="bg-green-50 border-2 border-green-200 rounded-lg p-4 mb-6">
            <p className="text-sm text-green-800">
              📧 Email notification sent<br/>
              🔔 Push notification delivered
            </p>
          </div>
          <Link href="/" className="inline-block bg-red-600 text-white px-8 py-3 rounded-lg font-semibold hover:bg-red-700">
            Continue Shopping
          </Link>
        </div>
      </div>
    );
  }

  const cryptoPrice = {
    btc: (product.price / cryptoRates.btc).toFixed(6),
    eth: (product.price / cryptoRates.eth).toFixed(4)
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-red-50 via-white to-green-50">
      <header className="bg-white shadow-sm">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-4">
          <Link href="/" className="text-2xl font-bold text-red-600">🎄 Christmas Shop</Link>
        </div>
      </header>

      <main className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        <h1 className="text-3xl sm:text-4xl font-bold text-gray-800 mb-8">Quick Checkout</h1>

        <div className="grid md:grid-cols-2 gap-8">
          {/* Product Summary */}
          <div className="bg-white rounded-xl shadow-lg p-6">
            <h2 className="text-xl font-bold mb-4">Order Summary</h2>
            <div className="flex items-center gap-4 mb-6">
              <div className="text-5xl">{product.image}</div>
              <div>
                <h3 className="font-semibold text-lg">{product.name}</h3>
                <p className="text-2xl font-bold text-red-600">${product.price}</p>
              </div>
            </div>
            <div className="border-t pt-4">
              <div className="flex justify-between mb-2">
                <span>Subtotal:</span>
                <span>${product.price}</span>
              </div>
              <div className="flex justify-between mb-2">
                <span>Shipping:</span>
                <span className="text-green-600">FREE</span>
              </div>
              <div className="flex justify-between font-bold text-lg border-t pt-2">
                <span>Total:</span>
                <span>${product.price}</span>
              </div>
            </div>
          </div>

          {/* Payment Methods */}
          <div className="bg-white rounded-xl shadow-lg p-6">
            <h2 className="text-xl font-bold mb-4">Payment Method</h2>
            
            <div className="space-y-3 mb-6">
              <button
                onClick={() => setPaymentMethod('card')}
                className={`w-full p-4 rounded-lg border-2 text-left transition-all ${
                  paymentMethod === 'card' ? 'border-red-600 bg-red-50' : 'border-gray-200'
                }`}
              >
                <div className="flex items-center gap-3">
                  <span className="text-2xl">💳</span>
                  <span className="font-semibold">Credit/Debit Card</span>
                </div>
              </button>

              <button
                onClick={() => setPaymentMethod('btc')}
                className={`w-full p-4 rounded-lg border-2 text-left transition-all ${
                  paymentMethod === 'btc' ? 'border-orange-600 bg-orange-50' : 'border-gray-200'
                }`}
              >
                <div className="flex items-center justify-between">
                  <div className="flex items-center gap-3">
                    <span className="text-2xl">₿</span>
                    <span className="font-semibold">Bitcoin</span>
                  </div>
                  <div className="text-right">
                    <div className="text-sm text-gray-500">Live Rate</div>
                    <div className="font-bold text-orange-600">${cryptoRates.btc.toFixed(2)}</div>
                    <div className="text-xs text-gray-600">{cryptoPrice.btc} BTC</div>
                  </div>
                </div>
              </button>

              <button
                onClick={() => setPaymentMethod('eth')}
                className={`w-full p-4 rounded-lg border-2 text-left transition-all ${
                  paymentMethod === 'eth' ? 'border-purple-600 bg-purple-50' : 'border-gray-200'
                }`}
              >
                <div className="flex items-center justify-between">
                  <div className="flex items-center gap-3">
                    <span className="text-2xl">Ξ</span>
                    <span className="font-semibold">Ethereum</span>
                  </div>
                  <div className="text-right">
                    <div className="text-sm text-gray-500">Live Rate</div>
                    <div className="font-bold text-purple-600">${cryptoRates.eth.toFixed(2)}</div>
                    <div className="text-xs text-gray-600">{cryptoPrice.eth} ETH</div>
                  </div>
                </div>
              </button>
            </div>

            {paymentMethod === 'card' && (
              <div className="space-y-3 mb-6">
                <input
                  type="text"
                  placeholder="Card Number"
                  className="w-full px-4 py-3 border-2 border-gray-200 rounded-lg focus:border-red-600 focus:outline-none"
                />
                <div className="grid grid-cols-2 gap-3">
                  <input
                    type="text"
                    placeholder="MM/YY"
                    className="px-4 py-3 border-2 border-gray-200 rounded-lg focus:border-red-600 focus:outline-none"
                  />
                  <input
                    type="text"
                    placeholder="CVV"
                    className="px-4 py-3 border-2 border-gray-200 rounded-lg focus:border-red-600 focus:outline-none"
                  />
                </div>
              </div>
            )}

            {(paymentMethod === 'btc' || paymentMethod === 'eth') && (
              <div className="bg-gradient-to-r from-purple-50 to-blue-50 border-2 border-purple-200 rounded-lg p-4 mb-6">
                <p className="text-sm text-gray-700 mb-2">
                  <strong>Powered by Coinbase Commerce</strong>
                </p>
                <p className="text-xs text-gray-600">
                  Real-time exchange rates updated every 3 seconds. Secure crypto payment processing.
                </p>
              </div>
            )}

            <button
              onClick={handleOneClickCheckout}
              disabled={processing}
              className="w-full bg-gradient-to-r from-green-600 to-green-700 text-white py-4 rounded-lg font-bold text-lg hover:from-green-700 hover:to-green-800 transition-all disabled:opacity-50 disabled:cursor-not-allowed"
            >
              {processing ? (
                <span className="flex items-center justify-center gap-2">
                  <svg className="animate-spin h-5 w-5" viewBox="0 0 24 24">
                    <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4" fill="none"/>
                    <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"/>
                  </svg>
                  Processing...
                </span>
              ) : (
                '⚡ Complete Order - One Click!'
              )}
            </button>

            <p className="text-xs text-gray-500 text-center mt-4">
              🔒 Secure checkout • 📧 Email confirmation • 🔔 Push notifications
            </p>
          </div>
        </div>
      </main>
    </div>
  );
}

