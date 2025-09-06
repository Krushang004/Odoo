import { NextRequest, NextResponse } from 'next/server'
import { getServerSession } from 'next-auth'
import { authOptions } from '@/lib/auth'
import dbConnect from '@/lib/mongodb'
import User from '@/models/User'
import Product from '@/models/Product'
import Order from '@/models/Order'

export async function GET() {
  try {
    const session = await getServerSession(authOptions)

    if (!session?.user?.id) {
      return NextResponse.json(
        { error: 'Authentication required' },
        { status: 401 }
      )
    }

    await dbConnect()

    const user = await User.findById(session.user.id)
    if (!user) {
      return NextResponse.json(
        { error: 'User not found' },
        { status: 404 }
      )
    }

    // Get user stats
    const totalProducts = await Product.countDocuments({ seller: session.user.id })
    const totalOrders = await Order.countDocuments({ buyer: session.user.id })
    
    const sales = await Product.aggregate([
      { $match: { seller: user._id } },
      { $group: { _id: null, total: { $sum: '$price' } } }
    ])
    
    const totalSales = sales.length > 0 ? sales[0].total : 0

    // Calculate average rating for user's products
    const ratingStats = await Product.aggregate([
      { $match: { seller: user._id } },
      { $group: { _id: null, avgRating: { $avg: '$rating' } } }
    ])
    
    const averageRating = ratingStats.length > 0 ? ratingStats[0].avgRating : 0

    const stats = {
      totalProducts,
      totalOrders,
      totalSales,
      averageRating
    }

    return NextResponse.json({ user, stats })
  } catch (error: any) {
    console.error('Error fetching profile:', error)
    return NextResponse.json(
      { error: 'Failed to fetch profile', details: error.message },
      { status: 500 }
    )
  }
}

export async function PUT(request: NextRequest) {
  try {
    const session = await getServerSession(authOptions)

    if (!session?.user?.id) {
      return NextResponse.json(
        { error: 'Authentication required' },
        { status: 401 }
      )
    }

    const { name, email, image } = await request.json()

    if (!name || !email) {
      return NextResponse.json(
        { error: 'Name and email are required' },
        { status: 400 }
      )
    }

    await dbConnect()

    const user = await User.findByIdAndUpdate(
      session.user.id,
      { name, email, image },
      { new: true }
    )

    if (!user) {
      return NextResponse.json(
        { error: 'User not found' },
        { status: 404 }
      )
    }

    return NextResponse.json({ user })
  } catch (error: any) {
    console.error('Error updating profile:', error)
    return NextResponse.json(
      { error: 'Failed to update profile', details: error.message },
      { status: 500 }
    )
  }
}
