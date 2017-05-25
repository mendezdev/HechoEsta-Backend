const express = require('express');
const path = require('path');
const bodyParser = require('body-parser');
const cors = require('cors');
const passport = require('passport');
const mongoose = require('mongoose');
const config = require('./config/database');

// ------- Requiring ROUTES Begin -------
const usersRoutes = require('./routes/user');
const foldersRoutes = require('./routes/folder');
const salesRoutes = require('./routes/sale');
// ------- Requiring ROUTES End -------

// Connect to database
mongoose.connect(config.database);

// ON connected mongodb
mongoose.connection.on('connected', () => {
    console.log('Connected to database ' + config.database);
});

// ON error mongodb
mongoose.connection.on('error', (err) => {
    console.log('Connected error: ' + err);
});

// app with express 
const app = express();

// Port
const port = process.env.PORT || 8080;

// CORS middleware 
app.use(cors());

// Set static folder
app.use(express.static(path.join(__dirname, 'public')));

// Body Parser middleware
app.use(bodyParser.json());

// Passport middleware
app.use(passport.initialize());
app.use(passport.session());

// Passport strategy
require('./config/passport')(passport);

// Routes for users
app.use('/users', usersRoutes);

// Routes for folders
app.use('/folders', foldersRoutes);

// Routes for sales
app.use('/sales', salesRoutes);

// Route: "/"
app.get('/', (req, res) => {
    res.send("INVALID ENDPOINT");
});

//
app.get('*', (req, res) => {
    res.sendfile(path.join(__dirname,'public/index.html'));
});

// Server listening
app.listen(port, (req, res) => {
    console.log('Server started on port: ' + port);
});