const { getPlaylist, getPlaylistList } = require('./spotifyApi');

// Retrieves & renders playlist list & details according to playlistId params
exports.displayPlaylists = (req, res) => {
  getPlaylistList((playlists) => {
    if (req.params.playlistId) {
      console.log("playlistid found " + req.params.playlistId)
      getPlaylist(req.params.playlistId, (playlist) => {
        render(res, playlists.items, playlist)
      })
    } else {
      render(res, playlists.items, null)
    }
  })
}

// Render playlists & playlist details
function render(res, playlistItems, playlist) {
  res.render('index', {
    playlists: playlistItems,
    currentPlaylist: playlist,
  })
}
