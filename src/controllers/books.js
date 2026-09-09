import { getAllBooks } from "../models/books.js";
import { getBookById } from "../models/books.js";

const getBookHandler = async (req, res) => {
    try {
        const books = await getAllBooks();
        res.status(200).json(books);
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
        res.status(200).json(book);
    } catch (error) {
        console.error('GET /books/:id failed', error.message);
        return res.status(500).json({ message: 'Internal server error' })
    }
}

export { getBookHandler, getBookByIdHandler };