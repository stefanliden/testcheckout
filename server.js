  
const cors = require('cors');
const express = require('express');
let app = express();
app.use(cors());
app.options('*', cors());

app.use(express.static(__dirname + '/dist/angular-on-heroku'));
app.get('/*', function(req,res) {
  res.sendFile(path.join(__dirname+
    '/dist/angular-on-heroku/index.html'));});
app.listen(process.env.PORT || 8080);