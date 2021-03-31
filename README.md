# Ranker
Live version: [Link](https://ancient-gorge-17717.herokuapp.com/index.html)

Ranker is a [progressive web app](https://web.dev/progressive-web-apps/) that allows you to rank the songs in your Spotify playlists, allowing you to easily create top 10/50/etc. playlists. As of right now, this demo only displays the playlists and the first 100 songs in this playlist for authorized Spotify users.


![App Screenshot](https://github.com/SjorsWijsman/progressive-web-apps-2021/blob/master/docs/screenshot.png?raw=true)

## Table of Contents
<table>
    <tr>
        <td align="center"><a href="#-features">⭐ Features<a></td>
        <td align="center"><a href="#%EF%B8%8F-installation">⚙️ Installation<a></td>
        <td align="center"><a href="#-folder-structure">📕 Folder Structure<a></td>
        <td align="center"><a href="#-performance">🌐 Performance<a></td>
        <td align="center"><a href="#-license">📃 License<a></td>
    </tr>
</table>

## ⭐ Features
- Server side rendering.
- Service worker allowing the app to be installable, cache your files and work offline.
- A list of all your public playlists.
- A detail view of your playlists containing its songs and other details.

Todo:
- A way to rank your playlists.

## ⚙️ Installation
Clone repo to local folder. With [NPM](https://www.npmjs.com/) installed, run to install dependencies:
```
npm install
```
Rename the `.env-example` to `.env` and fill in the variables inside the file:  
- `SPOTIFY_USER` is your spotify username.
- `SPOTIFY_CLIENT_ID` is the client id sent to you by the [Spotify Dashboard](https://developer.spotify.com/dashboard/login).
- `SPOTIFY_CLIENT_SECRET` is the client secret also sent to you by the Spotify Dashboard.

Then run the following command to open up a local server that updates on code change for dev purposes:
```
npm run dev
```
You should now see the `/dist/` folder appear with the files to send to the client side user. Optionally open a new terminal tab at the same folder and run the following command to make the server update the /dist folder on change:
```
npm run watch
```
Or, alternatively, Only run the following command once to build the whole app:
```
npm run start
```

## 📕 Folder Structure
![Folder Structure](https://github.com/SjorsWijsman/progressive-web-apps-2021/blob/master/docs/folder-structure.png?raw=true)  

- `/dist` contains all the files that have been built by the server that get sent to the user.  
- `/docs` contains files for the docs you're reading right now.  
- `/modules` contains JavaScript modules used in the Node Backend.  
- `/scripts` contains JavaScript scripts used in package.json for building purposes.  
- `/static` contains files served to the client side user by being built to the `/dist` folder.  
- `/views` contains all the .ejs files created to build the HTML.  

## 🌐 Performance
![Lighthouse](https://github.com/SjorsWijsman/progressive-web-apps-2021/blob/master/docs/lighthouse.png?raw=true)
Performance improvements I did:
- Server side rendering 
- Caching visited sites & core assets
- Added lazy loading to images
- Replaced images with objects
- Deferred non-critical assets
- Combined CSS & JS to single files
- Minimized CSS & JS

![Lighthouse performance](https://github.com/SjorsWijsman/progressive-web-apps-2021/blob/master/docs/lighthouse-performance.png?raw=true)

## 📃 License
MIT License
