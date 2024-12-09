
require('dotenv').config()
const express = require('express');
const morgan = require('morgan');
const methodOverride = require('method-override')
const books = require('./data/books');
const app = express();
const path = require('path');
const Book = require('./models/books');
const mongoose = require('mongoose');
// ==================
// CONFIGURE MONGOOSE
// ==================
// getting-started.js
require('./configs/database');



// ********************
//    MIDDLEWARE
// ********************

app.use(morgan('dev'));
app.use(express.urlencoded({ extended: false }))
app.use(express.json())
app.use(methodOverride('_method'))

// Set EJS as the view engine
app.set('view engine', 'ejs');
app.set('views', './views');
app.use(express.static(path.join(__dirname, 'public')))

// ***************************
//      ROUTES (I.N.D.U.C.E)
// ***************************

//Seed route
app.use('/', require('./routes/seed'));
// Index
app.get('/', (req, res) => {git 
    res.render('home')
});
//Home Route
app.use('/', require('./routes/home'));
// Index
app.get('/books', (req, res) => {
    res.render('books', { title: "Book List", books })
})

// New
app.get('/books/new', (req, res) => {
    // create a new item
    res.render('books/new', { title: 'New Book' })
});

app.post('/seed', async (req, res) => {
    try {
        await Book.insertMany(books);
        res.status(201).send('Books seeded successfully')
    } catch (error) {
        console.error(error.message)
        res.status(404).send('Error seeding books')
    }
})
// POST
app.post('/books', (req, res) => {
    const newBook = {
        id: books.length + 1,
        title: req.body.title || "new book",
        author: req.body.author || "new author"
    }
    books.push(newBook);
    res.status(201).redirect('/books')
})


// SHOW
app.get('/books/:id', (req, res) => {
    const book = books.find(book => book.id === parseInt(req.params.id));
    if (book) {
        res.render('books/show', { title: 'Book Details', book })
    } else {
        res.status(404).render('404/notFound', { title: "Book not found" })
    }
})

app.get('/books/:id/edit', (req, res) => {
    const book = books.find(book => book.id === parseInt(req.params.id));
    if (book) {
        res.render('books/edit', { title: 'Edit Book', book });
    } else {
        res.status(404).render('404/notFound', { title: 'Book Not Found!' })
    }
})
// EDIT
// / Update - Update a book
app.put('/books/:id', (req, res) => {
    const bookId = parseInt(req.params.id);
    const bookIndex = books.findIndex(book => book.id === bookId);
    if (bookIndex !== -1) {
        books[bookIndex] = { ...books[bookIndex], ...req.body };
        res.status(200).redirect(`/books`);
        // res.render('bookUpdated', { title: 'Book Updated', book: books[bookIndex] });
    } else {
        res.status(404).render('404/notFound', { title: 'Book Not Found' });
    }
});

// DELETE
app.delete('/books/:id', (req, res) => {
    const bookId = parseInt(req.params.id);
    const bookIndex = books.findIndex(book => book.id === bookId);
    if (bookIndex !== -1) {
        books.splice(bookIndex, 1);
    } else {
        res.status(404).render('404/notFound', { title: 'Book Not Found' });
    }
    res.redirect('/books');
});

// ********************
//    LISTENNER
// ********************

const PORT = 3000;
app.listen(PORT, () => {
    console.log(`🎧 Server is running on http://localhost:${PORT}`);
})