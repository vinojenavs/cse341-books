import { getAllBooks, getBookById, createBook, updateBook, deleteBook } from "../models/books.js";
import { getAuthorById } from "../models/authors.js";

const getBookHandler = async (req, res) => {
    try {
        const books = await getAllBooks();
        return res.status(200).json(books);
    } catch (error) {
        console.error('GET /books failed:', error.message);
        return res.status(500).json({ message: 'Internal server error'});
    }
};

const getBookByIdHandler = async (req, res) => {
    const bookId = req.params.id;
    try {
        const book = await getBookById(bookId);
        if (!book) {
            return res.status(404).json({ message: 'Book not found' })
        }
        return res.status(200).json(book);
    } catch (error) {
        console.error('GET /books/:id failed', error.message);
        return res.status(500).json({ message: 'Internal server error' });
    }
};

const createBookHandler = async (req, res) => {
    try {
        const { id, authorId, title, publicationDate } = req.body;
        if (!id || !authorId || !title || !publicationDate) {
            return res.status(400).json({message: 'Missing id, author id, title or publication date'})
        }
        const existingBook = await getBookById(id);
        if (existingBook) {
            return res.status(400).json({message: 'A book with this id already exists'});
        }
        const existingAuthor = await getAuthorById(authorId);
        if (!existingAuthor) {
            return res.status(400).json({message: 'Invalid author id'});
        }
        const book = await createBook({ id, authorId, title, publicationDate });
        return res.status(201).json(book);
    } catch (error) {
        console.error('POST /books failed', error.message);
        return res.status(500).json({ message: 'Unable to create book' });
    }
};

const updateBookHandler = async (req, res) => {
    try {
        const { id } = req.params;
        const { authorId, title, publicationDate } = req.body;
        const existingBook = await getBookById(id)
        if (!existingBook){
            return res.status(404).json({message: 'Book not found'});
        }

        if (!title || !authorId || !publicationDate) {
            return res.status(400).json({message: 'Missing author id, title or publication date'});
        }
        
        const existingAuthor = await getAuthorById(authorId);
        if (!existingAuthor) {
            return res.status(400).json({message: 'Invalid author id'});
        }
        const updatedBook = await updateBook(id, { authorId, title, publicationDate });
        return res.status(200).json(updatedBook);
    } catch (error) {
        console.error('PUT /books failed', error.message);
        return res.status(500).json({ message: 'Unable to update book' });
    }
};

const deleteBookHandler = async (req, res) => {
    try {
        const id = req.params.id;
        const existingBook = await getBookById(id);
        if (!existingBook) {
            return res.status(404).json({message: 'Book not found'});
        }
        await deleteBook(id);
        return res.status(204).json({}); 
    } catch (error) {
        console.error('DELETE /books/:id failed', error.message);
        return res.status(500).json({message: 'Unable to delete book'});
    }
    
}

export { getBookHandler, getBookByIdHandler, createBookHandler, updateBookHandler, deleteBookHandler };