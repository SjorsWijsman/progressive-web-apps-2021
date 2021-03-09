const axios = require('axios');
const user = process.env.SPOTIFY_USER;
const clientId = process.env.SPOTIFY_CLIENT_ID;
const clientSecret = process.env.SPOTIFY_CLIENT_SECRET;

// Get Access Token
function getAccessToken(callback) {
  // much love to https://github.com/spotify/web-api/issues/321#issuecomment-321134744
  axios({
    url: 'https://accounts.spotify.com/api/token',
    method: 'post',
    params: {
      grant_type: 'client_credentials',
    },
    headers: {
      'Accept':'application/json',
      'Content-Type': 'application/x-www-form-urlencoded',
    },
    auth: {
      username: clientId,
      password: clientSecret,
    }
  })
  .then(response => {
    return callback(response.data.access_token);
  })
  .catch(error => {
    console.error('error');
    return null;
  })
}



// Get playlists
exports.getPlaylists = (callback) => {
  getAccessToken((accessToken) => {
    axios({
      url: `https://api.spotify.com/v1/users/${user}/playlists`,
      method: 'get',
      headers: {
        'Authorization': `Bearer ${accessToken}`,
      },
    })
    .then(response => {
      return callback(response);
    })
    .catch(error => {
      console.error('error 2');
      return null;
    })
  })
}



// Get playlist
exports.getPlaylist = (id, callback) => {
  getAccessToken((accessToken) => {
    axios({
      url: `https://api.spotify.com/v1/playlists/${id}`,
      method: 'get',
      headers: {
        'Authorization': `Bearer ${accessToken}`,
      },
    })
    .then(response => {
      console.log(response.data.tracks.items)
      return callback(response.data);
    })
    .catch(error => {
      console.error('error 3');
      return null;
    })
  })
}
