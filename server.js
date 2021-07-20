  
const cors = require('cors');
const express = require('express');
let app = express();
app.use(cors());
app.options('*', cors());

app.get('/products/:id', function (req, res, next) {
    res.json({msg: 'This is CORS-enabled for all origins!'})
  })
   
  app.listen(80, function () {
    console.log('CORS-enabled web server listening on port 80')
  })
  

app.use(express.static(__dirname + '/dist/angular-on-heroku'));
app.get('/*', function(req,res) {
  res.sendFile(path.join(__dirname+
    '/dist/angular-on-heroku/index.html'));});
app.listen(process.env.PORT || 8080);