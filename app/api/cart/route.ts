import { NextRequest, NextResponse } from 'next/server'
import { getServerSession } from 'next-auth'
import { authOptions } from '@/lib/auth'
import dbConnect from '@/lib/mongodb'
import Cart from '@/models/Cart'
import Product from '@/models/Product'

export async function GET() {
  try {
    const session = await getServerSession(authOptions)

    if (!session?.user?.id) {
      return NextResponse.json({ items: [] })
    }

    await dbConnect()

    const cart = await Cart.findOne({ user: session.user.id })
      .populate('items.product', 'title price image status')

    return NextResponse.json({ items: cart?.items || [] })
  } catch (error: any) {
    console.error('Error fetching cart:', error)
    return NextResponse.json(
      { error: 'Failed to fetch cart', details: error.message },
      { status: 500 }
    )
  }
}

export async function POST(request: NextRequest) {
  try {
    const session = await getServerSession(authOptions)

    if (!session?.user?.id) {
      return NextResponse.json(
        { error: 'Authentication required' },
        { status: 401 }
      )
    }

    const { productId, quantity = 1 } = await request.json()

    if (!productId) {
      return NextResponse.json(
        { error: 'Product ID is required' },
        { status: 400 }
      )
    }

    await dbConnect()

    // Check if product exists and is available
    const product = await Product.findById(productId)
    if (!product) {
      return NextResponse.json(
        { error: 'Product not found' },
        { status: 404 }
      )
    }

    if (product.status !== 'available') {
      return NextResponse.json(
        { error: 'Product is not available' },
        { status: 400 }
      )
    }

    // Find or create cart
    let cart = await Cart.findOne({ user: session.user.id })

    if (!cart) {
      cart = new Cart({
        user: session.user.id,
        items: [],
      })
    }

    // Check if item already exists in cart
    const existingItemIndex = cart.items.findIndex(
      (item: any) => item.product.toString() === productId
    )

    if (existingItemIndex >= 0) {
      // Update quantity
      cart.items[existingItemIndex].quantity += quantity
    } else {
      // Add new item
      cart.items.push({
        product: productId,
        quantity,
        addedAt: new Date(),
      })
    }

    await cart.save()

    // Populate the response
    await cart.populate('items.product', 'title price image status')

    return NextResponse.json({ 
      message: 'Item added to cart',
      items: cart.items 
    })
  } catch (error: any) {
    console.error('Error adding to cart:', error)
    return NextResponse.json(
      { error: 'Failed to add item to cart', details: error.message },
      { status: 500 }
    )
  }
}

export async function DELETE() {
  try {
    const session = await getServerSession(authOptions)

    if (!session?.user?.id) {
      return NextResponse.json(
        { error: 'Authentication required' },
        { status: 401 }
      )
    }

    await dbConnect()

    await Cart.findOneAndDelete({ user: session.user.id })

    return NextResponse.json({ message: 'Cart cleared' })
  } catch (error: any) {
    console.error('Error clearing cart:', error)
    return NextResponse.json(
      { error: 'Failed to clear cart', details: error.message },
      { status: 500 }
    )
  }
}
