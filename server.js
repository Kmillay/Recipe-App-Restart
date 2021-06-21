// Install Express Server
const express = require('express');
const path = require('path');
const app = express();
// Server only are stactic files from the dist directory
app.use(express.static('./dist/Recipe-App-Restart'));
app.get('/*', (req, res) =>
res.sendFile('index.html', {root: 'dist/Recipe-App-Restart'}),
);
// Tell the app how to start on Heroku
app.listen(process.env.PORT || 8080);
