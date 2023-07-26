import { Document } from 'mongoose';

export type IBook = {
  id: string;
  title: string;
  author: string;
  genre: string;
  publicationDate: Date;
  reviews: IReview[];
};

export type IReview = {
  id: string;
  rating: number;
  comment: string;
  userId: string;
  createdAt: Date;
};

export type BookDocument = IBook & Document;
