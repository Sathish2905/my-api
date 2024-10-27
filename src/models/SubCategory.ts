import mongoose, { Schema, Document } from 'mongoose';

export interface ISubCategory extends Document {
  name: string;
  categoryId: string;
}

const SubCategorySchema: Schema = new Schema({
  name: { type: String, required: true },
  categoryId: { type: Schema.Types.ObjectId, ref: 'Category', required: true },
});

export default mongoose.model<ISubCategory>('SubCategory', SubCategorySchema);
