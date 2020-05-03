// ===============================================================================
// DEPENDENCIES
// We need to include the file system 'fs' package that will be used to 
// store and retrieve notes
// 'util' will be used to promisify asynchronous read and write functions
// ===============================================================================
const fs = require('fs');
const path = require('path');
const util = require("util");
const writeFileAsync = util.promisify(fs.writeFile);
// ===============================================================================
// LOAD DATA
// We are linking our routes to a series of "data" sources.
// These data sources hold arrays of information on notes
// ===============================================================================
var notesList = [];


if ( fs.existsSync(path.join(__dirname, "../db/db.json")) ) { //Check if file exists
  //read file data
  notesList =  fs.readFileSync(path.join(__dirname, "../db/db.json"), 'utf-8');
  JSON.parse(notesList);
  console.log(notesList);
}

// Create output file
// writeFileAsync(outputPath, html, { flag : 'w' }, (err) => {
  //     if (err) throw err;
  //     console.log("Succesfully created your awesome team profile webpage. Check folder 'Outputs/team.html'")
  // });   
  
  // ===============================================================================
  // ROUTING
  // ===============================================================================
  
  module.exports = function(app) {
  
  // API GET Requests
  // Below code handles when users "visit" a page.
  // In each of the below cases when a user visits a link
  // (ex: localhost:PORT/api/admin... they are shown a JSON of the data in the table)
  // ---------------------------------------------------------------------------
  
  app.get("/api/notes", function(req, res) { 
    // Should return the `db.json` file and return all saved notes as JSON.
    console.log('api works')
    res.json(notesList);
  });

 
  // API POST Requests
  // Below code handles when a user submits a form and thus submits data to the server.
  //------------------------------------------------------------------------

  // app.post("/api/notes", function(req, res) {
  //   // Should recieve a new note to save on the request body, add it to the `db.json` file, 
  //   // and then return the new note to the client.
  //   // req.body is available since we're using the body parsing middleware
  //   if (tableData.length < 5) {
  //     tableData.push(req.body);
  //     res.json(true);
  //   }
  //   else {
  //     waitListData.push(req.body);
  //     res.json(false);
  //   }
  // });

  // app.delete("/api/notes/:id", function(req, res) {
  //   // Note the code here. Our "server" will respond to requests and let users know if they have a table or not.
  //   // It will do this by sending out the value "true" have a table
  //   // req.body is available since we're using the body parsing middleware
  //   if (tableData.length < 5) {
  //     tableData.push(req.body);
  //     res.json(true);
  //   }
  //   else {
  //     waitListData.push(req.body);
  //     res.json(false);
  //   }
  // });

};
