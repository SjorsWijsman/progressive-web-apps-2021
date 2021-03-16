const axios = require('axios');
require('dotenv').config();

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
    console.error(error);
    return null;
  })
}


// Get data
function getData(callback, params) {
  axios(params)
    .then(response => {
      return callback(response.data);
    })
    .catch((error) => {
      // gist from: https://gist.github.com/fgilio/230ccd514e9381fafa51608fcf137253
      if (error.response) {
        /*
         * The request was made and the server responded with a
         * status code that falls out of the range of 2xx
         */
        console.log(error.response.data);
        console.log(error.response.status);
        console.log(error.response.headers);
      } else if (error.request) {
        /*
         * The request was made but no response was received, `error.request`
         * is an instance of XMLHttpRequest in the browser and an instance
         * of http.ClientRequest in Node.js
         */
        console.log(error.request);
      } else {
        // Something happened in setting up the request and triggered an Error
        console.log('Error', error.message);
      }
      console.log(error.config);
    });
}


// Get playlists
exports.getPlaylistList = (callback) => {
  getAccessToken((accessToken) => {
    getData(callback, {
      url: `https://api.spotify.com/v1/users/${user}/playlists`,
      method: 'get',
      headers: {
        'Authorization': `Bearer ${accessToken}`,
      },
    })
  });
}


// Get playlist info & tracks
exports.getPlaylist = (id, callback) => {
  getAccessToken((accessToken) => {
    getData(callback, {
      url: `https://api.spotify.com/v1/playlists/${id}`,
      method: 'get',
      headers: {
        'Authorization': `Bearer ${accessToken}`,
      },
    })
  });
}
