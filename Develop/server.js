const express = require('express');
const path = require('path');
const fs = require('fs');
const app = express();
const PORT = 3001;
const notes = require('./db/db.json');
const uuid = require('./helpers/uuid');

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
app.get('/api/notes', (req, res) => {
  res.status(200).json(notes);
});



// post api/notes db.json
app.post('/api/notes', (req, res) => {

  // ---------------------------------------------------------------

    const { title, text } = req.body;
  
    if (title && text ) {

      const newNote = {
        title,
        text,
        note_id,
      };
  
      // ----------------------
  

      fs.readFile('./db/db.json', (err, data) => {
        if (err) {
          console.error(err);
        } else {
          // Convert string into JSON object
          const parsedNotes = JSON.parse(data);
  
          // Add a new review
          parsedNotes.push(newNote);
  
          // Write updated reviews back to the file
          fs.writeFile(
            './db/db.json',
            JSON.stringify(parsedNotes, null, 4),
            (writeErr) =>
              writeErr
                ? console.error(writeErr)
                : console.info('Successfully updated Notes!')
          );
        }
      });
  

    // ---------------------


      const response = {
        status: 'success',
        body: newNote,
      };
  
      console.log(response);
      res.status(201).json(response);
    } else {
      res.status(500).json('Error in posting review');
    }
  
  // ---------------------------------------------------------------
});

// bonus: delete api/notes db.json id property db.json




// get * index.html
app.get('/*', (req, res) => {
  res.sendFile(path.join(__dirname, './public/index.html'));
});

app.listen(PORT, () => {
  console.log(`Example app listening at http://localhost:${PORT}`);
});