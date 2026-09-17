# Books API Week 02 Spec - Version 1

## Feature 1: Book CRUD Operations and Author References

### Goal
Update the existing Week 01 book API so book documents include a reference to an author and the API supports all CRUD operations for books. Every book route must be documented and testable in Swagger.

### Data Model
MongoDB database: cse341-books-db
MongoDB collection: books

Required book fields:
- `id`: string, required, custom id such as `b1`
- `authorId`: string, required, references the `id` field of an author document
- `title`: string, required
- `publicationDate`: ISO 8601 date formt, required

Books will continue to use custom string ids instead of MongoDB `_id` values for route parameters.

### Relationship to Authors
Each book will identify its author with an `authorId` field. The value of `authorId` must match the custom `id` value of an existing author document.

When creating or updating a book, the API should reject the request with a `400` status code if the submitted `authorId` does not match an existing author.

### Routes

#### GET /books
Purpose: Return all books.

Success:
- Status code: `200`
- Response body: an array of book objects

Errors:
- `500` if an unexpected server or database error occurs ("message": "An unexpected error occured")(console.error('GET /books failed'), error.message)

#### GET /books/:id
Purpose: Return one book by its custom id.

Success:
- Status code: `200`
- Response body: the matching book object

Errors:
- `404` if no book exists with that id("message": "Book not found")
- `500` if an unexpected server or database error occurs ("message": "An unexpected error occured")(console.error('GET /books/:id failed', error.message))

#### POST /books
Purpose: Create a new book.

Request body:

    {
      "id": "b4",
      "authorId": "a1",
      "title": "Example Book Title",
      "publicationDate": "2026-01-15"
    }

Success:
- Status code: `201`
- Response body: the newly created book object

Errors:
- `400` if a required field is missing ("message": "Missing id, authorId, title or name")
- `400` if the `id` already exists ("message": "A book with this id already exists")
- `400` if the `authorId` does not match an existing author ("message": "Invalid author id")
- `500` if an unexpected server or database error occurs ("message": "An unexpected error occured")(console.error('POST /books failed', error.message))

#### PUT /books/:id
Purpose: Update an existing book.

Request body:

    {
      "authorId": "a2",
      "title": "Updated Book Title",
      "publicationDate": "2026-02-20"
    }

Success:
- Status code: `200`
- Response body: the updated book object

Errors:
- `400` if a required field is missing ("message": "Missing id, authorId, title or name")
- `400` if the `authorId` does not match an existing author ("message": "Invalid author id")
- `404` if no book exists with that id ("message": "Book not found")
- `500` if an unexpected server or database error occurs ("message": "An unexpected error occured")(console.error('PUT /books/:id failed', error.message))

#### DELETE /books/:id
Purpose: Delete an existing book.

Success:
- Status code: `204`
- Response body: none

Errors:
- `404` if no book exists with that id ("message": "Book not found")
- `500` if an unexpected server or database error occurs ("message": "An unexpected error occured")(console.error('DELETE /books/:id failed', error.message))

### Swagger Documentation
Swagger must document every book route.

### Deployment Expectations
After implementation, the book routes must work locally and from the deployed Render application. The deployed Swagger page at `/api-docs` must allow someone to test every book route from the browser.

## Feature 2: Author CRUD Operations

TODO: Follow the example above to complete a spec for the authors feature.

### Goal 
Add an author collection that takes in author information and API supports all CRUD operations. Author route must be documented and estable in swagger.

### Data Model
MongoDB database: cse341-books-db
MongoDB collection: authors.

Required author fields: 
- `id`: string, required, custom id like `a1`
- `name`: string, required
- `birthYear`: integer, required

Author will use custom string ids instead of MongoDB `_id` value for route parameter

### Routes 

#### GET /authors
Purpose: Return all authors.

Success: 
- Status code: `200`
- Response body: An array of author objects

Errors:
- `500` if an unexpected server or databse error occurs ("message": "An unexpected error occured")(console.error('GET /authors failed', error.message))

#### GET /authors/:id
Purpose: Return a single author with custom id

Success: 
- Status code: `200`
- Response body: the matching author object

Errors: 
- `404` if no author exists with that id ("message": "Author not found")
- `500` if an unexpected server or database error occurs ("message": "An unexpected error occured")(console.error('GET /authors/:id failed', error.message))

#### POST /authors
Purpose: Create a new author.

Request body: 
{
    "id": "a2",
    "name": "Example name",
    "birthYear": 1973
}

Success: 
- Status code: `201`
- Response body: the newly created author object

Error: 
- `400` if required field is missing ("message": "Missing id, name or birth year")
- `400` if the `id` already exists ("message": "An author with this id already exists")
- `500` if an unexpected server or database error occurs ("message": "An unexpected error occured")(console.error('POST /authors failed', error.message))

#### PUT /authors/:id
Purpose: Update an existing author

Request body: 
{
    "name": "Updated name",
    "birthYear": 1973
}

Success:
- Status code: `200`
- Response body: the updated author object

Errors:
- `400` if a required field is missing ("message": "Missing name or birth year")
- `500` if an unexpected server or database error occurs ("message": "An unexpected error occured")(console.error('PUT /authors/:id failed', error.message))

#### DELETE /authors/:id
Purpose: Erase an existing author

Success:
- Status code: `204`
- Response body: none

Errors: 
- `404` if no author exists with that id ("message": "Author not found")
- `409` if a book object is linked to the author id ("message": "Cannot delete author: books are linked")
- `500` if an unexpected server or database error occurs ("message": "An unexpected error occured")(console.error('DELETE /author/:id failed', error.message))

### Swagger Documentation
Swagger must document every author route.

### Deployment Expectations
After implementation, the author routes must work locally and from the deployed Render application. The deployed Swagger page at `/api-docs` must allow someone to test every author route from the browser.

