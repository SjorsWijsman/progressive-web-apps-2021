require('dotenv').config();
const { displayPlaylists } = require('./modules/render');
const express = require('express');
const app = express();


// Set view engine to ejs
app.set('view engine', 'ejs');

// Set static folder
app.use(express.static('static'));

// Home page
app.get(['/', '/:playlistId'], (req, res) => displayPlaylists(req, res));


// Open app on port
const port = process.env.PORT || 3000;
app.listen(port);
console.log(`App listening on ${port}`);
