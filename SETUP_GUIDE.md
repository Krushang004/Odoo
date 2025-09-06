# 🚀 Complete Setup Guide for EcoFinds

## 📋 Prerequisites
- Node.js 18+ installed
- MongoDB (local or cloud)
- Git (optional)

## 🛠️ Step-by-Step Setup

### 1. **Install Dependencies**
```bash
npm install
```

### 2. **Environment Configuration**
Create a `.env.local` file in the project root:

```env
# Database
MONGODB_URI=mongodb://localhost:27017/ecofinds

# NextAuth
NEXTAUTH_URL=http://localhost:3000
NEXTAUTH_SECRET=your-secret-key-here-change-this-in-production
```

### 3. **Database Setup**

#### Option A: MongoDB Atlas (Recommended - Free)
1. Go to [mongodb.com/atlas](https://mongodb.com/atlas)
2. Create a free account
3. Create a new cluster (free tier)
4. Get your connection string
5. Update `MONGODB_URI` in `.env.local`

#### Option B: Local MongoDB
1. Install MongoDB locally
2. Start MongoDB service
3. Use `mongodb://localhost:27017/ecofinds`

### 4. **Add Sample Data**
```bash
npm run add-samples
```
This will add:
- 10 sample products
- 1 demo user (demo@ecofinds.com / demo123)

### 5. **Start Development Server**
```bash
npm run dev
```

### 6. **Access the Application**
Open [http://localhost:3000](http://localhost:3000)

## 🎯 **What You'll See**

### ✅ **Working Features:**
- **Home Page**: Welcome screen with featured products
- **Product Browsing**: Search, filter, and pagination
- **User Authentication**: Register, login, logout
- **Product Management**: Create, edit, delete products
- **Order System**: Purchase items, track orders
- **Responsive Design**: Works on mobile and desktop

### 🛍️ **Sample Products Include:**
- Vintage Leather Jacket ($89.99)
- MacBook Pro 2019 ($899.99)
- Organic Gardening Books ($24.99)
- Ceramic Plant Pots ($45.00)
- Yoga Mat ($35.99)
- Wooden Building Blocks ($29.99)
- Vintage Camera Collection ($199.99)
- Handmade Wool Scarf ($39.99)
- Bamboo Kitchen Utensils ($18.99)
- Sustainable Living Guide ($12.99)

## 🔧 **Available Commands**

```bash
# Development
npm run dev              # Start development server
npm run build           # Build for production
npm run start           # Start production server
npm run lint            # Run ESLint

# Setup
npm run setup           # Initial project setup
npm run setup-mongodb   # MongoDB setup guide
npm run add-samples     # Add sample products
```

## 🐛 **Troubleshooting**

### Common Issues:

1. **MongoDB Connection Error**
   ```
   Error: connect ECONNREFUSED ::1:27017
   ```
   **Solution**: Set up MongoDB (see step 3)

2. **Environment Variables**
   ```
   Error: Please define the MONGODB_URI environment variable
   ```
   **Solution**: Create `.env.local` file (see step 2)

3. **Port Already in Use**
   ```
   Error: listen EADDRINUSE: address already in use :::3000
   ```
   **Solution**: Use different port: `npm run dev -- -p 3001`

4. **No Products Showing**
   ```
   No products available
   ```
   **Solution**: Run `npm run add-samples`

## 🎉 **Success Indicators**

When everything is working correctly:
- ✅ Home page loads without errors
- ✅ Products display in the grid
- ✅ User registration/login works
- ✅ Product creation works
- ✅ Orders can be placed
- ✅ No console errors

## 🚀 **Next Steps**

1. **Customize**: Modify products, styling, or features
2. **Deploy**: Use Vercel, Netlify, or other platforms
3. **Scale**: Add more features like reviews, messaging, etc.

## 📚 **Additional Resources**

- [README.md](./README.md) - Project overview
- [DEPLOYMENT.md](./DEPLOYMENT.md) - Deployment guide
- [TROUBLESHOOTING.md](./TROUBLESHOOTING.md) - Detailed troubleshooting

## 🆘 **Need Help?**

If you're still having issues:
1. Check the terminal for error messages
2. Verify all environment variables are set
3. Ensure MongoDB is running
4. Try restarting the development server
5. Check the browser console for errors

**The application is now ready to use!** 🎉
