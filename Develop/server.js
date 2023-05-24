const express = require('express');
const path = require('path');
const fs = require('fs');
const app = express();
const PORT = 3001;
const notes = require('./db/db.json');

app.use(express.json());
app.use(express.urlencoded({ extended: true }));


app.use(express.static('public'));


app.get('/', (req, res) => {
    res.sendFile(path.join(__dirname, './public/index.html'));
  });

  // get /notes notes.html
app.get('/notes', (req, res) => {
    res.sendFile(path.join(__dirname, './public/notes.html'));

});

// get api/notes db.json
app.get('/api/notes', (req, res) => res.json(notes));



// post api/notes db.json
app.post('/api/notes', (req, res) => {
  // Let the client know that their POST request was received
  res.json(`${req.method} request received`);
  console.info(`${req.method} request received`);
});

// bonus: delete api/notes db.json id property db.json




// get * index.html
app.get('/*', (req, res) => {
  res.sendFile(path.join(__dirname, './public/index.html'));
});

app.listen(PORT, () => {
  console.log(`Example app listening at http://localhost:${PORT}`);
});