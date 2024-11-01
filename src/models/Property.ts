import mongoose, { Schema, Document } from 'mongoose';

export interface IProperty extends Document {
  name: string;
  value: string;
}

const PropertySchema: Schema = new Schema({
  name: { type: String, required: true },
  value: { type: String, required: true },

});

export default mongoose.model<IProperty>('Property', PropertySchema);
