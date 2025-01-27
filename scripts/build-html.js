const ejs = require('ejs');
const fs = require('fs');
const fsPromises = fs.promises;
const path = require('path');

const { getPlaylist, getPlaylistList } = require('../modules/spotifyApi');


generateIndex()

function generateIndex() {
  // Get playlists
  getPlaylistList((playlists) => {

    // Generate html for index
    render("", {
      playlists: playlists.items,
      currentPlaylist: null,
    })

    // Generate html for every playlist
    playlists.items.forEach((item, i) => {
      getPlaylist(item.id, (playlist) => {
        render(item.id, {
          playlists: playlists.items,
          currentPlaylist: playlist,
        })
      })
    });
  })
}


function render(id, data) {
  const html = renderTemplate('./views/index.ejs', data)
  writeFile(`./dist/${id}`, 'index.html', html)
}


function renderTemplate(templatePath, data) {
  const template = fs.readFileSync(templatePath, 'utf8').toString();
  return ejs.render(template, data, { views: [path.join(__dirname, '../', 'views')] })
}


function writeFile(fileDirectory, filename, fileContents) {
  return fsPromises.mkdir(fileDirectory, { recursive: true }).then(() => {
    return fsPromises.writeFile(path.join(fileDirectory, filename), fileContents)
  })
}
