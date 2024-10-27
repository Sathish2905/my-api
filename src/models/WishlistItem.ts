import mongoose, { Schema, Document } from 'mongoose';

export interface IWishlistItem extends Document {
  productId: string;
  userId: string;
}

const WishlistItemSchema: Schema = new Schema({
  productId: { type: Schema.Types.ObjectId, ref: 'Product', required: true },
  userId: { type: Schema.Types.ObjectId, ref: 'User', required: true },
});

export default mongoose.model<IWishlistItem>('WishlistItem', WishlistItemSchema);
