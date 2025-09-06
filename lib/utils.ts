// Convert USD to INR (approximate rate: 1 USD = 83 INR)
export function convertToINR(usdPrice: number): number {
  return Math.round(usdPrice * 83)
}

// Format price in INR
export function formatPrice(price: number): string {
  return `₹${price.toLocaleString('en-IN')}`
}

// Format price from USD to INR
export function formatPriceINR(usdPrice: number): string {
  return formatPrice(convertToINR(usdPrice))
}

// Get status color
export function getStatusColor(status: string): string {
  switch (status) {
    case 'available':
      return 'text-green-600 bg-green-100'
    case 'sold':
      return 'text-red-600 bg-red-100'
    case 'reserved':
      return 'text-yellow-600 bg-yellow-100'
    default:
      return 'text-gray-600 bg-gray-100'
  }
}

// Get condition color
export function getConditionColor(condition: string): string {
  switch (condition) {
    case 'new':
      return 'text-green-600 bg-green-100'
    case 'like-new':
      return 'text-blue-600 bg-blue-100'
    case 'good':
      return 'text-yellow-600 bg-yellow-100'
    case 'fair':
      return 'text-orange-600 bg-orange-100'
    case 'poor':
      return 'text-red-600 bg-red-100'
    default:
      return 'text-gray-600 bg-gray-100'
  }
}

// Generate star rating display
export function generateStars(rating: number): string {
  const fullStars = Math.floor(rating)
  const hasHalfStar = rating % 1 !== 0
  const emptyStars = 5 - fullStars - (hasHalfStar ? 1 : 0)
  
  return '★'.repeat(fullStars) + 
         (hasHalfStar ? '☆' : '') + 
         '☆'.repeat(emptyStars)
}
