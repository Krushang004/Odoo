'use client'

import { useEffect } from 'react'

interface ErrorBoundaryProps {
  error: Error & { digest?: string }
  reset: () => void
}

export function ErrorBoundary({ error, reset }: ErrorBoundaryProps) {
  useEffect(() => {
    console.error('Application error:', error)
  }, [error])

  return (
    <div className="min-h-screen flex items-center justify-center bg-gray-50">
      <div className="max-w-md w-full bg-white rounded-lg shadow-md p-6">
        <div className="text-center">
          <div className="text-6xl mb-4">⚠️</div>
          <h1 className="text-2xl font-bold text-gray-900 mb-4">
            Something went wrong
          </h1>
          <p className="text-gray-600 mb-6">
            We encountered an unexpected error. This might be due to a database connection issue.
          </p>
          
          <div className="space-y-4">
            <button
              onClick={reset}
              className="w-full btn-primary"
            >
              Try Again
            </button>
            
            <div className="text-left bg-gray-50 p-4 rounded-lg">
              <h3 className="font-semibold mb-2">Common Solutions:</h3>
              <ul className="text-sm text-gray-600 space-y-1">
                <li>• Check if MongoDB is running</li>
                <li>• Verify .env.local configuration</li>
                <li>• Restart the development server</li>
              </ul>
            </div>
            
            <div className="text-xs text-gray-500">
              <p>Error: {error.message}</p>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}
