const express = require('express');
const app = express();

// Set view engine to ejs
app.set('view engine', 'ejs');

// Home page
app.get('/', function(req, res) {
    res.render('pages/index');
});

// Open app on port
const port = process.env.PORT || 3000;
app.listen(port);
console.log(`App listening on ${port}`);
