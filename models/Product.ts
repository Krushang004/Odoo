import mongoose, { Document, Schema } from 'mongoose'

export interface IProduct extends Document {
  title: string
  description: string
  category: string
  price: number
  images: string[] // Changed from single image to array
  seller: mongoose.Types.ObjectId
  isAvailable: boolean
  status: 'available' | 'sold' | 'reserved'
  rating: number
  reviewCount: number
  condition: 'new' | 'like-new' | 'good' | 'fair' | 'poor'
  createdAt: Date
  updatedAt: Date
}

const ProductSchema: Schema = new Schema({
  title: {
    type: String,
    required: [true, 'Please provide a title'],
    maxLength: [100, 'Title cannot be more than 100 characters'],
  },
  description: {
    type: String,
    required: [true, 'Please provide a description'],
    maxLength: [1000, 'Description cannot be more than 1000 characters'],
  },
  category: {
    type: String,
    required: [true, 'Please provide a category'],
    enum: ['Electronics', 'Clothing', 'Books', 'Home & Garden', 'Sports', 'Toys', 'Other'],
  },
  price: {
    type: Number,
    required: [true, 'Please provide a price'],
    min: [0, 'Price cannot be negative'],
  },
  images: {
    type: [String],
    required: [true, 'Please provide at least 2 images'],
    validate: {
      validator: function(images: string[]) {
        return images && images.length >= 2
      },
      message: 'Product must have at least 2 images'
    }
  },
  seller: {
    type: Schema.Types.ObjectId,
    ref: 'User',
    required: true,
  },
  isAvailable: {
    type: Boolean,
    default: true,
  },
  status: {
    type: String,
    enum: ['available', 'sold', 'reserved'],
    default: 'available',
  },
  rating: {
    type: Number,
    default: 0,
    min: 0,
    max: 5,
  },
  reviewCount: {
    type: Number,
    default: 0,
  },
  condition: {
    type: String,
    enum: ['new', 'like-new', 'good', 'fair', 'poor'],
    default: 'good',
  },
}, {
  timestamps: true,
})

export default mongoose.models.Product || mongoose.model<IProduct>('Product', ProductSchema)
