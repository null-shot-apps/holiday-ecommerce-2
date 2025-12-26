# 🎄 Christmas E-commerce App

A modern, feature-rich Christmas-themed e-commerce platform with advanced payment options and smart recommendations.

## ✨ Features

### 🔐 User Authentication
- **Social Login**: Google & Facebook OAuth integration
- **Auto-Login**: Automatic authentication for returning users
- **Guest Checkout**: Shop without creating an account

### 💳 Payment Options
- **Traditional Payments**: Credit/Debit cards
- **Crypto Payments**: Bitcoin (BTC) & Ethereum (ETH)
- **Real-Time Exchange Rates**: Live crypto pricing updated every 3 seconds
- **Coinbase Commerce Integration**: Secure crypto payment processing
- **One-Click Checkout**: Fast, streamlined purchase flow

### 🎁 Smart Gift Recommendations
- **Browsing History Analysis**: Personalized suggestions based on viewing patterns
- **Price Range Filtering**: Find gifts within your budget
- **Recipient Type Targeting**: Separate recommendations for kids and adults
- **Trending Gifts**: Popular items updated in real-time

### ⚡ Flash Sales
- **Time-Limited Offers**: Countdown timers for urgency
- **Dynamic Discounts**: Up to 30% off during flash sales
- **Real-Time Updates**: Instant price changes

### 🔔 Real-Time Notifications
- **Push Notifications**: Browser notifications for sales and promotions
- **Email Notifications**: Order confirmations and updates
- **In-App Alerts**: Live notification banners

### 📱 Mobile Optimization
- **Responsive Design**: Perfect on all screen sizes
- **Touch-Friendly**: Optimized for mobile interactions
- **Fast Loading**: Optimized performance for mobile networks

## 🚀 Tech Stack

- **Framework**: Next.js 15 (App Router)
- **Styling**: Tailwind CSS 4
- **Deployment**: Cloudflare (OpenNext)
- **Language**: TypeScript
- **Payment Processing**: Coinbase Commerce / BTCPay Server

## 📦 API Endpoints

### `/api/crypto-rates`
Get real-time cryptocurrency exchange rates
```json
{
  "success": true,
  "rates": {
    "BTC": { "usd": "45230.00", "symbol": "₿" },
    "ETH": { "usd": "2340.00", "symbol": "Ξ" }
  }
}
```

### `/api/recommendations`
Get personalized gift recommendations
```json
{
  "browsingHistory": [...],
  "priceRange": [20, 50],
  "recipientType": "kids"
}
```

### `/api/notifications`
Send and retrieve user notifications

## 🎨 Features Breakdown

### User Login Automation
- Social OAuth providers (Google, Facebook)
- LocalStorage-based session persistence
- Automatic re-authentication on return visits

### Crypto Payment System
- Live exchange rate updates (3-second intervals)
- Support for Bitcoin (BTC) and Ethereum (ETH)
- Coinbase Commerce integration ready
- Real-time price conversion display

### Gift Recommendation Engine
- Analyzes browsing patterns
- Filters by price range ($0-$100+)
- Categorizes by recipient (kids/adults)
- Scoring algorithm for relevance

### Flash Sales System
- Countdown timers
- Dynamic discount application
- Promotional banners
- Urgency messaging

### Notification System
- Browser push notifications
- Email notifications (SendGrid/AWS SES ready)
- In-app notification banners
- Real-time delivery

## 🛠️ Development

```bash
# Install dependencies
pnpm install

# Run development server
pnpm dev

# Build for production
pnpm build

# Deploy to Cloudflare
pnpm deploy
```

## 🌐 Environment Variables

```env
# Coinbase Commerce (for crypto payments)
NEXT_PUBLIC_COINBASE_COMMERCE_API_KEY=your_api_key

# Social Auth
NEXT_PUBLIC_GOOGLE_CLIENT_ID=your_google_client_id
NEXT_PUBLIC_FACEBOOK_APP_ID=your_facebook_app_id

# Email Notifications
SENDGRID_API_KEY=your_sendgrid_key
```

## 📱 Mobile Optimization

- Responsive grid layouts (1-4 columns based on screen size)
- Touch-optimized buttons and interactions
- Mobile-first design approach
- Optimized images and assets
- Fast page transitions

## 🎯 Future Enhancements

- [ ] Wishlist functionality
- [ ] Order tracking
- [ ] Product reviews and ratings
- [ ] Advanced search and filters
- [ ] Multi-currency support
- [ ] Loyalty rewards program
- [ ] Gift wrapping options
- [ ] Delivery scheduling

## 📄 License

MIT License - feel free to use this for your own projects!

---

🎅 **Merry Christmas and Happy Shopping!** 🎄

