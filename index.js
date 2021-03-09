require('dotenv').config();
const express = require('express');
const app = express();

const spotifyApi = require('./scripts/spotifyApi');


// Set view engine to ejs
app.set('view engine', 'ejs');

// Set static folder
app.use(express.static('static'));


// Home page
app.get('/', (req, res) => {
  // Get playlists
  spotifyApi.getPlaylists((response) => {
    const playlistItems = response.data.items;
    console.log(playlistItems)
    res.render('index', {
      playlists: playlistItems,
      currentPlaylist: null,
    })
  });
})

// Detail page
app.get('/:playlistId', (req, res) => {
  console.log(req.params.playlistId);
  spotifyApi.getPlaylists((playlists) => {
    const playlistItems = playlists.data.items;
    spotifyApi.getPlaylist(req.params.playlistId, (playlist) => {
      res.render('index', {
        playlists: playlistItems,
        currentPlaylist: playlist,
      })
    })
  })
})

// Open app on port
const port = process.env.PORT || 3000;
app.listen(port);
console.log(`App listening on ${port}`);
