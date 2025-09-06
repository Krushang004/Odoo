#!/usr/bin/env node

const mongoose = require('mongoose')
require('dotenv').config({ path: '.env.local' })

// Define schemas directly since we can't import TypeScript models in Node.js script
const UserSchema = new mongoose.Schema({
  name: {
    type: String,
    required: [true, 'Please provide a name'],
    maxLength: [50, 'Name cannot be more than 50 characters'],
  },
  email: {
    type: String,
    required: [true, 'Please provide an email'],
    unique: true,
  },
  password: {
    type: String,
    required: [true, 'Please provide a password'],
    minLength: [6, 'Password must be at least 6 characters'],
  },
  images: {
    type: [String],
    required: [true, 'Please provide at least 2 profile photos'],
    validate: {
      validator: function(images) {
        return images && images.length >= 2
      },
      message: 'User must have at least 2 profile photos'
    }
  },
}, {
  timestamps: true,
})

const ProductSchema = new mongoose.Schema({
  title: {
    type: String,
    required: [true, 'Please provide a title'],
    maxLength: [100, 'Title cannot be more than 100 characters'],
  },
  description: {
    type: String,
    required: [true, 'Please provide a description'],
    maxLength: [1000, 'Description cannot be more than 1000 characters'],
  },
  category: {
    type: String,
    required: [true, 'Please provide a category'],
    enum: ['Electronics', 'Clothing', 'Books', 'Home & Garden', 'Sports', 'Toys', 'Other'],
  },
  price: {
    type: Number,
    required: [true, 'Please provide a price'],
    min: [0, 'Price cannot be negative'],
  },
  images: {
    type: [String],
    required: [true, 'Please provide at least 2 images'],
    validate: {
      validator: function(images) {
        return images && images.length >= 2
      },
      message: 'Product must have at least 2 images'
    }
  },
  seller: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'User',
    required: true,
  },
  isAvailable: {
    type: Boolean,
    default: true,
  },
  status: {
    type: String,
    enum: ['available', 'sold', 'reserved'],
    default: 'available',
  },
  rating: {
    type: Number,
    default: 0,
    min: 0,
    max: 5,
  },
  reviewCount: {
    type: Number,
    default: 0,
  },
  condition: {
    type: String,
    enum: ['new', 'like-new', 'good', 'fair', 'poor'],
    default: 'good',
  },
}, {
  timestamps: true,
})

const User = mongoose.models.User || mongoose.model('User', UserSchema)
const Product = mongoose.models.Product || mongoose.model('Product', ProductSchema)

