import { Schema, model } from 'mongoose';
import { BookDocument, IBook, IReview } from './books.interface';

const reviewSchema = new Schema<IReview>({
  rating: { type: Number, required: true },
  comment: { type: String, required: true },
  userId: { type: String, required: true },
  createdAt: { type: Date, default: Date.now },
});

const BookSchema = new Schema<IBook>(
  {
    title: { type: String, required: true },
    author: { type: String, required: true },
    genre: { type: String, required: true },
    publicationDate: { type: Date, required: true },
    reviews: [reviewSchema],
  },
  {
    timestamps: true,
    toJSON: {
      virtuals: true,
    },
  }
);

export const BookModel = model<BookDocument>('Book', BookSchema);
