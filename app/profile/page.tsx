'use client'

import { useState, useEffect } from 'react'
import { useSession } from 'next-auth/react'
import { useRouter } from 'next/navigation'
import { formatPriceINR } from '@/lib/utils'

interface User {
  _id: string
  name: string
  email: string
  image?: string
  createdAt: string
}

interface UserStats {
  totalProducts: number
  totalOrders: number
  totalSales: number
  averageRating: number
}

export default function ProfilePage() {
  const { data: session, status } = useSession()
  const router = useRouter()
  const [user, setUser] = useState<User | null>(null)
  const [stats, setStats] = useState<UserStats | null>(null)
  const [loading, setLoading] = useState(true)
  const [editing, setEditing] = useState(false)
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    image: ''
  })

  useEffect(() => {
    if (status === 'unauthenticated') {
      router.push('/auth/signin')
      return
    }

    if (session?.user?.id) {
      fetchUserData()
    }
  }, [session, status, router])

  const fetchUserData = async () => {
    try {
      setLoading(true)
      const response = await fetch('/api/profile')
      if (response.ok) {
        const data = await response.json()
        setUser(data.user)
        setStats(data.stats)
        setFormData({
          name: data.user.name,
          email: data.user.email,
          image: data.user.image || ''
        })
      }
    } catch (error) {
      console.error('Error fetching user data:', error)
    } finally {
      setLoading(false)
    }
  }

  const handleUpdateProfile = async (e: React.FormEvent) => {
    e.preventDefault()
    try {
      const response = await fetch('/api/profile', {
        method: 'PUT',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(formData),
      })

      if (response.ok) {
        const data = await response.json()
        setUser(data.user)
        setEditing(false)
      }
    } catch (error) {
      console.error('Error updating profile:', error)
    }
  }

  if (status === 'loading' || loading) {
    return (
      <div className="container mx-auto px-4 py-8">
        <div className="flex justify-center items-center h-64">
          <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-forest-600"></div>
        </div>
      </div>
    )
  }

  if (!user) {
    return (
      <div className="container mx-auto px-4 py-8">
        <div className="text-center">
          <h1 className="text-2xl font-bold text-forest-800 mb-4">Profile Not Found</h1>
          <p className="text-forest-600">Unable to load your profile information.</p>
        </div>
      </div>
    )
  }

  return (
    <div className="container mx-auto px-4 py-8">
      <div className="max-w-4xl mx-auto">
        <h1 className="text-3xl font-bold text-forest-800 mb-8">My Profile</h1>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          {/* Profile Information */}
          <div className="lg:col-span-2">
            <div className="bg-white rounded-lg shadow-md p-6">
              <div className="flex items-center justify-between mb-6">
                <h2 className="text-xl font-semibold text-forest-800">Profile Information</h2>
                <button
                  onClick={() => setEditing(!editing)}
                  className="btn-secondary"
                >
                  {editing ? 'Cancel' : 'Edit Profile'}
                </button>
              </div>

              {editing ? (
                <form onSubmit={handleUpdateProfile} className="space-y-4">
                  <div>
                    <label className="block text-sm font-medium text-forest-700 mb-2">
                      Name
                    </label>
                    <input
                      type="text"
                      value={formData.name}
                      onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                      className="w-full p-3 border border-forest-300 rounded-lg focus:ring-2 focus:ring-forest-500 focus:border-transparent"
                      required
                    />
                  </div>

                  <div>
                    <label className="block text-sm font-medium text-forest-700 mb-2">
                      Email
                    </label>
                    <input
                      type="email"
                      value={formData.email}
                      onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                      className="w-full p-3 border border-forest-300 rounded-lg focus:ring-2 focus:ring-forest-500 focus:border-transparent"
                      required
                    />
                  </div>

                  <div>
                    <label className="block text-sm font-medium text-forest-700 mb-2">
                      Profile Image URL
                    </label>
                    <input
                      type="url"
                      value={formData.image}
                      onChange={(e) => setFormData({ ...formData, image: e.target.value })}
                      className="w-full p-3 border border-forest-300 rounded-lg focus:ring-2 focus:ring-forest-500 focus:border-transparent"
                      placeholder="https://example.com/image.jpg"
                    />
                  </div>

                  <div className="flex space-x-4">
                    <button
                      type="submit"
                      className="btn-primary"
                    >
                      Save Changes
                    </button>
                    <button
                      type="button"
                      onClick={() => setEditing(false)}
                      className="btn-secondary"
                    >
                      Cancel
                    </button>
                  </div>
                </form>
              ) : (
                <div className="space-y-4">
                  <div className="flex items-center space-x-4">
                    <div className="w-16 h-16 bg-forest-100 rounded-full flex items-center justify-center">
                      {user.image ? (
                        <img
                          src={user.image}
                          alt={user.name}
                          className="w-16 h-16 rounded-full object-cover"
                        />
                      ) : (
                        <span className="text-2xl text-forest-600">
                          {user.name.charAt(0).toUpperCase()}
                        </span>
                      )}
                    </div>
                    <div>
                      <h3 className="text-lg font-semibold text-forest-800">{user.name}</h3>
                      <p className="text-forest-600">{user.email}</p>
                    </div>
                  </div>

                  <div className="pt-4 border-t border-forest-200">
                    <p className="text-sm text-forest-500">
                      Member since {new Date(user.createdAt).toLocaleDateString()}
                    </p>
                  </div>
                </div>
              )}
            </div>
          </div>

          {/* Stats */}
          <div className="space-y-6">
            <div className="bg-white rounded-lg shadow-md p-6">
              <h3 className="text-lg font-semibold text-forest-800 mb-4">Your Stats</h3>
              <div className="space-y-4">
                <div className="flex justify-between items-center">
                  <span className="text-forest-600">Products Listed</span>
                  <span className="font-semibold text-forest-800">{stats?.totalProducts || 0}</span>
                </div>
                <div className="flex justify-between items-center">
                  <span className="text-forest-600">Orders Placed</span>
                  <span className="font-semibold text-forest-800">{stats?.totalOrders || 0}</span>
                </div>
                <div className="flex justify-between items-center">
                  <span className="text-forest-600">Total Sales</span>
                  <span className="font-semibold text-forest-800">
                    {stats?.totalSales ? formatPriceINR(stats.totalSales) : '₹0'}
                  </span>
                </div>
                <div className="flex justify-between items-center">
                  <span className="text-forest-600">Average Rating</span>
                  <span className="font-semibold text-forest-800">
                    {stats?.averageRating ? stats.averageRating.toFixed(1) : 'N/A'}
                  </span>
                </div>
              </div>
            </div>

            <div className="bg-white rounded-lg shadow-md p-6">
              <h3 className="text-lg font-semibold text-forest-800 mb-4">Quick Actions</h3>
              <div className="space-y-3">
                <a
                  href="/products/new"
                  className="block w-full text-center py-2 px-4 bg-forest-600 hover:bg-forest-700 text-white rounded-lg transition-colors"
                >
                  List New Product
                </a>
                <a
                  href="/orders"
                  className="block w-full text-center py-2 px-4 bg-forest-100 hover:bg-forest-200 text-forest-700 rounded-lg transition-colors"
                >
                  View Orders
                </a>
                <a
                  href="/products"
                  className="block w-full text-center py-2 px-4 bg-forest-100 hover:bg-forest-200 text-forest-700 rounded-lg transition-colors"
                >
                  Browse Products
                </a>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}
