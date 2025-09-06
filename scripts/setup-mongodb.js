#!/usr/bin/env node

const fs = require('fs')
const path = require('path')

console.log('🗄️  MongoDB Setup Guide for EcoFinds')
console.log('=====================================\n')

console.log('You have two options for MongoDB:')
console.log('')

console.log('📦 Option 1: MongoDB Atlas (Cloud - Recommended)')
console.log('1. Go to https://mongodb.com/atlas')
console.log('2. Create a free account')
console.log('3. Create a new cluster')
console.log('4. Get your connection string')
console.log('5. Add it to your .env.local file')
console.log('')

console.log('💻 Option 2: Local MongoDB')
console.log('1. Install MongoDB locally:')
console.log('   - Windows: Download from https://mongodb.com/try/download/community')
console.log('   - macOS: brew install mongodb-community')
console.log('   - Linux: sudo apt-get install mongodb')
console.log('2. Start MongoDB service:')
console.log('   - Windows: net start MongoDB')
console.log('   - macOS/Linux: sudo systemctl start mongod')
console.log('3. Use: mongodb://localhost:27017/ecofinds')
console.log('')

console.log('🔧 Environment Setup:')
console.log('1. Create .env.local file in project root')
console.log('2. Add these variables:')
console.log('')
console.log('MONGODB_URI=mongodb://localhost:27017/ecofinds')
console.log('NEXTAUTH_URL=http://localhost:3000')
console.log('NEXTAUTH_SECRET=your-secret-key-here')
console.log('')

console.log('🚀 After setup, restart the dev server:')
console.log('npm run dev')
console.log('')

console.log('❓ Need help? Check README.md for detailed instructions')

