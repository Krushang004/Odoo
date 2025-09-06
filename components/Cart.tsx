'use client'

import { useState } from 'react'
import Image from 'next/image'
import Link from 'next/link'
import { useCart } from '@/contexts/CartContext'
import { formatPriceINR } from '@/lib/utils'

export function Cart() {
  const [isOpen, setIsOpen] = useState(false)
  const { items, totalItems, totalPrice, removeFromCart, updateQuantity, clearCart, loading } = useCart()

  return (
    <>
      {/* Cart Button */}
      <button
        onClick={() => setIsOpen(true)}
        className="relative p-2 text-forest-600 hover:text-forest-800 transition-colors"
      >
        <span className="text-2xl">🛒</span>
        {totalItems > 0 && (
          <span className="absolute -top-1 -right-1 bg-forest-600 text-white text-xs rounded-full h-5 w-5 flex items-center justify-center">
            {totalItems}
          </span>
        )}
      </button>

      {/* Cart Sidebar */}
      {isOpen && (
        <div className="fixed inset-0 z-50 overflow-hidden">
          <div className="absolute inset-0 bg-black bg-opacity-50" onClick={() => setIsOpen(false)} />
          
          <div className="absolute right-0 top-0 h-full w-full max-w-md bg-white shadow-xl">
            <div className="flex flex-col h-full">
              {/* Header */}
              <div className="flex items-center justify-between p-4 border-b border-forest-200">
                <h2 className="text-lg font-semibold text-forest-800">Shopping Cart</h2>
                <button
                  onClick={() => setIsOpen(false)}
                  className="text-forest-500 hover:text-forest-700"
                >
                  ✕
                </button>
              </div>

              {/* Cart Items */}
              <div className="flex-1 overflow-y-auto p-4">
                {loading ? (
                  <div className="flex justify-center items-center h-32">
                    <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-forest-600"></div>
                  </div>
                ) : items.length === 0 ? (
                  <div className="text-center py-8">
                    <div className="text-6xl mb-4">🛒</div>
                    <h3 className="text-lg font-semibold text-forest-800 mb-2">Your cart is empty</h3>
                    <p className="text-forest-600 mb-4">Add some items to get started!</p>
                    <Link
                      href="/products"
                      onClick={() => setIsOpen(false)}
                      className="btn-primary"
                    >
                      Browse Products
                    </Link>
                  </div>
                ) : (
                  <div className="space-y-4">
                    {items.map((item) => (
                      <div key={item._id} className="flex space-x-3 p-3 border border-forest-200 rounded-lg">
                        <div className="flex-shrink-0">
                          <Image
                            src={item.product.images && item.product.images.length > 0 ? item.product.images[0] : "https://via.placeholder.com/60x60/22c55e/ffffff?text=No+Image"}
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
                          
                          <div className="flex items-center space-x-2 mt-2">
                            <button
                              onClick={() => updateQuantity(item.product._id, item.quantity - 1)}
                              className="w-6 h-6 rounded-full bg-forest-100 text-forest-600 hover:bg-forest-200 flex items-center justify-center"
                            >
                              -
                            </button>
                            <span className="text-sm font-medium w-8 text-center">{item.quantity}</span>
                            <button
                              onClick={() => updateQuantity(item.product._id, item.quantity + 1)}
                              className="w-6 h-6 rounded-full bg-forest-100 text-forest-600 hover:bg-forest-200 flex items-center justify-center"
                            >
                              +
                            </button>
                          </div>
                        </div>
                        
                        <button
                          onClick={() => removeFromCart(item.product._id)}
                          className="text-forest-400 hover:text-forest-600"
                        >
                          ✕
                        </button>
                      </div>
                    ))}
                  </div>
                )}
              </div>

              {/* Footer */}
              {items.length > 0 && (
                <div className="border-t border-forest-200 p-4">
                  <div className="flex justify-between items-center mb-4">
                    <span className="text-lg font-semibold text-forest-800">Total:</span>
                    <span className="text-lg font-bold text-forest-700">{formatPriceINR(totalPrice)}</span>
                  </div>
                  
                  <div className="space-y-2">
                    <button
                      onClick={clearCart}
                      className="w-full py-2 px-4 text-sm text-forest-600 hover:text-forest-800 border border-forest-300 rounded-lg hover:bg-forest-50 transition-colors"
                    >
                      Clear Cart
                    </button>
                    <Link
                      href="/checkout"
                      onClick={() => setIsOpen(false)}
                      className="block w-full py-2 px-4 text-center bg-forest-600 hover:bg-forest-700 text-white font-medium rounded-lg transition-colors"
                    >
                      Proceed to Checkout
                    </Link>
                  </div>
                </div>
              )}
            </div>
          </div>
        </div>
      )}
    </>
  )
}
