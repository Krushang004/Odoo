'use client'

import { useState } from 'react'

interface ProductFiltersProps {
  onPriceSort: (sort: 'low-to-high' | 'high-to-low' | 'none') => void
  onRatingFilter: (rating: number | null) => void
  onStatusFilter: (status: string | null) => void
  onConditionFilter: (condition: string | null) => void
  priceSort: string
  ratingFilter: number | null
  statusFilter: string | null
  conditionFilter: string | null
}

export function ProductFilters({
  onPriceSort,
  onRatingFilter,
  onStatusFilter,
  onConditionFilter,
  priceSort,
  ratingFilter,
  statusFilter,
  conditionFilter,
}: ProductFiltersProps) {
  const [isOpen, setIsOpen] = useState(true)

  return (
    <div className="bg-white border border-gray-200 rounded-md mb-6">
      {/* Amazon-style filter header */}
      <div className="flex items-center justify-between p-4 border-b border-gray-200">
        <h3 className="text-lg font-medium text-gray-900">Refine by</h3>
        <button
          onClick={() => setIsOpen(!isOpen)}
          className="text-orange-600 hover:text-orange-700 text-sm font-medium transition-colors"
        >
          {isOpen ? 'Collapse' : 'Expand'}
        </button>
      </div>

      {isOpen && (
        <div className="p-4 space-y-6">
          {/* Price Sort - Amazon style */}
          <div>
            <h4 className="text-sm font-medium text-gray-900 mb-3">Sort by Price</h4>
            <div className="space-y-2">
              <label className="flex items-center">
                <input
                  type="radio"
                  name="priceSort"
                  value="none"
                  checked={priceSort === 'none'}
                  onChange={(e) => onPriceSort(e.target.value as any)}
                  className="mr-3 text-orange-600 focus:ring-orange-500"
                />
                <span className="text-sm text-gray-700">Featured</span>
              </label>
              <label className="flex items-center">
                <input
                  type="radio"
                  name="priceSort"
                  value="low-to-high"
                  checked={priceSort === 'low-to-high'}
                  onChange={(e) => onPriceSort(e.target.value as any)}
                  className="mr-3 text-orange-600 focus:ring-orange-500"
                />
                <span className="text-sm text-gray-700">Price: Low to High</span>
              </label>
              <label className="flex items-center">
                <input
                  type="radio"
                  name="priceSort"
                  value="high-to-low"
                  checked={priceSort === 'high-to-low'}
                  onChange={(e) => onPriceSort(e.target.value as any)}
                  className="mr-3 text-orange-600 focus:ring-orange-500"
                />
                <span className="text-sm text-gray-700">Price: High to Low</span>
              </label>
            </div>
          </div>

          {/* Rating Filter - Amazon style */}
          <div>
            <h4 className="text-sm font-medium text-gray-900 mb-3">Customer Rating</h4>
            <div className="space-y-2">
              <label className="flex items-center">
                <input
                  type="radio"
                  name="ratingFilter"
                  value=""
                  checked={!ratingFilter}
                  onChange={(e) => onRatingFilter(null)}
                  className="mr-3 text-orange-600 focus:ring-orange-500"
                />
                <span className="text-sm text-gray-700">Any rating</span>
              </label>
              <label className="flex items-center">
                <input
                  type="radio"
                  name="ratingFilter"
                  value="4"
                  checked={ratingFilter === 4}
                  onChange={(e) => onRatingFilter(Number(e.target.value))}
                  className="mr-3 text-orange-600 focus:ring-orange-500"
                />
                <span className="text-sm text-gray-700 flex items-center">
                  <span className="text-yellow-400 mr-1">★★★★</span>
                  & Up
                </span>
              </label>
              <label className="flex items-center">
                <input
                  type="radio"
                  name="ratingFilter"
                  value="3"
                  checked={ratingFilter === 3}
                  onChange={(e) => onRatingFilter(Number(e.target.value))}
                  className="mr-3 text-orange-600 focus:ring-orange-500"
                />
                <span className="text-sm text-gray-700 flex items-center">
                  <span className="text-yellow-400 mr-1">★★★</span>
                  & Up
                </span>
              </label>
              <label className="flex items-center">
                <input
                  type="radio"
                  name="ratingFilter"
                  value="2"
                  checked={ratingFilter === 2}
                  onChange={(e) => onRatingFilter(Number(e.target.value))}
                  className="mr-3 text-orange-600 focus:ring-orange-500"
                />
                <span className="text-sm text-gray-700 flex items-center">
                  <span className="text-yellow-400 mr-1">★★</span>
                  & Up
                </span>
              </label>
            </div>
          </div>

          {/* Status Filter */}
          <div>
            <h4 className="text-sm font-medium text-gray-900 mb-3">Availability</h4>
            <div className="space-y-2">
              <label className="flex items-center">
                <input
                  type="radio"
                  name="statusFilter"
                  value=""
                  checked={!statusFilter}
                  onChange={(e) => onStatusFilter(null)}
                  className="mr-3 text-orange-600 focus:ring-orange-500"
                />
                <span className="text-sm text-gray-700">All items</span>
              </label>
              <label className="flex items-center">
                <input
                  type="radio"
                  name="statusFilter"
                  value="available"
                  checked={statusFilter === 'available'}
                  onChange={(e) => onStatusFilter(e.target.value)}
                  className="mr-3 text-orange-600 focus:ring-orange-500"
                />
                <span className="text-sm text-gray-700">Available</span>
              </label>
              <label className="flex items-center">
                <input
                  type="radio"
                  name="statusFilter"
                  value="sold"
                  checked={statusFilter === 'sold'}
                  onChange={(e) => onStatusFilter(e.target.value)}
                  className="mr-3 text-orange-600 focus:ring-orange-500"
                />
                <span className="text-sm text-gray-700">Sold</span>
              </label>
            </div>
          </div>

          {/* Condition Filter */}
          <div>
            <h4 className="text-sm font-medium text-gray-900 mb-3">Item Condition</h4>
            <div className="space-y-2">
              <label className="flex items-center">
                <input
                  type="radio"
                  name="conditionFilter"
                  value=""
                  checked={!conditionFilter}
                  onChange={(e) => onConditionFilter(null)}
                  className="mr-3 text-orange-600 focus:ring-orange-500"
                />
                <span className="text-sm text-gray-700">All conditions</span>
              </label>
              <label className="flex items-center">
                <input
                  type="radio"
                  name="conditionFilter"
                  value="new"
                  checked={conditionFilter === 'new'}
                  onChange={(e) => onConditionFilter(e.target.value)}
                  className="mr-3 text-orange-600 focus:ring-orange-500"
                />
                <span className="text-sm text-gray-700">New</span>
              </label>
              <label className="flex items-center">
                <input
                  type="radio"
                  name="conditionFilter"
                  value="like-new"
                  checked={conditionFilter === 'like-new'}
                  onChange={(e) => onConditionFilter(e.target.value)}
                  className="mr-3 text-orange-600 focus:ring-orange-500"
                />
                <span className="text-sm text-gray-700">Like New</span>
              </label>
              <label className="flex items-center">
                <input
                  type="radio"
                  name="conditionFilter"
                  value="good"
                  checked={conditionFilter === 'good'}
                  onChange={(e) => onConditionFilter(e.target.value)}
                  className="mr-3 text-orange-600 focus:ring-orange-500"
                />
                <span className="text-sm text-gray-700">Good</span>
              </label>
              <label className="flex items-center">
                <input
                  type="radio"
                  name="conditionFilter"
                  value="fair"
                  checked={conditionFilter === 'fair'}
                  onChange={(e) => onConditionFilter(e.target.value)}
                  className="mr-3 text-orange-600 focus:ring-orange-500"
                />
                <span className="text-sm text-gray-700">Fair</span>
              </label>
            </div>
          </div>
        </div>
      )}

      {/* Active Filters - Amazon style chips */}
      {(priceSort !== 'none' || ratingFilter || statusFilter || conditionFilter) && (
        <div className="px-4 py-3 border-t border-gray-200 bg-gray-50">
          <div className="flex items-center justify-between mb-2">
            <span className="text-sm font-medium text-gray-700">Active filters:</span>
            <button
              onClick={() => {
                onPriceSort('none')
                onRatingFilter(null)
                onStatusFilter(null)
                onConditionFilter(null)
              }}
              className="text-sm text-orange-600 hover:text-orange-700 font-medium"
            >
              Clear all
            </button>
          </div>
          <div className="flex flex-wrap gap-2">
            {priceSort !== 'none' && (
              <span className="inline-flex items-center px-3 py-1 rounded-full text-xs font-medium bg-orange-100 text-orange-800 border border-orange-200">
                {priceSort === 'low-to-high' ? 'Price: Low to High' : 'Price: High to Low'}
                <button
                  onClick={() => onPriceSort('none')}
                  className="ml-2 text-orange-600 hover:text-orange-800"
                >
                  ×
                </button>
              </span>
            )}
            {ratingFilter && (
              <span className="inline-flex items-center px-3 py-1 rounded-full text-xs font-medium bg-orange-100 text-orange-800 border border-orange-200">
                {ratingFilter}+ stars
                <button
                  onClick={() => onRatingFilter(null)}
                  className="ml-2 text-orange-600 hover:text-orange-800"
                >
                  ×
                </button>
              </span>
            )}
            {statusFilter && (
              <span className="inline-flex items-center px-3 py-1 rounded-full text-xs font-medium bg-orange-100 text-orange-800 border border-orange-200">
                {statusFilter}
                <button
                  onClick={() => onStatusFilter(null)}
                  className="ml-2 text-orange-600 hover:text-orange-800"
                >
                  ×
                </button>
              </span>
            )}
            {conditionFilter && (
              <span className="inline-flex items-center px-3 py-1 rounded-full text-xs font-medium bg-orange-100 text-orange-800 border border-orange-200">
                {conditionFilter}
                <button
                  onClick={() => onConditionFilter(null)}
                  className="ml-2 text-orange-600 hover:text-orange-800"
                >
                  ×
                </button>
              </span>
            )}
          </div>
        </div>
      )}
    </div>
  )
}
