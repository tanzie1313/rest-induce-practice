
// const books = require('../data/books');
const Book = require('../models/book');
//fetch all data
async function index(req, res) {

    try {
        const books = await Book.find({})
        res.render('books', { title: "Book List", books})
    } catch (error) {
        console.error(error.message)
        res.status(500).send('Error fetching books')
    }
    
}

//form
function newBook(req, res) {
    res.render('books/new', { title: 'New Book' })
}

 async function postBook(req, res) {
    try {
        const {title = "new book", author = "new author"} = req.body;

        const newBook = new Book({
            title: title,
            author: author 
        })
        await newBook.save();
        
        res.status(201).redirect('/books')

    } catch (error) {
        console.error(error.message)
        res.status(500).send('internal server error')
    }

}

 async function showBook(req, res) {
    try {
    const book = await Book.findById(req.params.id);
    if (book) {
        res.render('books/show', { title: 'Book Details', book })
    } else {
        res.status(404).render('404/notFound', { title: "Book not found" })
    }
}catch (error) {
    console.error(error.message)
    res.status(500).send('Server Internal error')
}
}


async function editBook(req, res) {
    try { const book = await Book.findById(req.params.id);
        if (book) {
            res.render('books/edit', { title: 'Edit Book', book });
        } else {
            res.status(404).render('404/notFound', { title: 'Book Not Found!' })
        }

    } catch (error) {
        console.error(error.message)
        res.status(500).send('Server Internal error')

    }
    
}

async function updateBook(req, res) {
    try {
        const bookId = parseInt(req.params.id);
        const { id } = req.params;

        const updatedBook = await Book.findByIdAndUpdate(id, req.body)
        if (updatedBook) {
            res.status(200).redirect(`/books`);
            // res.render('bookUpdated', { title: 'Book Updated', book: books[bookIndex] });
        } else {
            res.status(404).render('404/notFound', { title: 'Book Not Found' });
        }
    } catch (error) {
        console.error(error.message)
        res.status(500).send('Internal Server Error')
    }

}

async function deleteBook(req, res) {
    try {
        const { id } = req.params;
        const bookId = parseInt(req.params.id);
        const deletedBook = await Book.findByIdAndDelete(id)
        if (deletedBook) {
           res.status(200).redirect('/books');
        } else {
            res.status(404).render('404/notFound', { title: 'Book Not Found' });
        }
    } catch (error) {
        console.error(error.message)
        res.status(500).send('Internal Server Error')
    }
}

module.exports = { index, newBook, postBook, editBook, updateBook, showBook, deleteBook }


// // Index
// app.get('/books', (req, res) => {
//     res.render('books', { title: "Book List", books })
// })

// // New
// app.get('/books/new', (req, res) => {
//     // create a new item
//     res.render('books/new', { title: 'New Book' })
// });

// app.post('/seed', async (req, res) => {
//     try {
//         await Book.insertMany(books);
//         res.status(201).send('Books seeded successfully')
//     } catch (error) {
//         console.error(error.message)
//         res.status(404).send('Error seeding books')
//     }
// })
// // POST
// app.post('/books', (req, res) => {
//     const newBook = {
//         id: books.length + 1,
//         title: req.body.title || "new book",
//         author: req.body.author || "new author"
//     }
//     books.push(newBook);
//     res.status(201).redirect('/books')
// })


// // SHOW
// app.get('/books/:id', (req, res) => {
//     const book = books.find(book => book.id === parseInt(req.params.id));
//     if (book) {
//         res.render('books/show', { title: 'Book Details', book })
//     } else {
//         res.status(404).render('404/notFound', { title: "Book not found" })
//     }
// })

// app.get('/books/:id/edit', (req, res) => {
//     const book = books.find(book => book.id === parseInt(req.params.id));
//     if (book) {
//         res.render('books/edit', { title: 'Edit Book', book });
//     } else {
//         res.status(404).render('404/notFound', { title: 'Book Not Found!' })
//     }
// })
// // EDIT
// // / Update - Update a book
// app.put('/books/:id', (req, res) => {
//     const bookId = parseInt(req.params.id);
//     const bookIndex = books.findIndex(book => book.id === bookId);
//     if (bookIndex !== -1) {
//         books[bookIndex] = { ...books[bookIndex], ...req.body };
//         res.status(200).redirect(`/books`);
//         // res.render('bookUpdated', { title: 'Book Updated', book: books[bookIndex] });
//     } else {
//         res.status(404).render('404/notFound', { title: 'Book Not Found' });
//     }
// });

// // DELETE
// app.delete('/books/:id', (req, res) => {
//     const bookId = parseInt(req.params.id);
//     const bookIndex = books.findIndex(book => book.id === bookId);
//     if (bookIndex !== -1) {
//         books.splice(bookIndex, 1);
//     } else {
//         res.status(404).render('404/notFound', { title: 'Book Not Found' });
//     }
//     res.redirect('/books');
// });