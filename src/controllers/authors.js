import { getAllAuthors, getAuthorById, createAuthor, updateAuthor, deleteAuthor, authorHasBooks } from "../models/authors.js";

const getAuthorHandler = async (req, res) => {
    try {
        const authors = await getAllAuthors();
        return res.status(200).json(authors);
    } catch (error) {
        console.error('GET /authors failed', error.message);
        return res.status(500).json({message: 'Internal database error'});
    } 
};

const getAuthorByIdHandler = async (req, res) => {
    try {
        const authorId = req.params.id;
        const author = await getAuthorById(authorId);
        if(!author) {
            return res.status(404).json({message: 'author not found'});
        }
        return res.status(200).json(author);
    } catch (error) {
        console.error('GET /authors/:id failed', error.message);
        return res.status(500).json({message: 'Internal database error'});
    } 
};

const createAuthorHandler = async (req, res) => {
    try {
        const { id, name, birthYear } = req.body;
        if(!id || !name || birthYear === undefined) {
            return res.status(400).json({message: 'Missing is, name or birth year'});
        }
        const existingAuthor = await getAuthorById(id);
        if(existingAuthor) {
            return res.status(400).json({message: 'An author with this id already exists'});
        }
        const createdAuthor = createAuthor({ id, name, birthYear });
        return res.status(201).json(createdAuthor);
    } catch (error) {
        console.error('POST /authors failed', error.message);
        return res.status(500).json({message: 'Internal database error'});
    }
};

const updateAuthorHandler = async (req, res) => {
  try {
    const { id } = req.params;
    const { name, birthYear } = req.body;

    if (!name || birthYear === undefined) {
      return res.status(400).json({ message: 'Missing required author fields.' });
    }

    const existingAuthor = await getAuthorById(id);
    if (!existingAuthor) {
      return res.status(404).json({ message: 'Author not found.' });
    }

    const updatedAuthor = await updateAuthor(id, { name, birthYear });
    return res.status(200).json(updatedAuthor);
  } catch (error) {
    return res.status(500).json({ message: 'Unable to update author.' });
  }
};

const deleteAuthorHandler = async (req, res) => {
  try {
    const { id } = req.params;

    const existingAuthor = await getAuthorById(id);
    if (!existingAuthor) {
      return res.status(404).json({ message: 'Author not found.' });
    }

    if (await authorHasBooks(id)) {
      return res.status(409).json({ message: 'Author cannot be deleted because they still have books.' });
    }

    await deleteAuthor(id);
    return res.status(204).send();
  } catch (error) {
    return res.status(500).json({ message: 'Unable to delete author.' });
  }
};

export { getAuthorHandler, getAuthorByIdHandler, createAuthorHandler, updateAuthorHandler, deleteAuthorHandler }

