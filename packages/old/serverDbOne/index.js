var PouchDB = require('pouchdb');
var express = require('express');
var app = express();
const port = 4000
app.use(require('express-pouchdb')(PouchDB));

app.listen(port);

console.log(`Server started on port ${port}`)