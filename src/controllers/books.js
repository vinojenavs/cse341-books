import { getAllBooks } from "../models/books.js";

const getBookHandler = async (req, res) => {
    try {
        const books = await getAllBooks();
        res.status(200).json(books);
    } catch {
        console.error('GET /books failed:', error.message);
        return res.status(500).json({ message: 'Internal server error'});
    }
};

export { getBookHandler };