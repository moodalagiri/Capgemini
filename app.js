var express = require('express');
var path = require('path');
var bodyParser = require('body-parser');

var app = express();

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: false }));

app.use('/webapp', express.static('./webapp'));
app.use('/api', require('./routes/api'));
app.listen(3000, function(){
  console.log("Server started at port 3000");
})