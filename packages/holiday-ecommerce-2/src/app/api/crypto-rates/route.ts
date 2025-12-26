import { NextResponse } from 'next/server';

// Simulated crypto rates API endpoint
// In production, this would fetch from Coinbase Commerce or CoinGecko API
export async function GET() {
  try {
    // Simulate real-time crypto rates with slight variations
    const btcRate = 45230 + (Math.random() * 200 - 100);
    const ethRate = 2340 + (Math.random() * 40 - 20);

    return NextResponse.json({
      success: true,
      rates: {
        BTC: {
          usd: btcRate.toFixed(2),
          symbol: '₿',
          name: 'Bitcoin'
        },
        ETH: {
          usd: ethRate.toFixed(2),
          symbol: 'Ξ',
          name: 'Ethereum'
        }
      },
      timestamp: new Date().toISOString(),
      provider: 'Coinbase Commerce'
    });
  } catch (error) {
    return NextResponse.json(
      { success: false, error: 'Failed to fetch crypto rates' },
      { status: 500 }
    );
  }
}

