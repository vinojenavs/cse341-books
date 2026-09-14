import express from 'express';
import { getBookHandler } from './controllers/books.js';
import { getBookByIdHandler } from './controllers/books.js';

const router = express.Router();

/**
 * @openapi
 * /books:
 *   get:
 *     summary: Retrieve all books
 *     description: Returns a list of all available books.
 *     tags:
 *       - Books
 *     responses:
 *       '200':
 *         description: A list of books was successfully retrieved.
 *         content:
 *           application/json:
 *             schema:
 *               type: array
 *               items:
 *                 type: object
 *                 properties:
 *                   id:
 *                     type: string
 *                     description: Unique identifier for the book
 *                   title:
 *                     type: string
 *                     description: Title of the book
 *                   author:
 *                     type: string
 *                     description: Author of the book
 *       '500':
 *         description: Server error while retrieving books
 */
router.get('/books', getBookHandler);

/**
 * @openapi
 * /books/{id}:
 *   get:
 *     summary: Retrieve a book by ID
 *     description: Returns a single book based on its unique identifier.
 *     tags:
 *       - Books
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         schema:
 *           type: string
 *         description: The unique identifier of the book
 *     responses:
 *       '200':
 *         description: Book details successfully retrieved.
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 id:
 *                   type: string
 *                   description: Unique identifier for the book
 *                 title:
 *                   type: string
 *                   description: Title of the book
 *                 author:
 *                   type: string
 *                   description: Author of the book
 *       '404':
 *         description: Book not found
 *       '500':
 *         description: Server error while retrieving the book
 */
router.get('/books/:id', getBookByIdHandler);

export default router;