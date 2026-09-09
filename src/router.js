import express from 'express';
import { getBookHandler } from './controllers/books.js';
import { getBookByIdHandler } from './controllers/books.js';

const router = express.Router();

router.get('/books', getBookHandler);
router.get('/books/:id', getBookByIdHandler);

export default router;