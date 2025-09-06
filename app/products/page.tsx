'use client'

import { useState, useEffect, Suspense } from 'react'
import { useSearchParams } from 'next/navigation'
import Link from 'next/link'
import { ProductCard } from '@/components/ProductCard'
import { SearchBar } from '@/components/SearchBar'
import { CategoryFilter } from '@/components/CategoryFilter'
import { FilterDropdown } from '@/components/FilterDropdown'

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

interface Pagination {
  page: number
  limit: number
  total: number
  pages: number
}

function ProductsContent() {
  const [products, setProducts] = useState<Product[]>([])
  const [loading, setLoading] = useState(true)
  const [pagination, setPagination] = useState<Pagination | null>(null)
  const [currentPage, setCurrentPage] = useState(1)
  const [searchTerm, setSearchTerm] = useState('')
  const [selectedCategory, setSelectedCategory] = useState('all')
  const [priceSort, setPriceSort] = useState<'low-to-high' | 'high-to-low' | 'none'>('none')
  const [ratingFilter, setRatingFilter] = useState<number | null>(null)
  const [statusFilter, setStatusFilter] = useState<string | null>(null)
  const [conditionFilter, setConditionFilter] = useState<string | null>(null)
  
  const searchParams = useSearchParams()

  useEffect(() => {
    const page = searchParams.get('page') || '1'
    const search = searchParams.get('search') || ''
    const category = searchParams.get('category') || 'all'
    
    setCurrentPage(parseInt(page))
    setSearchTerm(search)
    setSelectedCategory(category)
    
    fetchProducts(parseInt(page), search, category)
  }, [searchParams])

  const fetchProducts = async (page: number, search: string, category: string) => {
    try {
      setLoading(true)
      const params = new URLSearchParams({
        page: page.toString(),
        limit: '12',
        ...(search && { search }),
        ...(category !== 'all' && { category }),
        ...(priceSort !== 'none' && { priceSort }),
        ...(ratingFilter && { rating: ratingFilter.toString() }),
        ...(statusFilter && { status: statusFilter }),
        ...(conditionFilter && { condition: conditionFilter })
      })
      
      const response = await fetch(`/api/products?${params}`)
      const data = await response.json()
      
      if (response.ok) {
        setProducts(data.products)
        setPagination(data.pagination)
      } else {
        console.error('Error fetching products:', data.error)
      }
    } catch (error) {
      console.error('Error fetching products:', error)
    } finally {
      setLoading(false)
    }
  }

  const handleSearch = (search: string) => {
    const params = new URLSearchParams()
    if (search) params.set('search', search)
    if (selectedCategory !== 'all') params.set('category', selectedCategory)
    params.set('page', '1')
    
    window.history.pushState({}, '', `/products?${params}`)
  }

  const handleCategoryChange = (category: string) => {
    const params = new URLSearchParams()
    if (searchTerm) params.set('search', searchTerm)
    if (category !== 'all') params.set('category', category)
    params.set('page', '1')
    
    window.history.pushState({}, '', `/products?${params}`)
  }

  const handlePageChange = (page: number) => {
    const params = new URLSearchParams()
    if (searchTerm) params.set('search', searchTerm)
    if (selectedCategory !== 'all') params.set('category', selectedCategory)
    if (priceSort !== 'none') params.set('priceSort', priceSort)
    if (ratingFilter) params.set('rating', ratingFilter.toString())
    if (statusFilter) params.set('status', statusFilter)
    if (conditionFilter) params.set('condition', conditionFilter)
    params.set('page', page.toString())
    
    window.history.pushState({}, '', `/products?${params}`)
  }

  const handlePriceSort = (sort: 'low-to-high' | 'high-to-low' | 'none') => {
    setPriceSort(sort)
    setCurrentPage(1)
    fetchProducts(1, searchTerm, selectedCategory)
  }

  const handleRatingFilter = (rating: number | null) => {
    setRatingFilter(rating)
    setCurrentPage(1)
    fetchProducts(1, searchTerm, selectedCategory)
  }

  const handleStatusFilter = (status: string | null) => {
    setStatusFilter(status)
    setCurrentPage(1)
    fetchProducts(1, searchTerm, selectedCategory)
  }

  const handleConditionFilter = (condition: string | null) => {
    setConditionFilter(condition)
    setCurrentPage(1)
    fetchProducts(1, searchTerm, selectedCategory)
  }

  if (loading) {
    return (
      <div className="container mx-auto px-4 py-8">
        <div className="flex justify-center items-center h-64">
          <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-forest-600"></div>
        </div>
      </div>
    )
  }

  return (
    <div className="container mx-auto px-4 py-8">
      <div className="mb-8">
        <h1 className="text-3xl font-bold mb-6 text-gray-900">Browse Products</h1>
        
        {/* Compact search bar with filters */}
        <div className="mb-6">
          <div className="flex gap-2">
            {/* Left: Filter Dropdown */}
            <div className="w-48">
              <FilterDropdown
                onPriceSort={handlePriceSort}
                onRatingFilter={handleRatingFilter}
                onStatusFilter={handleStatusFilter}
                onConditionFilter={handleConditionFilter}
                priceSort={priceSort}
                ratingFilter={ratingFilter}
                statusFilter={statusFilter}
                conditionFilter={conditionFilter}
              />
            </div>
            
            {/* Middle: Search Bar */}
            <div className="flex-1">
              <SearchBar onSearch={handleSearch} initialValue={searchTerm} />
            </div>
            
            {/* Right: Category Filter */}
            <div className="w-48">
              <CategoryFilter onCategoryChange={handleCategoryChange} selectedCategory={selectedCategory} />
            </div>
          </div>
        </div>
      </div>

      {/* Products Grid */}
      {products.length === 0 ? (
        <div className="text-center py-12">
          <div className="text-6xl mb-4">🔍</div>
          <h3 className="text-xl font-semibold mb-2">No products found</h3>
          <p className="text-gray-600 mb-4">Try adjusting your search or filter criteria</p>
          <Link href="/products/new" className="btn-primary">
            List Your First Product
          </Link>
        </div>
      ) : (
        <>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6 mb-8">
            {products.map((product) => (
              <ProductCard key={product._id} product={product} showSellerInfo={true} />
            ))}
          </div>

          {pagination && pagination.pages > 1 && (
            <div className="flex justify-center">
              <nav className="flex space-x-2">
                <button
                  onClick={() => handlePageChange(currentPage - 1)}
                  disabled={currentPage === 1}
                  className="px-3 py-2 rounded-md bg-gray-200 text-gray-700 disabled:opacity-50 disabled:cursor-not-allowed hover:bg-gray-300"
                >
                  Previous
                </button>
                
                {Array.from({ length: pagination.pages }, (_, i) => i + 1).map((page) => (
                  <button
                    key={page}
                    onClick={() => handlePageChange(page)}
                    className={`px-3 py-2 rounded-md ${
                      page === currentPage
                        ? 'bg-forest-600 text-white'
                        : 'bg-gray-200 text-gray-700 hover:bg-gray-300'
                    }`}
                  >
                    {page}
                  </button>
                ))}
                
                <button
                  onClick={() => handlePageChange(currentPage + 1)}
                  disabled={currentPage === pagination.pages}
                  className="px-3 py-2 rounded-md bg-gray-200 text-gray-700 disabled:opacity-50 disabled:cursor-not-allowed hover:bg-gray-300"
                >
                  Next
                </button>
              </nav>
            </div>
          )}
        </>
      )}
    </div>
  )
}

export default function ProductsPage() {
  return (
    <Suspense fallback={
      <div className="container mx-auto px-4 py-8">
        <div className="flex justify-center items-center h-64">
          <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-forest-600"></div>
        </div>
      </div>
    }>
      <ProductsContent />
    </Suspense>
  )
}
