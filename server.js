const express = require('express');
const path = require('path');
const app = express();
const PORT = 3000;

// Serve static files (like your index.html) from the current directory
app.use(express.static(__dirname));

// Specific route to serve index.html for the root URL
app.get('/', (req, res) => {
    res.sendFile(path.join(__dirname, 'index.html'));
});

app.listen(PORT, () => {
    console.log(`\n---------------------------------------------------`);
    console.log(`🚀 SOP Training Portal is running!`);
    console.log(`👉 Open your browser to: http://localhost:${PORT}`);
    console.log(`---------------------------------------------------\n`);
});