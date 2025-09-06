'use client'

import { useState, useEffect, Suspense } from 'react'
import { useSession } from 'next-auth/react'
import { useRouter, useSearchParams } from 'next/navigation'
import Image from 'next/image'
import { formatPriceINR } from '@/lib/utils'

interface Order {
  _id: string
  buyer: {
    _id: string
    name: string
    email: string
  }
  seller: {
    _id: string
    name: string
    email: string
  }
  product: {
    _id: string
    title: string
    price: number
    images: string[]
  } | null
  quantity: number
  totalPrice: number
  status: 'pending' | 'confirmed' | 'shipped' | 'delivered' | 'cancelled'
  shippingAddress: {
    street: string
    city: string
    state: string
    zipCode: string
    country: string
  }
  createdAt: string
}

function OrdersContent() {
  const { data: session, status } = useSession()
  const router = useRouter()
  const searchParams = useSearchParams()
  const [orders, setOrders] = useState<Order[]>([])
  const [loading, setLoading] = useState(true)
  const [activeTab, setActiveTab] = useState<'buyer' | 'seller'>('buyer')
  const [showSuccess, setShowSuccess] = useState(false)

  useEffect(() => {
    if (status === 'authenticated') {
      fetchOrders()
      
      // Check for success parameter
      if (searchParams.get('success') === 'true') {
        setShowSuccess(true)
        // Remove success parameter from URL
        const url = new URL(window.location.href)
        url.searchParams.delete('success')
        window.history.replaceState({}, '', url.toString())
      }
    } else if (status === 'unauthenticated') {
      router.push('/auth/signin')
    }
  }, [status, activeTab, searchParams])

  const fetchOrders = async () => {
    try {
      setLoading(true)
      const response = await fetch(`/api/orders?type=${activeTab}`)
      const data = await response.json()
      
      if (response.ok) {
        setOrders(data)
      } else {
        console.error('Error fetching orders:', data.error)
      }
    } catch (error) {
      console.error('Error fetching orders:', error)
    } finally {
      setLoading(false)
    }
  }

  const getStatusColor = (status: string) => {
    switch (status) {
      case 'pending':
        return 'bg-yellow-100 text-yellow-800'
      case 'confirmed':
        return 'bg-blue-100 text-blue-800'
      case 'shipped':
        return 'bg-purple-100 text-purple-800'
      case 'delivered':
        return 'bg-green-100 text-green-800'
      case 'cancelled':
        return 'bg-red-100 text-red-800'
      default:
        return 'bg-gray-100 text-gray-800'
    }
  }

  if (status === 'loading' || loading) {
    return (
      <div className="container mx-auto px-4 py-8">
        <div className="flex justify-center items-center h-64">
          <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-primary-500"></div>
        </div>
      </div>
    )
  }

  return (
    <div className="container mx-auto px-4 py-8">
      <h1 className="text-3xl font-bold mb-8">My Orders</h1>

      {/* Success Notification */}
      {showSuccess && (
        <div className="mb-6 bg-green-50 border border-green-200 rounded-lg p-4">
          <div className="flex items-center">
            <div className="text-green-600 mr-3">
              <span className="text-2xl">✅</span>
            </div>
            <div>
              <h3 className="text-green-800 font-semibold">Order Placed Successfully!</h3>
              <p className="text-green-700 text-sm">
                Your order has been confirmed. The seller will be notified and will prepare your items.
              </p>
            </div>
            <button
              onClick={() => setShowSuccess(false)}
              className="ml-auto text-green-600 hover:text-green-800"
            >
              ✕
            </button>
          </div>
        </div>
      )}

      {/* Tabs */}
      <div className="mb-8">
        <div className="border-b border-gray-200">
          <nav className="-mb-px flex space-x-8">
            <button
              onClick={() => setActiveTab('buyer')}
              className={`py-2 px-1 border-b-2 font-medium text-sm ${
                activeTab === 'buyer'
                  ? 'border-primary-500 text-primary-600'
                  : 'border-transparent text-gray-500 hover:text-gray-700 hover:border-gray-300'
              }`}
            >
              Purchases
            </button>
            <button
              onClick={() => setActiveTab('seller')}
              className={`py-2 px-1 border-b-2 font-medium text-sm ${
                activeTab === 'seller'
                  ? 'border-primary-500 text-primary-600'
                  : 'border-transparent text-gray-500 hover:text-gray-700 hover:border-gray-300'
              }`}
            >
              Sales
            </button>
          </nav>
        </div>
      </div>

      {orders.length === 0 ? (
        <div className="text-center py-12">
          <div className="text-6xl mb-4">📦</div>
          <h3 className="text-xl font-semibold mb-2">
            {activeTab === 'buyer' ? 'No purchases yet' : 'No sales yet'}
          </h3>
          <p className="text-gray-600 mb-4">
            {activeTab === 'buyer' 
              ? 'Start shopping to see your purchases here'
              : 'List products to start selling'
            }
          </p>
          <a
            href={activeTab === 'buyer' ? '/products' : '/products/new'}
            className="btn-primary"
          >
            {activeTab === 'buyer' ? 'Browse Products' : 'List a Product'}
          </a>
        </div>
      ) : (
        <div className="space-y-6">
          {orders.map((order) => (
            <div key={order._id} className="card p-6">
              <div className="flex flex-col md:flex-row gap-6">
                {/* Product Image */}
                <div className="flex-shrink-0">
                  {order.product ? (
                    <Image
                      src={order.product.images && order.product.images.length > 0 ? order.product.images[0] : "https://via.placeholder.com/120x120/22c55e/ffffff?text=No+Image"}
                      alt={order.product.title}
                      width={120}
                      height={120}
                      className="w-30 h-30 object-cover rounded-lg"
                    />
                  ) : (
                    <div className="w-30 h-30 bg-gray-200 rounded-lg flex items-center justify-center">
                      <span className="text-gray-500 text-sm">Product Deleted</span>
                    </div>
                  )}
                </div>

                {/* Order Details */}
                <div className="flex-1 space-y-4">
                  <div className="flex flex-col md:flex-row md:items-center md:justify-between">
                    <div>
                      <h3 className="text-lg font-semibold">
                        {order.product ? order.product.title : 'Product No Longer Available'}
                      </h3>
                      <p className="text-gray-600">
                        {activeTab === 'buyer' ? 'Seller' : 'Buyer'}: {activeTab === 'buyer' ? order.seller.name : order.buyer.name}
                      </p>
                    </div>
                    <div className="text-right">
                      <p className="text-lg font-semibold">{formatPriceINR(order.totalPrice)}</p>
                      <span className={`inline-flex px-2 py-1 text-xs font-semibold rounded-full ${getStatusColor(order.status)}`}>
                        {order.status.charAt(0).toUpperCase() + order.status.slice(1)}
                      </span>
                    </div>
                  </div>

                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4 text-sm">
                    <div>
                      <p className="font-medium">Order Date:</p>
                      <p className="text-gray-600">
                        {new Date(order.createdAt).toLocaleDateString()}
                      </p>
                    </div>
                    <div>
                      <p className="font-medium">Quantity:</p>
                      <p className="text-gray-600">{order.quantity}</p>
                    </div>
                  </div>

                  {activeTab === 'buyer' && (
                    <div>
                      <p className="font-medium text-sm">Shipping Address:</p>
                      <p className="text-gray-600 text-sm">
                        {order.shippingAddress.street}, {order.shippingAddress.city}, {order.shippingAddress.state} {order.shippingAddress.zipCode}, {order.shippingAddress.country}
                      </p>
                    </div>
                  )}
                </div>
              </div>
            </div>
          ))}
        </div>
      )}
    </div>
  )
}

export default function OrdersPage() {
  return (
    <Suspense fallback={
      <div className="container mx-auto px-4 py-8">
        <div className="flex justify-center items-center h-64">
          <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-forest-600"></div>
        </div>
      </div>
    }>
      <OrdersContent />
    </Suspense>
  )
}
