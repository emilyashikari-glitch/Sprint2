// Simple Express server for the SOP Training Portal.
// - Serves static front-end assets out of the current directory
// - Always returns index.html at the root URL
// - Intended for local development / lightweight hosting

const express = require('express');
const path = require('path');

const app = express();

// Port the server will listen on.
// (If you later want Heroku/Render support, you can change this to: process.env.PORT || 3000)
const PORT = 3000;

// Serve all static files (HTML, JS, CSS, images) from this directory.
// This lets the browser directly load /index.html, /styles.css, /favicon.ico, etc.
app.use(express.static(__dirname));

// Explicit route for the root path.
// Even though express.static would serve index.html, this makes it crystal-clear
// that hitting "/" should always return the main application shell.
app.get('/', (req, res) => {
    res.sendFile(path.join(__dirname, 'index.html'));
});

// Start the HTTP server and log a friendly message so it’s obvious it worked.
app.listen(PORT, () => {
    console.log(`\n---------------------------------------------------`);
    console.log(`🚀 SOP Training Portal is running!`);
    console.log(`👉 Open your browser to: http://localhost:${PORT}`);
    console.log(`---------------------------------------------------\n`);
});
