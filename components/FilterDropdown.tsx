'use client'

interface FilterDropdownProps {
  onPriceSort: (sort: 'low-to-high' | 'high-to-low' | 'none') => void
  onRatingFilter: (rating: number | null) => void
  onStatusFilter: (status: string | null) => void
  onConditionFilter: (condition: string | null) => void
  priceSort: string
  ratingFilter: number | null
  statusFilter: string | null
  conditionFilter: string | null
}

export function FilterDropdown({
  onPriceSort,
  onRatingFilter,
  onStatusFilter,
  onConditionFilter,
  priceSort,
  ratingFilter,
  statusFilter,
  conditionFilter,
}: FilterDropdownProps) {
  const hasActiveFilters = priceSort !== 'none' || ratingFilter || statusFilter || conditionFilter

  return (
    <div className="relative">
      <select
        className="w-full h-10 px-4 py-2 text-sm border border-gray-300 rounded-l-md focus:outline-none focus:ring-2 focus:ring-forest-500 focus:border-forest-500 bg-white appearance-none cursor-pointer"
        onChange={(e) => {
          const value = e.target.value
          if (value === 'clear') {
            onPriceSort('none')
            onRatingFilter(null)
            onStatusFilter(null)
            onConditionFilter(null)
          } else if (value.startsWith('price-')) {
            onPriceSort(value.replace('price-', '') as any)
          } else if (value.startsWith('rating-')) {
            onRatingFilter(value === 'rating-none' ? null : Number(value.replace('rating-', '')))
          } else if (value.startsWith('status-')) {
            onStatusFilter(value === 'status-none' ? null : value.replace('status-', ''))
          } else if (value.startsWith('condition-')) {
            onConditionFilter(value === 'condition-none' ? null : value.replace('condition-', ''))
          }
        }}
        value=""
      >
        <option value="" disabled>
          {hasActiveFilters ? 'Filters Applied' : 'All Filters'}
        </option>
        
        {/* Price Sort */}
        <optgroup label="Sort by Price">
          <option value="price-none">Featured</option>
          <option value="price-low-to-high">Price: Low to High</option>
          <option value="price-high-to-low">Price: High to Low</option>
        </optgroup>

        {/* Rating Filter */}
        <optgroup label="Customer Rating">
          <option value="rating-none">Any rating</option>
          <option value="rating-4">4+ stars</option>
          <option value="rating-3">3+ stars</option>
          <option value="rating-2">2+ stars</option>
        </optgroup>

        {/* Status Filter */}
        <optgroup label="Availability">
          <option value="status-none">All items</option>
          <option value="status-available">Available</option>
          <option value="status-sold">Sold</option>
        </optgroup>

        {/* Condition Filter */}
        <optgroup label="Item Condition">
          <option value="condition-none">All conditions</option>
          <option value="condition-new">New</option>
          <option value="condition-like-new">Like New</option>
          <option value="condition-good">Good</option>
          <option value="condition-fair">Fair</option>
        </optgroup>

        {/* Clear All */}
        {hasActiveFilters && (
          <optgroup label="Actions">
            <option value="clear">Clear All Filters</option>
          </optgroup>
        )}
      </select>
      
      {/* Custom dropdown arrow */}
      <div className="absolute inset-y-0 right-0 flex items-center pr-3 pointer-events-none">
        <svg className="h-4 w-4 text-gray-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 9l-7 7-7-7" />
        </svg>
      </div>
    </div>
  )
}
