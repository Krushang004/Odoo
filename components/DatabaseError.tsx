'use client'

import Link from 'next/link'

export function DatabaseError() {
  return (
    <div className="min-h-screen flex items-center justify-center bg-gray-50">
      <div className="max-w-md w-full bg-white rounded-lg shadow-md p-6">
        <div className="text-center">
          <div className="text-6xl mb-4">🗄️</div>
          <h1 className="text-2xl font-bold text-gray-900 mb-4">
            Database Connection Required
          </h1>
          <p className="text-gray-600 mb-6">
            EcoFinds needs a MongoDB database to function. Please set up your database connection.
          </p>
          
          <div className="space-y-4">
            <div className="text-left bg-gray-50 p-4 rounded-lg">
              <h3 className="font-semibold mb-2">Quick Setup:</h3>
              <ol className="text-sm text-gray-600 space-y-1">
                <li>1. Create a <code className="bg-gray-200 px-1 rounded">.env.local</code> file</li>
                <li>2. Add your MongoDB connection string</li>
                <li>3. Restart the development server</li>
              </ol>
            </div>
            
            <div className="space-y-2">
              <Link 
                href="https://mongodb.com/atlas" 
                target="_blank"
                className="block w-full btn-primary text-center"
              >
                🚀 Use MongoDB Atlas (Free)
              </Link>
              
              <button 
                onClick={() => window.location.reload()}
                className="block w-full btn-secondary text-center"
              >
                🔄 Retry Connection
              </button>
            </div>
          </div>
          
          <div className="mt-6 text-xs text-gray-500">
            <p>Need help? Check the setup guide:</p>
            <code className="block mt-1">node scripts/setup-mongodb.js</code>
          </div>
        </div>
      </div>
    </div>
  )
}
