#!/usr/bin/env node

const mongoose = require('mongoose')
require('dotenv').config({ path: '.env.local' })

async function setupDatabase() {
  console.log('🗄️  Setting up MongoDB database for EcoFinds...')
  console.log('================================================\n')

  // Check if .env.local exists
  if (!process.env.MONGODB_URI) {
    console.log('❌ Error: MONGODB_URI not found in .env.local')
    console.log('\n📝 Please create a .env.local file with:')
    console.log('MONGODB_URI=mongodb://localhost:27017/ecofinds')
    console.log('NEXTAUTH_URL=http://localhost:3000')
    console.log('NEXTAUTH_SECRET=your-secret-key-here')
    console.log('\n💡 Run "npm run setup-mongodb" for detailed setup instructions')
    return
  }

  try {
    console.log('🔌 Connecting to MongoDB...')
    console.log(`📍 URI: ${process.env.MONGODB_URI.replace(/\/\/.*@/, '//***@')}`)
    
    await mongoose.connect(process.env.MONGODB_URI, {
      serverSelectionTimeoutMS: 5000,
    })
    
    console.log('✅ Successfully connected to MongoDB!')
    
    // Test database operations
    console.log('\n🧪 Testing database operations...')
    
    // Check if we can create collections
    const db = mongoose.connection.db
    const collections = await db.listCollections().toArray()
    console.log(`📊 Found ${collections.length} existing collections`)
    
    // Test creating a simple document
    const testCollection = db.collection('test')
    await testCollection.insertOne({ test: true, timestamp: new Date() })
    await testCollection.deleteOne({ test: true })
    console.log('✅ Database write/read operations working!')
    
    console.log('\n🎉 Database setup complete!')
    console.log('🚀 You can now run:')
    console.log('   npm run add-samples  # Add sample products')
    console.log('   npm run dev          # Start the application')
    
  } catch (error) {
    console.log('\n❌ Database connection failed!')
    console.log(`Error: ${error.message}`)
    
    if (error.message.includes('ECONNREFUSED')) {
      console.log('\n💡 Solutions:')
      console.log('1. MongoDB Atlas (Cloud - Recommended):')
      console.log('   - Go to https://mongodb.com/atlas')
      console.log('   - Create free account and cluster')
      console.log('   - Get connection string')
      console.log('   - Update MONGODB_URI in .env.local')
      console.log('')
      console.log('2. Local MongoDB:')
      console.log('   - Install MongoDB locally')
      console.log('   - Start MongoDB service')
      console.log('   - Use: mongodb://localhost:27017/ecofinds')
    }
    
    console.log('\n📚 Run "npm run setup-mongodb" for detailed instructions')
  } finally {
    if (mongoose.connection.readyState === 1) {
      await mongoose.disconnect()
      console.log('✅ Disconnected from MongoDB')
    }
  }
}

setupDatabase()
