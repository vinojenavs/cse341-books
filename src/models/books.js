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

const createBook = async (book) => {
    const db = getDb();
    await db.collection('books').insertOne(book);
    return book;
};

const updateBook = async (id, book) => {
    const db = getDb();
    await db.collection('books').updateOne({ id }, { $set: book });
    return { id, ...book };
};

const deleteBook = async (id) => {
    const db = getDb();
    const result = await db.collection('books').deleteOne({ id });
    return result;
};

export { getAllBooks, getBookById, createBook, updateBook, deleteBook };