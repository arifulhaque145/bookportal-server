import httpStatus from 'http-status';
import ApiError from '../../../errors/ApiError';
import { IBook } from './books.interface';
import { BookModel } from './books.model';
import { IFilter, ISearch } from './books.utils';

const getAllBooks = async (): Promise<IBook[]> => {
  try {
    const books = await BookModel.find();
    return books;
  } catch (error) {
    throw new Error('Failed to fetch cows');
  }
};

const searchBooks = async (query: ISearch): Promise<IBook[]> => {
  console.log(query);

  try {
    const { title, author, genre } = query;

    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    const searchQuery: any = {};

    if (title) {
      searchQuery.title = { $regex: title, $options: 'i' };
    }
    if (author) {
      searchQuery.author = { $regex: author, $options: 'i' };
    }
    if (genre) {
      searchQuery.genre = { $regex: genre, $options: 'i' };
    }

    const books = await BookModel.find(searchQuery);

    return books;
  } catch (error) {
    throw new Error('Unable to search books');
  }
};

const filterBooks = async (query: IFilter): Promise<IBook[]> => {
  console.log(query);

  try {
    const { publicationYear, genre } = query;

    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    const filters: any = {};

    if (publicationYear) {
      filters.publicationDate = {
        $gte: new Date(publicationYear, 0, 1),
        $lt: new Date(publicationYear + 1, 0, 1),
      };
    }
    if (genre) {
      filters.genre = genre;
    }

    const books = await BookModel.find(filters);

    return books;
  } catch (error) {
    throw new Error('Unable to search books');
  }
};

const getBookById = async (id: string): Promise<IBook | null> => {
  try {
    const cow = await BookModel.findById(id);
    return cow;
  } catch (error) {
    throw new Error('Failed to fetch cow');
  }
};

const createBook = async (cowData: Partial<IBook>): Promise<IBook> => {
  try {
    const cow = await BookModel.create(cowData);
    return cow;
  } catch (error) {
    throw new ApiError(
      httpStatus.INTERNAL_SERVER_ERROR,
      'Failed to create cow'
    );
  }
};

const updateBook = async (
  id: string,
  cowData: Partial<IBook>
): Promise<IBook | null> => {
  try {
    const cow = await BookModel.findByIdAndUpdate(id, cowData, { new: true });
    return cow;
  } catch (error) {
    throw new Error('Failed to update cow');
  }
};

const deleteBook = async (id: string): Promise<IBook | null> => {
  try {
    const cow = await BookModel.findByIdAndDelete(id);
    return cow;
  } catch (error) {
    throw new Error('Failed to delete cow');
  }
};

export const BooksService = {
  searchBooks,
  filterBooks,
  getAllBooks,
  getBookById,
  createBook,
  updateBook,
  deleteBook,
};
