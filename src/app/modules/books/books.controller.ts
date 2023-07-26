import { Request, Response } from 'express';
import httpStatus from 'http-status';
import sendResponse from '../../../shared/sendResponse';
import { IBook } from './books.interface';
import { BooksService } from './books.service';

const getAllBooks = async (req: Request, res: Response) => {
  try {
    const result = await BooksService.getAllBooks();

    sendResponse<IBook>(res, {
      statusCode: httpStatus.CREATED,
      success: true,
      message: 'Books are found successfully!',
      data: result,
    });
  } catch (error) {
    sendResponse<IBook>(res, {
      statusCode: httpStatus.INTERNAL_SERVER_ERROR,
      success: false,
      message: 'Failed to find books',
    });
  }
};

const searchBooks = async (req: Request, res: Response) => {
  try {
    const query = req.query;
    const result = await BooksService.searchBooks(query);

    if (result.length) {
      sendResponse<IBook>(res, {
        statusCode: httpStatus.CREATED,
        success: true,
        message: 'Books are found successfully!',
        data: result,
      });
    }
  } catch (error) {
    sendResponse<IBook>(res, {
      statusCode: httpStatus.INTERNAL_SERVER_ERROR,
      success: false,
      message: 'Failed to find book',
    });
  }
};

const filterBooks = async (req: Request, res: Response) => {
  try {
    const query = req.query;
    const result = await BooksService.filterBooks(query);

    if (result.length) {
      sendResponse<IBook>(res, {
        statusCode: httpStatus.CREATED,
        success: true,
        message: 'Books are found successfully!',
        data: result,
      });
    }
  } catch (error) {
    sendResponse<IBook>(res, {
      statusCode: httpStatus.INTERNAL_SERVER_ERROR,
      success: false,
      message: 'Failed to find book',
    });
  }
};

const createBook = async (req: Request, res: Response) => {
  try {
    const newBook: IBook = req.body;
    const result = await BooksService.createBook(newBook);

    sendResponse<IBook>(res, {
      statusCode: httpStatus.CREATED,
      success: true,
      message: 'User created successfully!',
      data: result,
    });
  } catch (error) {
    sendResponse<IBook>(res, {
      statusCode: httpStatus.INTERNAL_SERVER_ERROR,
      success: false,
      message: 'Failed to create a book',
    });
  }
};

const getBookById = async (req: Request, res: Response) => {
  try {
    const BookId = req.params.id;
    const result = await BooksService.getBookById(BookId);
    if (result) {
      sendResponse<IBook>(res, {
        statusCode: httpStatus.OK,
        success: true,
        message: 'Book retrieved successfully',
        data: result,
      });
    } else {
      sendResponse<IBook>(res, {
        statusCode: httpStatus.NOT_FOUND,
        success: false,
        message: 'Book not found',
      });
    }
  } catch (error) {
    sendResponse<IBook>(res, {
      statusCode: httpStatus.INTERNAL_SERVER_ERROR,
      success: false,
      message: 'Failed to retrieve the book',
    });
  }
};

const updateBook = async (req: Request, res: Response) => {
  try {
    const BookId = req.params.id;
    const updatedBook: IBook = req.body;
    const result = await BooksService.updateBook(BookId, updatedBook);
    if (result) {
      sendResponse<IBook>(res, {
        statusCode: httpStatus.OK,
        success: true,
        message: 'Book updated successfully',
        data: result,
      });
    } else {
      sendResponse<IBook>(res, {
        statusCode: httpStatus.NOT_FOUND,
        success: false,
        message: 'Book not foundy',
      });
    }
  } catch (error) {
    sendResponse<IBook>(res, {
      statusCode: httpStatus.INTERNAL_SERVER_ERROR,
      success: false,
      message: 'Failed to update the Book',
    });
  }
};

const deleteBook = async (req: Request, res: Response) => {
  try {
    const BookId = req.params.id;
    const result = await BooksService.deleteBook(BookId);
    if (result) {
      sendResponse<IBook>(res, {
        statusCode: httpStatus.OK,
        success: true,
        message: 'Book deleted successfully',
        data: result,
      });
    } else {
      sendResponse<IBook>(res, {
        statusCode: httpStatus.NOT_FOUND,
        success: false,
        message: 'Book not found',
      });
    }
  } catch (error) {
    sendResponse<IBook>(res, {
      statusCode: httpStatus.INTERNAL_SERVER_ERROR,
      success: false,
      message: 'Failed to delete the Book',
    });
  }
};

export const BooksController = {
  createBook,
  searchBooks,
  filterBooks,
  getAllBooks,
  getBookById,
  updateBook,
  deleteBook,
};
