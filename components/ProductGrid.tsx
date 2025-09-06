'use client'

import { useState, useEffect } from 'react'
import Link from 'next/link'
import { ProductCard } from './ProductCard'

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

interface ProductGridProps {
  limit?: number
}

export function ProductGrid({ limit = 12 }: ProductGridProps) {
  const [products, setProducts] = useState<Product[]>([])
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    fetchProducts()
  }, [limit])

  const fetchProducts = async () => {
    try {
      setLoading(true)
      const response = await fetch(`/api/products?limit=${limit}`, {
        next: { revalidate: 60 } // Cache for 60 seconds
      })
      const data = await response.json()
      
      if (response.ok) {
        setProducts(data.products)
      } else {
        console.error('Error fetching products:', data.error)
      }
    } catch (error) {
      console.error('Error fetching products:', error)
    } finally {
      setLoading(false)
    }
  }

  if (loading) {
    return (
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
        {Array.from({ length: limit }).map((_, i) => (
          <div key={i} className="card animate-pulse">
            <div className="aspect-square bg-gray-200 rounded-lg mb-4"></div>
            <div className="space-y-2">
              <div className="h-4 bg-gray-200 rounded"></div>
              <div className="h-3 bg-gray-200 rounded w-3/4"></div>
              <div className="h-3 bg-gray-200 rounded w-1/2"></div>
            </div>
          </div>
        ))}
      </div>
    )
  }

  if (products.length === 0) {
    return (
      <div className="text-center py-12">
        <div className="text-6xl mb-4">📦</div>
        <h3 className="text-xl font-semibold mb-2">No products available</h3>
        <p className="text-gray-600 mb-4">Check back later for new listings</p>
        <Link href="/products/new" className="btn-primary">
          List Your First Product
        </Link>
      </div>
    )
  }

  return (
    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
      {products.map((product) => (
        <ProductCard key={product._id} product={product} />
      ))}
    </div>
  )
}
