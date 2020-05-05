// ===============================================================================
// DEPENDENCIES
// We need to include the file system 'fs' package that will be used to 
// store and retrieve notes
// 'util' will be used to promisify asynchronous read and write functions
// ===============================================================================
const fs = require('fs');
const path = require('path');
const util = require("util");
const dBPath = path.join(__dirname, "../db/db.json");
const dBPath_dir = path.join(__dirname, "../db");
const writeFileAsync = util.promisify(fs.writeFile);

// ===============================================================================
// LOAD DATA
// We are linking our routes to a series of "data" sources.
// These data sources hold arrays of information on notes
// ===============================================================================
let notesList = [];

function readNotesList () {
  if ( fs.existsSync(dBPath) ) { //Check if file exists
    //read file data
    return notesList = JSON.parse (fs.readFileSync(dBPath));
    
  }
}

// ===============================================================================
  // ROUTING
  // ===============================================================================
  
  module.exports = function(app) {
  
  // API GET Requests
  // Below code handles when users "visit" a page.
  // ---------------------------------------------------------------------------
  
  app.get("/api/notes", function(req, res) { 
    // Should return the `db.json` file and return all saved notes as JSON.
    res.send(readNotesList());
    res.end;
  });
 
  // API POST Requests
  // Below code handles when a user submits a form and thus submits data to the server.
  //------------------------------------------------------------------------

  app.post("/api/notes", function(req, res) {
    console.log(req.body)  
    
    notesList = readNotesList();
    notesList.push(req.body);

    console.log(notesList)
    //Check if folder exists
     fs.existsSync(dBPath_dir) || fs.mkdirSync(dBPath_dir) 
    // Create output file
    writeFileAsync(dBPath, JSON.stringify(notesList), { flag : 'w' },(err) => {
        if (err) throw err;
        console.log("Succesfully saved new note")
    });
      res.json(true);

  });  

};
