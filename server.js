var express = require("express");
var path = require("path");
var fs = require("fs").promises;
var notes = require("./db/db.json")

var app = express();

var PORT = process.env.PORT || 5000;

app.use(express.urlencoded({ extended: true }));
app.use(express.json());

allnote = notes.length;


app.get("/api/notes", function (req, res) {

    return res.json(notes);
});
app.use(express.static("public"));



app.get("/notes", function (req, res) {
    res.sendFile(path.join(__dirname, "public/notes.html"));
});

app.get("*", function (req, res) {
    res.sendFile(path.join(__dirname, "public/index.html"));
});

// Post function
app.post("/api/notes", function (req, res) {
    var newPost = req.body;

    newPost["id"] = allnote +1;
    allnote++;
    console.log(newPost);

    notes.push(newPost);

    keepnotedb();

    return res.status(200).end();
});
 
// Delete function
app.delete("/api/notes/:id", function (req, res) {
    res.send('DELETE request at /api/notes/:id')

    var newid = req.params.id;

    var newud = notes.filter(function (u) {
        return u.newid < newid;
    });

    var newp = notes.filter(function (p) {
        return p.id > newid;
    });

    notes = newud.concat(newp);

  keepnotedb();
})


 

function keepnotedb(){
fs.writeFile ("db/db.json", JSON.stringify(notes), function(err) {
    if (err) throw err;
    console.log('complete');
    });
}

app.listen(PORT, function(err){
    if (err) console.log("Error in server setup")
    console.log("Server listening on Port", PORT);
})