const sampleProducts = [
  {
    title: "Vintage Leather Jacket",
    description: "Classic brown leather jacket in excellent condition. Perfect for fall and winter seasons. Size M.",
    category: "Clothing",
    price: 89.99,
    images: [
      "https://images.unsplash.com/photo-1551028719-00167b16eac5?w=400&h=300&fit=crop&auto=format",
      "https://images.unsplash.com/photo-1591047139829-d91aecb6caea?w=400&h=300&fit=crop&auto=format",
      "https://images.unsplash.com/photo-1578662996442-48f60103fc96?w=400&h=300&fit=crop&auto=format"
    ],
    status: "available",
    rating: 4.5,
    reviewCount: 12,
    condition: "like-new"
  },
  {
    title: "MacBook Pro 2019",
    description: "13-inch MacBook Pro in great condition. 8GB RAM, 256GB SSD. Perfect for students and professionals.",
    category: "Electronics",
    price: 899.99,
    images: [
      "https://images.unsplash.com/photo-1517336714731-489689fd1ca8?w=400&h=300&fit=crop&auto=format",
      "https://images.unsplash.com/photo-1541807084-5c52b6b3adef?w=400&h=300&fit=crop&auto=format",
      "https://images.unsplash.com/photo-1518717758536-85ae29035b6d?w=400&h=300&fit=crop&auto=format"
    ],
    status: "available",
    rating: 4.8,
    reviewCount: 8,
    condition: "good"
  },
  {
    title: "Organic Gardening Book Set",
    description: "Complete set of 3 books on organic gardening and sustainable living. Barely used, like new condition.",
    category: "Books",
    price: 24.99,
    images: [
      "https://images.unsplash.com/photo-1481627834876-b7833e8f5570?w=400&h=300&fit=crop&auto=format",
      "https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=400&h=300&fit=crop&auto=format",
      "https://images.unsplash.com/photo-1544716278-ca5e3f4abd8c?w=400&h=300&fit=crop&auto=format"
    ],
    status: "available",
    rating: 4.2,
    reviewCount: 15,
    condition: "like-new"
  },
  {
    title: "Ceramic Plant Pots (Set of 4)",
    description: "Beautiful handmade ceramic plant pots in various sizes. Perfect for indoor plants and succulents.",
    category: "Home & Garden",
    price: 45.00,
    images: [
      "https://images.unsplash.com/photo-1485955900006-10f4d324d411?w=400&h=300&fit=crop&auto=format",
      "https://images.unsplash.com/photo-1416879595882-3373a0480b5b?w=400&h=300&fit=crop&auto=format",
      "https://images.unsplash.com/photo-1506909114-f6e7ad7d3136?w=400&h=300&fit=crop&auto=format"
    ],
    status: "available",
    rating: 4.6,
    reviewCount: 6,
    condition: "new"
  },
  {
    title: "Yoga Mat - Eco Friendly",
    description: "Non-toxic, biodegradable yoga mat made from natural rubber. Excellent grip and cushioning.",
    category: "Sports",
    price: 35.99,
    images: [
      "https://images.unsplash.com/photo-1544367567-0f2fcb009e0b?w=400&h=300&fit=crop&auto=format",
      "https://images.unsplash.com/photo-1571019613454-1cb2f99b2d8b?w=400&h=300&fit=crop&auto=format",
      "https://images.unsplash.com/photo-1506629905607-1a8b0b1b1b1b?w=400&h=300&fit=crop&auto=format"
    ],
    status: "available",
    rating: 4.7,
    reviewCount: 20,
    condition: "good"
  },
  {
    title: "Wooden Building Blocks",
    description: "Set of 50 wooden building blocks for children. Made from sustainable wood, non-toxic finish.",
    category: "Toys",
    price: 29.99,
    images: [
      "https://images.unsplash.com/photo-1558618666-fcd25c85cd64?w=400&h=300&fit=crop&auto=format",
      "https://images.unsplash.com/photo-1513475382585-d06e58bcb0e0?w=400&h=300&fit=crop&auto=format",
      "https://images.unsplash.com/photo-1558618047-3c8c76ca7d13?w=400&h=300&fit=crop&auto=format"
    ],
    status: "available",
    rating: 4.4,
    reviewCount: 9,
    condition: "good"
  },
  {
    title: "Vintage Camera Collection",
    description: "Collection of 3 vintage film cameras from the 1970s. All in working condition, includes original cases.",
    category: "Electronics",
    price: 199.99,
    images: [
      "https://images.unsplash.com/photo-1526170375885-4d8ecf77b99f?w=400&h=300&fit=crop&auto=format",
      "https://images.unsplash.com/photo-1502920917128-1aa500764cbd?w=400&h=300&fit=crop&auto=format",
      "https://images.unsplash.com/photo-1606983340126-99ab4feaa64a?w=400&h=300&fit=crop&auto=format"
    ],
    status: "available",
    rating: 4.9,
    reviewCount: 3,
    condition: "fair"
  },
  {
    title: "Handmade Wool Scarf",
    description: "Beautiful hand-knitted wool scarf in earth tones. Perfect for winter, made with natural wool.",
    category: "Clothing",
    price: 39.99,
    images: [
      "https://images.unsplash.com/photo-1578662996442-48f60103fc96?w=400&h=300&fit=crop&auto=format",
      "https://images.unsplash.com/photo-1591047139829-d91aecb6caea?w=400&h=300&fit=crop&auto=format",
      "https://images.unsplash.com/photo-1551028719-00167b16eac5?w=400&h=300&fit=crop&auto=format"
    ],
    status: "available",
    rating: 4.3,
    reviewCount: 7,
    condition: "good"
  },
  {
    title: "Bamboo Kitchen Utensils",
    description: "Set of 6 bamboo kitchen utensils. Eco-friendly alternative to plastic, dishwasher safe.",
    category: "Home & Garden",
    price: 18.99,
    images: [
      "https://images.unsplash.com/photo-1556909114-f6e7ad7d3136?w=400&h=300&fit=crop&auto=format",
      "https://images.unsplash.com/photo-1416879595882-3373a0480b5b?w=400&h=300&fit=crop&auto=format",
      "https://images.unsplash.com/photo-1485955900006-10f4d324d411?w=400&h=300&fit=crop&auto=format"
    ],
    status: "available",
    rating: 4.5,
    reviewCount: 14,
    condition: "new"
  },
  {
    title: "Sustainable Living Guide",
    description: "Comprehensive guide to sustainable living practices. Paperback, excellent condition.",
    category: "Books",
    price: 12.99,
    images: [
      "https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=400&h=300&fit=crop&auto=format",
      "https://images.unsplash.com/photo-1544716278-ca5e3f4abd8c?w=400&h=300&fit=crop&auto=format",
      "https://images.unsplash.com/photo-1481627834876-b7833e8f5570?w=400&h=300&fit=crop&auto=format"
    ],
    status: "available",
    rating: 4.1,
    reviewCount: 11,
    condition: "like-new"
  }
]

async function addSampleData() {
  try {
    console.log('🌱 Adding sample data to EcoFinds...')
    
    // Connect to MongoDB
    await mongoose.connect(process.env.MONGODB_URI)
    console.log('✅ Connected to MongoDB')
    
    // Create a sample user
    const existingUser = await User.findOne({ email: 'demo@ecofinds.com' })
    let sampleUser
    
    if (existingUser) {
      sampleUser = existingUser
      console.log('✅ Using existing demo user')
    } else {
      sampleUser = await User.create({
        name: 'Demo User',
        email: 'demo@ecofinds.com',
        password: '$2a$12$LQv3c1yqBWVHxkd0LHAkCOYz6TtxMQJqhN8/LewdBPj4VqJq8K8K2', // password: demo123
        images: [
          'https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?w=400&h=400&fit=crop&auto=format',
          'https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=400&h=400&fit=crop&auto=format'
        ]
      })
      console.log('✅ Created demo user')
    }
    
    // Clear existing products
    await Product.deleteMany({})
    console.log('✅ Cleared existing products')
    
    // Add sample products
    const products = sampleProducts.map(product => ({
      ...product,
      seller: sampleUser._id
    }))
    
    await Product.insertMany(products)
    console.log(`✅ Added ${products.length} sample products`)
    
    console.log('\n🎉 Sample data added successfully!')
    console.log('📧 Demo user: demo@ecofinds.com')
    console.log('🔑 Demo password: demo123')
    console.log('🛍️  You can now browse products and test the marketplace!')
    
  } catch (error) {
    console.error('❌ Error adding sample data:', error.message)
    console.log('\n💡 Make sure MongoDB is running and .env.local is configured')
  } finally {
    await mongoose.disconnect()
    console.log('✅ Disconnected from MongoDB')
  }
}

addSampleData()
