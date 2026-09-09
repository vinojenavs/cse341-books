import { getDb } from "../db/connect.js";

const getAllBooks = async () => {
    const db = await getDb();
    const books = db.collection('books').find({}).toArray();
    return books;
};

const getBookById = async (bookId) => {
    const db = await getDb();
    const book = db.collection('books').findOne({ id: bookId });
    return book;
};

export { getAllBooks, getBookById };