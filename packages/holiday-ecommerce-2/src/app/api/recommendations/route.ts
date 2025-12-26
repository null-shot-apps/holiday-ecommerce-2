import { NextResponse } from 'next/server';

// Gift recommendations API based on browsing history, price range, and recipient type
export async function POST(request: Request) {
  try {
    const body = await request.json() as { 
      browsingHistory?: Array<{ category: string; tags?: string[] }>; 
      priceRange?: [number, number]; 
      recipientType?: string 
    };
    const { browsingHistory, priceRange, recipientType } = body;

    // All available products
    const allProducts = [
      { id: 1, name: 'Christmas Tree Ornament Set', price: 29.99, category: 'adults', tags: ['decoration', 'home'], image: '🎄' },
      { id: 2, name: 'Kids Toy Bundle', price: 49.99, category: 'kids', tags: ['toys', 'fun'], image: '🎁' },
      { id: 3, name: 'Holiday Candle Collection', price: 34.99, category: 'adults', tags: ['home', 'relaxation'], image: '🕯️' },
      { id: 4, name: 'Santa Plush Toy', price: 19.99, category: 'kids', tags: ['toys', 'soft'], image: '🎅' },
      { id: 5, name: 'Gingerbread House Kit', price: 24.99, category: 'kids', tags: ['food', 'activity'], image: '🏠' },
      { id: 6, name: 'Wine & Cheese Gift Basket', price: 79.99, category: 'adults', tags: ['food', 'luxury'], image: '🍷' },
      { id: 7, name: 'Christmas Sweater', price: 39.99, category: 'adults', tags: ['clothing', 'festive'], image: '🎄' },
      { id: 8, name: 'Remote Control Car', price: 44.99, category: 'kids', tags: ['toys', 'tech'], image: '🚗' },
      { id: 9, name: 'Scented Bath Set', price: 29.99, category: 'adults', tags: ['wellness', 'relaxation'], image: '🛁' },
      { id: 10, name: 'Building Blocks Set', price: 34.99, category: 'kids', tags: ['toys', 'educational'], image: '🧱' },
    ];

    // Filter by recipient type
    let filtered = recipientType 
      ? allProducts.filter(p => p.category === recipientType)
      : allProducts;

    // Filter by price range
    if (priceRange) {
      const [min, max] = priceRange;
      filtered = filtered.filter(p => p.price >= min && p.price <= max);
    }

    // Score products based on browsing history
    if (browsingHistory && browsingHistory.length > 0) {
      filtered = filtered.map(product => {
        let score = 0;
        browsingHistory.forEach((historyItem: any) => {
          // Match by category
          if (historyItem.category === product.category) score += 3;
          // Match by tags
          if (historyItem.tags) {
            historyItem.tags.forEach((tag: string) => {
              if (product.tags.includes(tag)) score += 2;
            });
          }
        });
        return { ...product, score };
      }).sort((a, b) => b.score - a.score);
    }

    // Return top 6 recommendations
    const recommendations = filtered.slice(0, 6);

    return NextResponse.json({
      success: true,
      recommendations,
      filters: {
        recipientType,
        priceRange,
        browsingHistoryUsed: (browsingHistory?.length ?? 0) > 0
      }
    });
  } catch (error) {
    return NextResponse.json(
      { success: false, error: 'Failed to generate recommendations' },
      { status: 500 }
    );
  }
}

// Get trending gifts
export async function GET() {
  try {
    const trending = [
      { id: 2, name: 'Kids Toy Bundle', price: 49.99, category: 'kids', sales: 245, image: '🎁' },
      { id: 1, name: 'Christmas Tree Ornament Set', price: 29.99, category: 'adults', sales: 198, image: '🎄' },
      { id: 6, name: 'Wine & Cheese Gift Basket', price: 79.99, category: 'adults', sales: 156, image: '🍷' },
      { id: 8, name: 'Remote Control Car', price: 44.99, category: 'kids', sales: 134, image: '🚗' },
    ];

    return NextResponse.json({
      success: true,
      trending
    });
  } catch (error) {
    return NextResponse.json(
      { success: false, error: 'Failed to fetch trending gifts' },
      { status: 500 }
    );
  }
}



