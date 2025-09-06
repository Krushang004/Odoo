#!/usr/bin/env node

const mongoose = require('mongoose')
require('dotenv').config({ path: '.env.local' })

async function checkDatabase() {
  console.log('🔍 Checking EcoFinds Database Status...')
  console.log('=====================================\n')

  try {
    // Connect to MongoDB
    await mongoose.connect(process.env.MONGODB_URI, {
      serverSelectionTimeoutMS: 5000,
    })
    
    console.log('✅ Database Connection: SUCCESS')
    
    const db = mongoose.connection.db
    
    // Check collections
    const collections = await db.listCollections().toArray()
    console.log(`📊 Collections Found: ${collections.length}`)
    
    // Check users
    const userCount = await db.collection('users').countDocuments()
    console.log(`👥 Users: ${userCount}`)
    
    // Check products
    const productCount = await db.collection('products').countDocuments()
    console.log(`🛍️  Products: ${productCount}`)
    
    // Check orders
    const orderCount = await db.collection('orders').countDocuments()
    console.log(`📦 Orders: ${orderCount}`)
    
    console.log('\n🎯 Database Status:')
    if (userCount > 0 && productCount > 0) {
      console.log('✅ READY - Database is fully set up with sample data!')
      console.log('\n🚀 You can now:')
      console.log('   • Browse products at http://localhost:3000/products')
      console.log('   • Sign in with demo@ecofinds.com / demo123')
      console.log('   • Create new products and orders')
    } else if (userCount === 0 && productCount === 0) {
      console.log('⚠️  EMPTY - Database is connected but has no data')
      console.log('\n💡 Run "npm run add-samples" to add sample data')
    } else {
      console.log('⚠️  PARTIAL - Database has some data but may be incomplete')
      console.log('\n💡 Run "npm run add-samples" to refresh sample data')
    }
    
  } catch (error) {
    console.log('❌ Database Connection: FAILED')
    console.log(`Error: ${error.message}`)
    
    if (error.message.includes('ECONNREFUSED')) {
      console.log('\n💡 MongoDB is not running or not accessible')
      console.log('Solutions:')
      console.log('1. Use MongoDB Atlas (cloud): https://mongodb.com/atlas')
      console.log('2. Install and start local MongoDB')
      console.log('3. Check your .env.local MONGODB_URI')
    }
    
    console.log('\n📚 Run "npm run setup-mongodb" for setup help')
  } finally {
    if (mongoose.connection.readyState === 1) {
      await mongoose.disconnect()
    }
  }
}

checkDatabase()
