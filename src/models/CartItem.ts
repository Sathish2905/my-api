import mongoose, { Schema, Document } from 'mongoose';

export interface ICartItem extends Document {
  productId: string;
  quantity: number;
  userId: string;
}

const CartItemSchema: Schema = new Schema({
  productId: { type: Schema.Types.ObjectId, ref: 'Product', required: true },
  quantity: { type: Number, required: true },
  userId: { type: Schema.Types.ObjectId, ref: 'User', required: true },
});

export default mongoose.model<ICartItem>('CartItem', CartItemSchema);
