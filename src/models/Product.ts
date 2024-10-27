import mongoose, { Schema, Document } from 'mongoose';

export interface IProduct extends Document {
  title: string;
  description: string;
  price: number;
  image: string;
  categoryId: string;
  subCategoryId?: string;
}

const ProductSchema: Schema = new Schema({
  title: { type: String, required: true },
  description: { type: String, required: true },
  price: { type: Number, required: true },
  image: { type: String, required: true },
  categoryId: { type: Schema.Types.ObjectId, ref: 'Category', required: true },
  subCategoryId: { type: Schema.Types.ObjectId, ref: 'SubCategory' },
});

export default mongoose.model<IProduct>('Product', ProductSchema);
