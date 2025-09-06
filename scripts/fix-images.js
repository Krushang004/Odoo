#!/usr/bin/env node

const mongoose = require('mongoose')
require('dotenv').config({ path: '.env.local' })

// Import models
const Product = require('../models/Product').default

async function fixImages() {
  try {
    console.log('🖼️  Fixing product images...')
    
    // Connect to MongoDB
    await mongoose.connect(process.env.MONGODB_URI)
    console.log('✅ Connected to MongoDB')
    
    // Clear all existing products
    await Product.deleteMany({})
    console.log('✅ Cleared existing products')
    
    console.log('✅ Image fix complete!')
    console.log('💡 Run "npm run add-samples" to add fresh products with working images')
    
  } catch (error) {
    console.error('❌ Error fixing images:', error.message)
  } finally {
    await mongoose.disconnect()
    console.log('✅ Disconnected from MongoDB')
  }
}

fixImages()

