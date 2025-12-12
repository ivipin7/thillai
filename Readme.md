# 🧵 Thillai Textiles - E-Commerce Platform

Modern, full-stack e-commerce platform for traditional Indian textiles and sarees, built with React, Node.js, and MongoDB.

## 🌟 Features

### Customer Features
- 🛍️ Browse saree collections with video previews
- 🛒 Shopping cart with quantity management
- ❤️ Wishlist functionality
- 💳 Secure payment via Razorpay
- 🔍 Product filtering (category, price, name)
- 📦 Order tracking placeholder
- 📱 Fully responsive design
- ✨ Smooth scrolling navigation with parallax effects

### Product Catalog
- **6 Premium Saree Collections**
  - Kanchipuram Silk Saree (Rs.1500)
  - Onam Saree (Rs.899)
  - Kalyani Cotton Saree (Rs.999)
  - Softsilk Saree (Rs.799)
  - Chettinad Cotton Saree (Rs.1299)
  - Vaalainaar Pattu Saree (Rs.1999)

## 🏗️ Tech Stack

### Frontend
- **React 18** - UI framework
- **Vite** - Build tool & dev server
- **React Router** - Client-side routing
- **Axios** - HTTP client
- **React Icons** - Icon library
- **React Scroll Parallax** - Parallax effects

### Backend
- **Node.js & Express** - Server framework
- **MongoDB & Mongoose** - Database
- **Razorpay** - Payment gateway
- **CORS** - Cross-origin support

## 📁 Project Structure

```
thillai-main/
├── vite-project/          # Frontend React Application
│   ├── src/
│   │   ├── Components/    # Reusable UI components
│   │   │   ├── CartModal/
│   │   │   ├── WishlistModal/
│   │   │   ├── TrackingModal/
│   │   │   ├── Navbar/
│   │   │   ├── PaymentModal/
│   │   │   ├── Offers/
│   │   │   └── FooterQuickLinks/
│   │   ├── Pages/         # Route pages
│   │   │   ├── Home/
│   │   │   ├── OurProducts/
│   │   │   ├── SareeCollection/
│   │   │   ├── Checkout/
│   │   │   ├── OrderSuccess/
│   │   │   ├── About/
│   │   │   └── Contactus/
│   │   ├── assets/        # Images, videos, fonts
│   │   ├── App.jsx        # Main app component
│   │   └── main.jsx       # App entry point
│   └── package.json
│
└── server/                # Backend API Server
    ├── controllers/       # Business logic
    │   └── orderController.js
    ├── models/           # MongoDB schemas
    │   ├── Order.js
    │   ├── Product.js
    │   └── User.js
    ├── routes/           # API routes
    │   └── orderRoutes.js
    ├── server.js         # Express server
    └── .env              # Environment variables
```

## 🚀 Getting Started

### Prerequisites
- Node.js (v14 or higher)
- MongoDB (local or Atlas)
- Razorpay account (for payment integration)

### Installation

1. **Clone the repository**
```bash
git clone https://github.com/ivipin7/thillai.git
cd thillai-main
```

2. **Install frontend dependencies**
```bash
cd vite-project
npm install
```

3. **Install backend dependencies**
```bash
cd ../server
npm install
```

4. **Configure environment variables**

Create `.env` file in the `server` directory:
```env
PORT=5000
MONGO_URI=mongodb://localhost:27017/thillai_textiles
RAZORPAY_KEY_ID=your_razorpay_key_id
RAZORPAY_KEY_SECRET=your_razorpay_key_secret
```

### Running the Application

1. **Start MongoDB**
```bash
mongod
```

2. **Start backend server**
```bash
cd server
npm run dev
# Server runs on http://localhost:5000
```

3. **Start frontend development server**
```bash
cd vite-project
npm run dev
# App runs on http://localhost:3000
```

## 🛠️ API Endpoints

### Orders
- `POST /api/orders` - Create new order
- `POST /api/orders/verify` - Verify Razorpay payment
- `GET /api/orders/:id` - Get order by ID

## 💳 Payment Integration

The platform uses **Razorpay** for secure payment processing:

1. Customer proceeds to checkout
2. Order is created in database
3. Razorpay order is generated
4. Customer completes payment
5. Payment signature is verified
6. Order status is updated

## 📱 Pages & Routes

- `/` - Home page with hero section
- `/#products` - Product showcase (scroll section)
- `/#about` - Company information
- `/#contact` - Contact details
- `/sarees` - Detailed saree collection with filters
- `/sarees?filter=ProductName` - Filtered product view
- `/checkout` - Checkout page
- `/order-success/:id` - Order confirmation

## 🎨 Key Features Details

### Sidebar Modals
- **Cart Modal** - View items, adjust quantities, proceed to checkout
- **Wishlist Modal** - Save favorite items, move to cart
- **Tracking Modal** - Track order status (placeholder)

### Product Filtering
- Filter by category (Silk/Cotton)
- Filter by price range
- Search by product name
- URL parameter support for direct filtering

### Click-to-Filter
Click any product card to navigate to the filtered collection page

## 🏢 Company Information

**Shri Thillai Textiles**
Founded: 2005
Founder: Mr. Murugan Nataraj

📍 Address: 140/70, No.2, Kumaran Street, Salem - 636001, Tamil Nadu
📧 Email: shrithillaitextiles@gmail.com
📱 Phone: +91 98765 43210
📸 Instagram: [@shrithillai_textiles](https://www.instagram.com/shrithillai_textiles)

## 🔧 Build for Production

### Frontend
```bash
cd vite-project
npm run build
# Output in dist/ directory
```

### Backend
```bash
cd server
NODE_ENV=production node server.js
```

## 📝 To-Do / Future Enhancements

- [ ] User authentication & registration
- [ ] Admin panel for product management
- [ ] Move product data to database
- [ ] Order history for users
- [ ] Email notifications
- [ ] Product reviews & ratings
- [ ] Shipping integration (Velocity Express)
- [ ] Advanced search functionality
- [ ] Inventory management
- [ ] Analytics dashboard
- [ ] Multi-language support

## 🤝 Contributing

Contributions are welcome! Please feel free to submit a Pull Request.

## 📄 License

This project is proprietary software owned by Shri Thillai Textiles.

## 👨‍💻 Development Team

Maintained by the Thillai Textiles development team.

---

**Made with ❤️ for traditional Indian textiles**
