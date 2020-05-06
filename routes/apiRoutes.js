// ===============================================================================
// DEPENDENCIES
// We need to include the file system 'fs' package that will be used to
// store and retrieve notes
// 'util' will be used to promisify asynchronous read and write functions
// ===============================================================================
const fs = require("fs");
const path = require("path");
const util = require("util");
const dBPath = path.join(__dirname, "../db/db.json");
const dBPath_dir = path.join(__dirname, "../db");
const writeFileAsync = util.promisify(fs.writeFile);
const { v4: uuidv4 } = require("uuid");
uuidv4();
// const req = require('lastNoteID');
// ===============================================================================
// LOAD DATA
// We are linking our routes to a series of "data" sources.
// These data sources hold arrays of information on notes
// ===============================================================================

// ===============================================================================
// ROUTING
// ===============================================================================

module.exports = function (app) {
  let notesList = [];

  function readNotesList() {
    if (fs.existsSync(dBPath)) {
      //Check if file exists
      //read file data

      return (notesList = JSON.parse(fs.readFileSync(dBPath)));
    }
  }

  function saveNotesList(newNotesList) {
    //Check if folder exists
    fs.existsSync(dBPath_dir) || fs.mkdirSync(dBPath_dir);
    // Create output file
    writeFileAsync(
      dBPath,
      JSON.stringify(newNotesList),
      { flag: "w" },
      (err) => {
        if (err) throw err;
        console.log("Succesfully saved new note");
      }
    );
  }

  // API GET Requests
  // Below code handles when users "visit" a page.
  // ---------------------------------------------------------------------------

  app.get("/api/notes", function (req, res) {
    // Should return the `db.json` file and return all saved notes as JSON.
    res.send(readNotesList());
    res.end;
  });

  // API POST Requests
  // Below code handles when a user submits a form and thus submits data to the server.
  //------------------------------------------------------------------------

  app.post("/api/notes", function (req, res) {
    let noteId = uuidv4();
    let newNote = req.body;
    newNote.id = noteId;
    notesList = readNotesList();
    notesList.push(newNote);
    saveNotesList(notesList);
    res.json(true);
  });

  app.delete("/api/notes/:id", function (req, res) {
    let noteId = req.params.id;
    noteList = readNotesList();
    const updatedNotesList = notesList.filter((note) => note.id !== noteId);

    saveNotesList(updatedNotesList);
    res.send("Deleted");
  });
};
