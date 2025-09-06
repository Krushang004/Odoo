import { NextRequest, NextResponse } from 'next/server'
import { getServerSession } from 'next-auth'
import { authOptions } from '@/lib/auth'
import dbConnect from '@/lib/mongodb'
import Order from '@/models/Order'
import Product from '@/models/Product'

export async function GET(request: NextRequest) {
  try {
    const session = await getServerSession(authOptions)
    
    if (!session?.user?.email) {
      return NextResponse.json(
        { error: 'Authentication required' },
        { status: 401 }
      )
    }

    await dbConnect()
    
    const { searchParams } = new URL(request.url)
    const type = searchParams.get('type') || 'buyer' // 'buyer' or 'seller'

    let query: any = {}
    
    if (type === 'buyer') {
      query.buyer = session.user.id
    } else {
      query.seller = session.user.id
    }

    const orders = await Order.find(query)
      .populate('buyer', 'name email')
      .populate('seller', 'name email')
      .populate({
        path: 'product',
        select: 'title price image',
        options: { strictPopulate: false }
      })
      .sort({ createdAt: -1 })

    return NextResponse.json(orders)
  } catch (error) {
    console.error('Error fetching orders:', error)
    return NextResponse.json(
      { error: 'Failed to fetch orders' },
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
    const { productId, quantity, shippingAddress } = body

    if (!productId || !quantity || !shippingAddress) {
      return NextResponse.json(
        { error: 'Product ID, quantity, and shipping address are required' },
        { status: 400 }
      )
    }

    const product = await Product.findById(productId)
    
    if (!product) {
      return NextResponse.json(
        { error: 'Product not found' },
        { status: 404 }
      )
    }

    if (!product.isAvailable) {
      return NextResponse.json(
        { error: 'Product is no longer available' },
        { status: 400 }
      )
    }

    if (product.seller.toString() === session.user.id) {
      return NextResponse.json(
        { error: 'Cannot order your own product' },
        { status: 400 }
      )
    }

    const totalPrice = product.price * quantity

    const order = await Order.create({
      buyer: session.user.id,
      seller: product.seller,
      product: productId,
      quantity,
      totalPrice,
      shippingAddress
    })

    // Mark product as unavailable
    await Product.findByIdAndUpdate(productId, { isAvailable: false })

    await order.populate('buyer', 'name email')
    await order.populate('seller', 'name email')
    await order.populate({
      path: 'product',
      select: 'title price image',
      options: { strictPopulate: false }
    })

    return NextResponse.json(order, { status: 201 })
  } catch (error) {
    console.error('Error creating order:', error)
    return NextResponse.json(
      { error: 'Failed to create order' },
      { status: 500 }
    )
  }
}
