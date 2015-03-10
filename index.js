var express = require('express')
var app = express()

app.set('views', __dirname+"/views");
app.set('view engine', 'jade');

app.use(express.static(__dirname + '/assets'));

app.get('/', function (req, res) {
  res.render("index.jade");
})

var server = app.listen(3015, function () {

  var host = server.address().address
  var port = server.address().port

  console.log('Example app listening at http://%s:%s', host, port)

})