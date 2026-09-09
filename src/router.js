import express from 'express';
import { getBookHandler } from './controllers/books.js';

const router = express.Router();

router.get('/books', getBookHandler)

export default router;