const express = require('express');
const path = require('path');
const app = express();
var cors = require('cors')
app.use(cors())
app.use(express.static(__dirname + '/dist/'));
app.get('/*', function(req,res) {
  res.sendFile(path.join(__dirname+
    '/dist/index.html'));});
app.listen(process.env.PORT || 8080);