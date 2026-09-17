import express from 'express';
import { getBookHandler, getBookByIdHandler } from './controllers/books.js';
import { getAuthorHandler, getAuthorByIdHandler, createAuthorHandler, updateAuthorHandler, deleteAuthorHandler } from './controllers/authors.js';

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

/**
 * @openapi
 * /authors:
 *   get:
 *     summary: Get all authors
 *     tags:
 *       - Authors
 *     responses:
 *       200:
 *         description: A list of authors
 *       500:
 *         description: Unable to retrieve authors
 */
router.get('/authors', getAuthorHandler);

/**
 * @openapi
 * /authors/{id}:
 *   get:
 *     summary: Get an author by ID
 *     description: Returns a single author object using its custom string ID.
 *     tags:
 *       - Authors
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         schema:
 *           type: string
 *         description: Custom author ID (e.g., "a1")
 *     responses:
 *       '200':
 *         description: Successfully retrieved author
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 id:
 *                   type: string
 *                   example: a1
 *                 name:
 *                   type: string
 *                   example: Example Author
 *                 birthYear:
 *                   type: integer
 *                   example: 1973
 *       '404':
 *         description: Author not found
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 message:
 *                   type: string
 *                   example: Author not found
 *       '500':
 *         description: Unexpected server or database error
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 message:
 *                   type: string
 *                   example: An unexpected error occured
 */
router.get('/authors/:id', getAuthorByIdHandler);

/**
 * @openapi
 * /authors:
 *   post:
 *     summary: Create an author
 *     tags:
 *       - Authors
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             required:
 *               - id
 *               - name
 *               - birthYear
 *             properties:
 *               id:
 *                 type: string
 *               name:
 *                 type: string
 *               birthYear:
 *                 type: number
 *           example:
 *             id: a4
 *             name: Example Author
 *             birthYear: 1980
 *     responses:
 *       201:
 *         description: Author created
 *       400:
 *         description: Missing required author fields or author ID already exists
 *       500:
 *         description: Unable to create author
 */
router.post('/authors', createAuthorHandler);

/**
 * @openapi
 * /authors/{id}:
 *   put:
 *     summary: Update an author by ID
 *     tags:
 *       - Authors
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         schema:
 *           type: string
 *         description: The author ID.
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             required:
 *               - name
 *               - birthYear
 *             properties:
 *               name:
 *                 type: string
 *               birthYear:
 *                 type: number
 *           example:
 *             name: Updated Author
 *             birthYear: 1981
 *     responses:
 *       200:
 *         description: Author updated
 *       400:
 *         description: Missing required author fields
 *       404:
 *         description: Author not found
 *       500:
 *         description: Unable to update author
 */
router.put('/authors/:id', updateAuthorHandler);

/**
 * @openapi
 * /authors/{id}:
 *   delete:
 *     summary: Delete an author by ID
 *     tags:
 *       - Authors
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         schema:
 *           type: string
 *         description: The author ID.
 *     responses:
 *       204:
 *         description: Author deleted
 *       404:
 *         description: Author not found
 *       409:
 *         description: Author cannot be deleted because they still have books
 *       500:
 *         description: Unable to delete author
 */
router.delete('/authors/:id', deleteAuthorHandler);

export default router;