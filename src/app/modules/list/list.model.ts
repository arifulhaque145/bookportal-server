import mongoose, { Schema } from 'mongoose';
import { IList, ListDocument } from './list.interface';

const orderSchema = new Schema<IList>({
  book: { type: Schema.Types.ObjectId, required: true },
  user: { type: Schema.Types.ObjectId, required: true },
});

export const ListModel = mongoose.model<ListDocument>('List', orderSchema);
