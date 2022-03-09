//const PORT = process.env.PORT || 3000;
const fs = require('fs');
const path = require('path');
const bodyParser = require('body-parser')

let note = [{ id: 1, body: 'We have a text' }, { id: 2, body: 'This is a second text' }];

const allNotes = require('./develop/db/db.json');


const express = require('express');

const app = express();

app.use(express.urlencoded({ extended: true }));
app.use(express.json());
app.use(express.static('public'));


app.get('/api/notes', (req, res) => {
    res.json(allNotes.slice(1));
});

app.get('/', (req, res) => {
    res.sendFile(path.join(__dirname, './develop/public/index.html'));
});

app.get('/notes', (req, res) => {
    res.sendFile(path.join(__dirname, './develop/public/notes.html'));
});

app.get('*', (req, res) => {
    res.sendFile(path.join(__dirname, './develop/public/index.html'));
});


//then, we use app.post option.
app.post("/Notes", function (req, res) {
  //assigning Note id to the notes using math.random
  const userNote = {};
  userNotes.id = Math.random() * 100;
  userNotes.body = req.body.newNote
  note.push(userNotes);
  //then we redirect it to the root route
  res.redirect('./develop/db/db.json');
});

//Handling the delete request

app.post('/deleteNote/:id', function (req, res) {
  console.log(req.params.id);
  const deleteNotes = note.filter(item => item.id != req.params.id);
  allNotes = deleteNotes;
  return res.redirect('./develop/db/db.json');
});

//then we set our server port. This should always be at bottom.
app.listen(5000, function () {
  console.log("NoteApp server is running at port 5000")
});