import mongoose, { Document, Schema } from 'mongoose'

export interface ICart extends Document {
  user: mongoose.Types.ObjectId
  items: {
    product: mongoose.Types.ObjectId
    quantity: number
    addedAt: Date
  }[]
  createdAt: Date
  updatedAt: Date
}

const CartSchema: Schema = new Schema({
  user: {
    type: Schema.Types.ObjectId,
    ref: 'User',
    required: true,
    unique: true,
  },
  items: [{
    product: {
      type: Schema.Types.ObjectId,
      ref: 'Product',
      required: true,
    },
    quantity: {
      type: Number,
      required: true,
      min: 1,
      default: 1,
    },
    addedAt: {
      type: Date,
      default: Date.now,
    },
  }],
}, {
  timestamps: true,
})

export default mongoose.models.Cart || mongoose.model<ICart>('Cart', CartSchema)
