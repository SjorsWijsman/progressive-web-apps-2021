const express = require('express');
const app = express();
const fs = require('fs');

// Set view engine to ejs
app.set('view engine', 'ejs');

// Set static folder
app.use(express.static(__dirname + '/dist'));


// Open app on port
const port = process.env.PORT || 5000;
app.listen(port);
console.log(`App listening on ${port}`);
