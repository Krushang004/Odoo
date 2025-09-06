#!/usr/bin/env node

const fs = require('fs')
const path = require('path')

console.log('🌱 Setting up EcoFinds...')

// Check if .env.local exists
const envPath = path.join(process.cwd(), '.env.local')
if (!fs.existsSync(envPath)) {
  console.log('📝 Creating .env.local file...')
  fs.copyFileSync(path.join(process.cwd(), 'env.example'), envPath)
  console.log('✅ .env.local created! Please update it with your configuration.')
} else {
  console.log('✅ .env.local already exists')
}

console.log('🚀 Setup complete! Run "npm run dev" to start the development server.')
console.log('📚 Don\'t forget to:')
console.log('   1. Set up your MongoDB database')
console.log('   2. Update NEXTAUTH_SECRET in .env.local')
console.log('   3. Update MONGODB_URI in .env.local')
