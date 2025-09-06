import Link from 'next/link'
import { getServerSession } from 'next-auth'
import { authOptions } from '@/lib/auth'
import { ProductGrid } from '@/components/ProductGrid'
import { DatabaseStatus } from '@/components/DatabaseStatus'

export default async function Home() {
  let session = null
  try {
    session = await getServerSession(authOptions)
  } catch (error) {
    console.log('Session error (likely database connection):', error instanceof Error ? error.message : 'Unknown error')
  }

  return (
    <div className="space-y-8">
      {/* Database Status */}
      <DatabaseStatus />
      
      {/* Hero Section */}
      <section className="text-center py-12 bg-gradient-to-r from-forest-500 to-ocean-500 text-white rounded-lg">
        <h1 className="text-4xl md:text-6xl font-bold mb-4">
          Welcome to EcoFinds
        </h1>
        <p className="text-xl md:text-2xl mb-8 max-w-2xl mx-auto">
          Discover sustainable second-hand treasures and give items a second life
        </p>
        {!session ? (
          <div className="space-x-4">
            <Link href="/auth/signin" className="btn-primary bg-white text-primary-600 hover:bg-gray-100">
              Get Started
            </Link>
            <Link href="/products" className="btn-secondary bg-transparent border-2 border-white text-white hover:bg-white hover:text-primary-600">
              Browse Products
            </Link>
          </div>
        ) : (
          <Link href="/products" className="btn-primary bg-white text-primary-600 hover:bg-gray-100">
            Browse Products
          </Link>
        )}
      </section>

      {/* Features Section */}
      <section className="grid md:grid-cols-3 gap-8">
        <div className="card p-6 text-center">
          <div className="text-4xl mb-4">🌱</div>
          <h3 className="text-xl font-semibold mb-2">Sustainable</h3>
          <p className="text-gray-600">Reduce waste by giving items a second life</p>
        </div>
        <div className="card p-6 text-center">
          <div className="text-4xl mb-4">💰</div>
          <h3 className="text-xl font-semibold mb-2">Affordable</h3>
          <p className="text-gray-600">Find great deals on quality second-hand items</p>
        </div>
        <div className="card p-6 text-center">
          <div className="text-4xl mb-4">🤝</div>
          <h3 className="text-xl font-semibold mb-2">Community</h3>
          <p className="text-gray-600">Connect with like-minded eco-conscious buyers</p>
        </div>
      </section>

      {/* Featured Products */}
      <section>
        <h2 className="text-3xl font-bold mb-6">Featured Products</h2>
        <ProductGrid limit={6} />
      </section>
    </div>
  )
}
