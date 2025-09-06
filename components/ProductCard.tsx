'use client'

import Link from 'next/link'
import Image from 'next/image'
import { useState } from 'react'
import { useCart } from '@/contexts/CartContext'
import { formatPriceINR, getStatusColor, getConditionColor, generateStars } from '@/lib/utils'

interface Product {
  _id: string
  title: string
  description: string
  category: string
  price: number
  images: string[] // Changed from single image to array
  seller: {
    _id: string
    name: string
    email: string
  }
  isAvailable: boolean
  status: 'available' | 'sold' | 'reserved'
  rating: number
  reviewCount: number
  condition: 'new' | 'like-new' | 'good' | 'fair' | 'poor'
  createdAt: string
  updatedAt: string
}

interface ProductCardProps {
  product: Product
  showSellerInfo?: boolean
}

export function ProductCard({ product, showSellerInfo = false }: ProductCardProps) {
  const [imageError, setImageError] = useState(false)
  const [currentImageIndex, setCurrentImageIndex] = useState(0)
  const [addingToCart, setAddingToCart] = useState(false)
  const { addToCart } = useCart()

  const fallbackImage = "https://via.placeholder.com/400x300/22c55e/ffffff?text=No+Image"
  const currentImage = product.images && product.images.length > 0 ? product.images[currentImageIndex] : fallbackImage

  const handleAddToCart = async (e: React.MouseEvent) => {
    e.preventDefault()
    e.stopPropagation()
    
    if (product.status !== 'available') return
    
    try {
      setAddingToCart(true)
      await addToCart(product._id, 1)
    } catch (error) {
      console.error('Error adding to cart:', error)
    } finally {
      setAddingToCart(false)
    }
  }

  return (
    <div className="card group hover:shadow-lg transition-all duration-200 bg-white rounded-lg overflow-hidden border border-forest-200">
      <Link href={`/products/${product._id}`} className="block">
                <div className="aspect-square bg-forest-50 rounded-t-lg overflow-hidden relative">
                  <Image
                    src={imageError ? fallbackImage : currentImage}
                    alt={product.title}
                    width={300}
                    height={300}
                    className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-200"
                    onError={() => setImageError(true)}
                  />
                  
                  {/* Image Navigation */}
                  {product.images && product.images.length > 1 && (
                    <div className="absolute bottom-2 left-1/2 transform -translate-x-1/2 flex space-x-1">
                      {product.images.map((_, index) => (
                        <button
                          key={index}
                          onClick={(e) => {
                            e.preventDefault()
                            e.stopPropagation()
                            setCurrentImageIndex(index)
                            setImageError(false)
                          }}
                          className={`w-2 h-2 rounded-full transition-colors ${
                            index === currentImageIndex ? 'bg-white' : 'bg-white/50'
                          }`}
                        />
                      ))}
                    </div>
                  )}
          
          {/* Status Badge */}
          <div className="absolute top-2 left-2">
            <span className={`px-2 py-1 rounded-full text-xs font-medium ${getStatusColor(product.status)}`}>
              {product.status}
            </span>
          </div>

          {/* Condition Badge */}
          <div className="absolute top-2 right-2">
            <span className={`px-2 py-1 rounded-full text-xs font-medium ${getConditionColor(product.condition)}`}>
              {product.condition}
            </span>
          </div>
        </div>

        <div className="p-4 space-y-3">
          <h3 className="font-semibold text-lg line-clamp-2 group-hover:text-forest-600 transition-colors text-forest-800">
            {product.title}
          </h3>
          
          <p className="text-forest-600 text-sm line-clamp-2">{product.description}</p>
          
          {/* Rating */}
          {product.rating > 0 && (
            <div className="flex items-center space-x-1">
              <span className="text-yellow-500 text-sm">{generateStars(product.rating)}</span>
              <span className="text-forest-500 text-xs">({product.reviewCount})</span>
            </div>
          )}

          {/* Price and Category */}
          <div className="flex justify-between items-center pt-2">
            <span className="text-forest-700 font-bold text-xl">{formatPriceINR(product.price)}</span>
            <span className="text-sm text-forest-500 bg-forest-100 px-2 py-1 rounded-full">{product.category}</span>
          </div>

          {/* Seller Info */}
          {showSellerInfo && (
            <div className="pt-2 border-t border-forest-100">
              <p className="text-xs text-forest-500">
                Sold by <span className="font-medium text-forest-700">{product.seller.name}</span>
              </p>
            </div>
          )}
        </div>
      </Link>

      {/* Add to Cart Button */}
      {product.status === 'available' && (
        <div className="p-4 pt-0">
          <button
            onClick={handleAddToCart}
            disabled={addingToCart}
            className="w-full bg-forest-600 hover:bg-forest-700 disabled:bg-forest-300 text-white font-medium py-2 px-4 rounded-lg transition-colors duration-200 flex items-center justify-center space-x-2"
          >
            {addingToCart ? (
              <>
                <div className="animate-spin rounded-full h-4 w-4 border-b-2 border-white"></div>
                <span>Adding...</span>
              </>
            ) : (
              <>
                <span>🛒</span>
                <span>Add to Cart</span>
              </>
            )}
          </button>
        </div>
      )}
    </div>
  )
}
