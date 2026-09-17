import { getDb } from "../db/connect.js";

const getAllAuthors = async () => {
    const db = await getDb();
    const authors = db.collection('authors').find({}).toArray();
    return authors;
};

const getAuthorById = async (authorId) => {
    const db = await getDb();
    const author = db.collection('authors').findOne({ id: authorId });
    return author;
};

const createAuthor = async (author) => {
    const db = getDb();
    await db.collection('authors').insertOne(author);
    return author;
};

const updateAuthor = async (id, author) => {
    const db = getDb();
    await db.collection('authors').updateOne({ id }, { $set: author });
    return { id, ...author };
};

const deleteAuthor = async (id) => {
    const db = getDb();
    const result = await db.collection('authors').deleteOne({ id });
    return result;
};

const authorHasBooks = async (id) => {
  const db = getDb();
  const collection = db.collection('books');
  const count = await collection.countDocuments({ authorId: id });

  return count > 0;
};

export { getAllAuthors, getAuthorById, createAuthor, updateAuthor, deleteAuthor, authorHasBooks };