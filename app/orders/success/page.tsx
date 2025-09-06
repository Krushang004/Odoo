'use client'

import { useEffect, useState, Suspense } from 'react'
import { useSearchParams } from 'next/navigation'
import Link from 'next/link'

function OrderSuccessContent() {
  const searchParams = useSearchParams()
  const [showSuccess, setShowSuccess] = useState(false)

  useEffect(() => {
    if (searchParams.get('success') === 'true') {
      setShowSuccess(true)
    }
  }, [searchParams])

  if (!showSuccess) {
    return (
      <div className="container mx-auto px-4 py-8">
        <div className="text-center">
          <h1 className="text-2xl font-bold text-forest-800 mb-4">Page Not Found</h1>
          <p className="text-forest-600 mb-4">This page is only accessible after a successful order.</p>
          <Link href="/products" className="btn-primary">
            Browse Products
          </Link>
        </div>
      </div>
    )
  }

  return (
    <div className="container mx-auto px-4 py-8">
      <div className="max-w-2xl mx-auto text-center">
        {/* Success Animation */}
        <div className="mb-8">
          <div className="w-24 h-24 bg-green-100 rounded-full flex items-center justify-center mx-auto mb-4">
            <span className="text-4xl">✅</span>
          </div>
          <h1 className="text-3xl font-bold text-forest-800 mb-2">Order Placed Successfully!</h1>
          <p className="text-forest-600 text-lg">
            Thank you for your purchase. Your order has been confirmed.
          </p>
        </div>

        {/* Order Details */}
        <div className="bg-white rounded-lg shadow-md p-6 mb-8">
          <h2 className="text-xl font-semibold text-forest-800 mb-4">What's Next?</h2>
          <div className="space-y-4 text-left">
            <div className="flex items-start space-x-3">
              <div className="w-6 h-6 bg-forest-100 rounded-full flex items-center justify-center flex-shrink-0 mt-0.5">
                <span className="text-forest-600 text-sm">1</span>
              </div>
              <div>
                <h3 className="font-medium text-forest-800">Order Confirmation</h3>
                <p className="text-forest-600 text-sm">You'll receive an email confirmation shortly.</p>
              </div>
            </div>
            
            <div className="flex items-start space-x-3">
              <div className="w-6 h-6 bg-forest-100 rounded-full flex items-center justify-center flex-shrink-0 mt-0.5">
                <span className="text-forest-600 text-sm">2</span>
              </div>
              <div>
                <h3 className="font-medium text-forest-800">Seller Notification</h3>
                <p className="text-forest-600 text-sm">The seller will be notified and will prepare your items.</p>
              </div>
            </div>
            
            <div className="flex items-start space-x-3">
              <div className="w-6 h-6 bg-forest-100 rounded-full flex items-center justify-center flex-shrink-0 mt-0.5">
                <span className="text-forest-600 text-sm">3</span>
              </div>
              <div>
                <h3 className="font-medium text-forest-800">Shipping & Delivery</h3>
                <p className="text-forest-600 text-sm">The seller will arrange shipping and provide tracking details.</p>
              </div>
            </div>
          </div>
        </div>

        {/* Eco Impact */}
        <div className="bg-forest-50 border border-forest-200 rounded-lg p-6 mb-8">
          <h3 className="text-lg font-semibold text-forest-800 mb-2">🌱 Your Eco Impact</h3>
          <p className="text-forest-700">
            By choosing pre-owned items, you've helped reduce waste and given products a second life. 
            Thank you for making a sustainable choice!
          </p>
        </div>

        {/* Action Buttons */}
        <div className="flex flex-col sm:flex-row gap-4 justify-center">
          <Link
            href="/orders"
            className="btn-primary"
          >
            View My Orders
          </Link>
          <Link
            href="/products"
            className="btn-secondary"
          >
            Continue Shopping
          </Link>
        </div>

        {/* Contact Info */}
        <div className="mt-8 text-sm text-forest-600">
          <p>
            Questions about your order? Contact the seller directly through your order details, 
            or reach out to our support team.
          </p>
        </div>
      </div>
    </div>
  )
}

export default function OrderSuccessPage() {
  return (
    <Suspense fallback={
      <div className="container mx-auto px-4 py-8">
        <div className="flex justify-center items-center h-64">
          <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-forest-600"></div>
        </div>
      </div>
    }>
      <OrderSuccessContent />
    </Suspense>
  )
}
