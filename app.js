const express = require('express');

const app = express();

app.use((req, res) => {
    res.json({ message: 'Votre request a été bien établit'});
});

module.exports = app;