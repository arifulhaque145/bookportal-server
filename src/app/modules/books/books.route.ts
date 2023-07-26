import express from 'express';
import validateRequest from '../../middlewares/validateRequest';
import { BooksController } from './books.controller';
import { BookValidation } from './books.validation';

const router = express.Router();

// Create a new Book
router.post(
  '/create',
  validateRequest(BookValidation.BookZodSchema),
  BooksController.createBook
);

// Get all Books with query parameters
router.get('/', BooksController.getAllBooks);

// Get all Books with search query
router.get('/search', BooksController.searchBooks);

// Get all Books with search query
router.get('/filter', BooksController.filterBooks);

// Get a Book by ID
router.get('/:id', BooksController.getBookById);

// Update a Book by ID
router.patch('/:id', BooksController.updateBook);

// Delete a Book by ID
router.delete('/:id', BooksController.deleteBook);

export const BookRouters = router;
