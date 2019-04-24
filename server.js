var express = require('express');
var app = express();
var path = require('path');

app.use(express.static(path.join(__dirname + '/public')));
app.use("/assets/css", express.static(__dirname + '/public/assets/css'));
app.use("/assets/img", express.static(__dirname + '/public/assets/img'));
app.use("/assets/js", express.static(__dirname + '/public/assets/js'));
app.use("/pages", express.static(__dirname + '/public/pages'));

// viewed at based directory http://localhost:8080/
app.get('/', function (req, res) {
  res.sendFile(path.join(__dirname + '/public/index.html'));
});

app.listen(process.env.PORT || 8080);