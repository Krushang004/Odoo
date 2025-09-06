import { NextRequest, NextResponse } from 'next/server'
import { getServerSession } from 'next-auth'
import { authOptions } from '@/lib/auth'
import dbConnect from '@/lib/mongodb'
import Product from '@/models/Product'

export async function GET(request: NextRequest) {
  try {
    await dbConnect()
    
    const { searchParams } = new URL(request.url)
    const page = parseInt(searchParams.get('page') || '1')
    const limit = parseInt(searchParams.get('limit') || '12')
    const category = searchParams.get('category')
    const search = searchParams.get('search')
    const priceSort = searchParams.get('priceSort')
    const rating = searchParams.get('rating')
    const status = searchParams.get('status')
    const condition = searchParams.get('condition')
    const skip = (page - 1) * limit

    let query: any = { isAvailable: true }

    if (category && category !== 'all') {
      query.category = category
    }

    if (search) {
      query.$or = [
        { title: { $regex: search, $options: 'i' } },
        { description: { $regex: search, $options: 'i' } }
      ]
    }

    if (rating) {
      query.rating = { $gte: parseFloat(rating) }
    }

    if (status) {
      query.status = status
    }

    if (condition) {
      query.condition = condition
    }

    let sortOptions: any = { createdAt: -1 }

    if (priceSort === 'low-to-high') {
      sortOptions = { price: 1 }
    } else if (priceSort === 'high-to-low') {
      sortOptions = { price: -1 }
    }

    const products = await Product.find(query)
      .populate('seller', 'name email')
      .sort(sortOptions)
      .skip(skip)
      .limit(limit)

    const total = await Product.countDocuments(query)

    return NextResponse.json({
      products,
      pagination: {
        page,
        limit,
        total,
        pages: Math.ceil(total / limit)
      }
    })
  } catch (error) {
    console.error('Error fetching products:', error)
    return NextResponse.json(
      { error: 'Failed to fetch products' },
      { status: 500 }
    )
  }
}

export async function POST(request: NextRequest) {
  try {
    const session = await getServerSession(authOptions)
    
    if (!session?.user?.email) {
      return NextResponse.json(
        { error: 'Authentication required' },
        { status: 401 }
      )
    }

    await dbConnect()
    
    const body = await request.json()
    const { title, description, category, price, images } = body

    if (!title || !description || !category || !price || !images || !Array.isArray(images) || images.length < 2) {
      return NextResponse.json(
        { error: 'All fields are required and at least 2 images must be provided' },
        { status: 400 }
      )
    }

    // Validate that all images are non-empty strings
    if (images.some(img => !img || typeof img !== 'string' || !img.trim())) {
      return NextResponse.json(
        { error: 'All image URLs must be valid and non-empty' },
        { status: 400 }
      )
    }

    const product = await Product.create({
      title,
      description,
      category,
      price: parseFloat(price),
      images: images.filter(img => img.trim()), // Remove any empty strings
      seller: session.user.id
    })

    await product.populate('seller', 'name email')

    return NextResponse.json(product, { status: 201 })
  } catch (error) {
    console.error('Error creating product:', error)
    return NextResponse.json(
      { error: 'Failed to create product' },
      { status: 500 }
    )
  }
}
