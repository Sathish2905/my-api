import mongoose, { Schema, Document } from 'mongoose';

export interface IUser extends Document {
  username: string;
  role: 'admin' | 'user';
}

const UserSchema: Schema = new Schema({
  username: { type: String, required: true },
  role: { type: String, enum: ['admin', 'user'], required: true },
});

export default mongoose.model<IUser>('User', UserSchema);
