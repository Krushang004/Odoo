'use client'

import { useState, useEffect } from 'react'

export function DatabaseStatus() {
  const [status, setStatus] = useState<'checking' | 'working' | 'error'>('checking')
  const [error, setError] = useState('')

  useEffect(() => {
    checkDatabaseStatus()
  }, [])

  const checkDatabaseStatus = async () => {
    try {
      const response = await fetch('/api/products?limit=1')
      if (response.ok) {
        setStatus('working')
      } else {
        setStatus('error')
        setError('Database connection failed')
      }
    } catch (err) {
      setStatus('error')
      setError('Unable to connect to database')
    }
  }

  if (status === 'checking') {
    return (
      <div className="bg-blue-50 border border-blue-200 rounded-lg p-4 mb-6">
        <div className="flex items-center">
          <div className="animate-spin rounded-full h-4 w-4 border-b-2 border-blue-600 mr-3"></div>
          <span className="text-blue-800">Checking database connection...</span>
        </div>
      </div>
    )
  }

  if (status === 'error') {
    return (
      <div className="bg-yellow-50 border border-yellow-200 rounded-lg p-6 mb-6">
        <div className="flex items-start">
          <div className="text-2xl mr-3">🗄️</div>
          <div>
            <h3 className="text-lg font-semibold text-yellow-800 mb-2">
              Database Setup Required
            </h3>
            <p className="text-yellow-700 mb-3">
              {error}. To see products and use all features, you need to set up a MongoDB database.
            </p>
            <div className="space-y-2">
              <p className="text-sm text-yellow-600">
                <strong>Quick setup:</strong> Run <code className="bg-yellow-100 px-1 rounded">npm run setup-mongodb</code>
              </p>
              <p className="text-sm text-yellow-600">
                <strong>Add sample data:</strong> Run <code className="bg-yellow-100 px-1 rounded">npm run add-samples</code>
              </p>
            </div>
          </div>
        </div>
      </div>
    )
  }

  // Database is working - don't show anything
  return null
}
