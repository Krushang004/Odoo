'use client'

import { useState, useEffect } from 'react'
import { useSession } from 'next-auth/react'
import { useRouter } from 'next/navigation'
import Image from 'next/image'
import { useCart } from '@/contexts/CartContext'
import { formatPriceINR } from '@/lib/utils'

interface ShippingAddress {
  street: string
  city: string
  state: string
  zipCode: string
  country: string
}

export default function CheckoutPage() {
  const { data: session, status } = useSession()
  const router = useRouter()
  const { items, totalPrice, clearCart } = useCart()
  const [loading, setLoading] = useState(false)
  const [shippingAddress, setShippingAddress] = useState<ShippingAddress>({
    street: '',
    city: '',
    state: '',
    zipCode: '',
    country: 'India'
  })
  const [paymentMethod, setPaymentMethod] = useState('cod')
  const [orderNotes, setOrderNotes] = useState('')

  useEffect(() => {
    if (status === 'unauthenticated') {
      router.push('/auth/signin')
      return
    }

    if (status === 'authenticated' && items.length === 0) {
      router.push('/products')
      return
    }
  }, [status, items.length, router])

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    const { name, value } = e.target
    setShippingAddress(prev => ({
      ...prev,
      [name]: value
    }))
  }

  const handlePlaceOrder = async (e: React.FormEvent) => {
    e.preventDefault()
    
    if (!session?.user?.id) return

    // Validate shipping address
    const requiredFields = ['street', 'city', 'state', 'zipCode']
    const missingFields = requiredFields.filter(field => !shippingAddress[field as keyof ShippingAddress])
    
    if (missingFields.length > 0) {
      alert(`Please fill in: ${missingFields.join(', ')}`)
      return
    }

    try {
      setLoading(true)

      // Create orders for each item in cart
      const orderPromises = items.map(item => 
        fetch('/api/orders', {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json',
          },
          body: JSON.stringify({
            productId: item.product._id,
            quantity: item.quantity,
            shippingAddress
          })
        })
      )

      const responses = await Promise.all(orderPromises)
      const results = await Promise.all(responses.map(res => res.json()))

      // Check if all orders were successful
      const failedOrders = results.filter(result => !responses[results.indexOf(result)].ok)
      
      if (failedOrders.length > 0) {
        console.error('Some orders failed:', failedOrders)
        alert('Some items could not be ordered. Please try again.')
        return
      }

      // Clear cart and redirect to orders
      await clearCart()
      router.push('/orders?success=true')
      
    } catch (error) {
      console.error('Error placing order:', error)
      alert('Failed to place order. Please try again.')
    } finally {
      setLoading(false)
    }
  }

  if (status === 'loading') {
    return (
      <div className="container mx-auto px-4 py-8">
        <div className="flex justify-center items-center h-64">
          <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-forest-600"></div>
        </div>
      </div>
    )
  }

  if (items.length === 0) {
    return (
      <div className="container mx-auto px-4 py-8">
        <div className="text-center">
          <h1 className="text-2xl font-bold text-forest-800 mb-4">Your cart is empty</h1>
          <p className="text-forest-600 mb-4">Add some items to your cart before checking out.</p>
          <button
            onClick={() => router.push('/products')}
            className="btn-primary"
          >
            Browse Products
          </button>
        </div>
      </div>
    )
  }

  return (
    <div className="container mx-auto px-4 py-8">
      <h1 className="text-3xl font-bold text-forest-800 mb-8">Checkout</h1>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
        {/* Checkout Form */}
        <div className="space-y-8">
          {/* Shipping Address */}
          <div className="bg-white rounded-lg shadow-md p-6">
            <h2 className="text-xl font-semibold text-forest-800 mb-4">Shipping Address</h2>
            <form onSubmit={handlePlaceOrder} className="space-y-4">
              <div>
                <label className="block text-sm font-medium text-forest-700 mb-2">
                  Street Address *
                </label>
                <input
                  type="text"
                  name="street"
                  value={shippingAddress.street}
                  onChange={handleInputChange}
                  className="w-full p-3 border border-forest-300 rounded-lg focus:ring-2 focus:ring-forest-500 focus:border-transparent"
                  placeholder="123 Main Street"
                  required
                />
              </div>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div>
                  <label className="block text-sm font-medium text-forest-700 mb-2">
                    City *
                  </label>
                  <input
                    type="text"
                    name="city"
                    value={shippingAddress.city}
                    onChange={handleInputChange}
                    className="w-full p-3 border border-forest-300 rounded-lg focus:ring-2 focus:ring-forest-500 focus:border-transparent"
                    placeholder="Mumbai"
                    required
                  />
                </div>
                <div>
                  <label className="block text-sm font-medium text-forest-700 mb-2">
                    State *
                  </label>
                  <input
                    type="text"
                    name="state"
                    value={shippingAddress.state}
                    onChange={handleInputChange}
                    className="w-full p-3 border border-forest-300 rounded-lg focus:ring-2 focus:ring-forest-500 focus:border-transparent"
                    placeholder="Maharashtra"
                    required
                  />
                </div>
              </div>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div>
                  <label className="block text-sm font-medium text-forest-700 mb-2">
                    ZIP Code *
                  </label>
                  <input
                    type="text"
                    name="zipCode"
                    value={shippingAddress.zipCode}
                    onChange={handleInputChange}
                    className="w-full p-3 border border-forest-300 rounded-lg focus:ring-2 focus:ring-forest-500 focus:border-transparent"
                    placeholder="400001"
                    required
                  />
                </div>
                <div>
                  <label className="block text-sm font-medium text-forest-700 mb-2">
                    Country
                  </label>
                  <input
                    type="text"
                    name="country"
                    value={shippingAddress.country}
                    onChange={handleInputChange}
                    className="w-full p-3 border border-forest-300 rounded-lg focus:ring-2 focus:ring-forest-500 focus:border-transparent"
                    readOnly
                  />
                </div>
              </div>

              {/* Payment Method */}
              <div>
                <label className="block text-sm font-medium text-forest-700 mb-4">
                  Payment Method
                </label>
                <div className="space-y-3">
                  <label className="flex items-center">
                    <input
                      type="radio"
                      name="paymentMethod"
                      value="cod"
                      checked={paymentMethod === 'cod'}
                      onChange={(e) => setPaymentMethod(e.target.value)}
                      className="mr-3 text-forest-600 focus:ring-forest-500"
                    />
                    <span className="text-forest-700">Cash on Delivery (COD)</span>
                  </label>
                  <label className="flex items-center">
                    <input
                      type="radio"
                      name="paymentMethod"
                      value="upi"
                      checked={paymentMethod === 'upi'}
                      onChange={(e) => setPaymentMethod(e.target.value)}
                      className="mr-3 text-forest-600 focus:ring-forest-500"
                    />
                    <span className="text-forest-700">UPI Payment</span>
                  </label>
                  <label className="flex items-center">
                    <input
                      type="radio"
                      name="paymentMethod"
                      value="card"
                      checked={paymentMethod === 'card'}
                      onChange={(e) => setPaymentMethod(e.target.value)}
                      className="mr-3 text-forest-600 focus:ring-forest-500"
                    />
                    <span className="text-forest-700">Credit/Debit Card</span>
                  </label>
                </div>
              </div>

              {/* Order Notes */}
              <div>
                <label className="block text-sm font-medium text-forest-700 mb-2">
                  Order Notes (Optional)
                </label>
                <textarea
                  name="orderNotes"
                  value={orderNotes}
                  onChange={(e) => setOrderNotes(e.target.value)}
                  className="w-full p-3 border border-forest-300 rounded-lg focus:ring-2 focus:ring-forest-500 focus:border-transparent"
                  rows={3}
                  placeholder="Any special instructions for your order..."
                />
              </div>

              {/* Place Order Button */}
              <button
                type="submit"
                disabled={loading}
                className="w-full bg-forest-600 hover:bg-forest-700 disabled:bg-forest-300 text-white font-medium py-3 px-4 rounded-lg transition-colors duration-200 flex items-center justify-center space-x-2"
              >
                {loading ? (
                  <>
                    <div className="animate-spin rounded-full h-5 w-5 border-b-2 border-white"></div>
                    <span>Placing Order...</span>
                  </>
                ) : (
                  <>
                    <span>🛒</span>
                    <span>Place Order</span>
                  </>
                )}
              </button>
            </form>
          </div>
        </div>

        {/* Order Summary */}
        <div className="space-y-6">
          <div className="bg-white rounded-lg shadow-md p-6">
            <h2 className="text-xl font-semibold text-forest-800 mb-4">Order Summary</h2>
            
            <div className="space-y-4">
              {items.map((item) => (
                <div key={item._id} className="flex space-x-3 p-3 border border-forest-200 rounded-lg">
                  <div className="flex-shrink-0">
                    <Image
                      src={item.product.image}
                      alt={item.product.title}
                      width={60}
                      height={60}
                      className="rounded-lg object-cover"
                    />
                  </div>
                  
                  <div className="flex-1 min-w-0">
                    <h4 className="text-sm font-medium text-forest-800 line-clamp-2">
                      {item.product.title}
                    </h4>
                    <p className="text-sm text-forest-600">{formatPriceINR(item.product.price)}</p>
                    <p className="text-sm text-forest-500">Qty: {item.quantity}</p>
                  </div>
                  
                  <div className="text-right">
                    <p className="text-sm font-medium text-forest-800">
                      {formatPriceINR(item.product.price * item.quantity)}
                    </p>
                  </div>
                </div>
              ))}
            </div>

            <div className="border-t border-forest-200 pt-4 mt-4">
              <div className="flex justify-between items-center text-lg font-semibold text-forest-800">
                <span>Total:</span>
                <span>{formatPriceINR(totalPrice)}</span>
              </div>
            </div>

            <div className="mt-4 p-3 bg-forest-50 rounded-lg">
              <p className="text-sm text-forest-700">
                <strong>🌱 EcoFinds Promise:</strong> All items are pre-owned and sustainable. 
                You're helping reduce waste and giving items a second life!
              </p>
            </div>
          </div>

          {/* Security Notice */}
          <div className="bg-blue-50 border border-blue-200 rounded-lg p-4">
            <h3 className="text-sm font-semibold text-blue-800 mb-2">🔒 Secure Checkout</h3>
            <p className="text-sm text-blue-700">
              Your payment information is secure and encrypted. We never store your payment details.
            </p>
          </div>

          {/* Return Policy */}
          <div className="bg-gray-50 border border-gray-200 rounded-lg p-4">
            <h3 className="text-sm font-semibold text-gray-800 mb-2">📋 Return Policy</h3>
            <p className="text-sm text-gray-700">
              Items can be returned within 7 days of delivery if they don't match the description. 
              Contact the seller directly for returns.
            </p>
          </div>
        </div>
      </div>
    </div>
  )
}
