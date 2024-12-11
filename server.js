
require('dotenv').config()
const express = require('express');
const morgan = require('morgan');
const methodOverride = require('method-override')
const books = require('./data/books');
const app = express();
const path = require('path');
const Book = require('./models/book');
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
app.use(express.urlencoded({ extended: true }))
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

//Home Route
app.use('/', require('./routes/home'));

// Books
app.use('/', require('./routes/book'));

// ********************
//    LISTENNER
// ********************


app.listen(process.env.PORT, () => {
    console.log(`🎧 Server is running on http://localhost:${process.env.PORT}`);
})