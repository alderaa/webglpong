var express = require('express')
var app = express()

app.set('views', __dirname+"/views");
app.engine('html', require('ejs').renderFile);

app.use(express.static(__dirname + '/assets'));

app.get('/', function (req, res) {
  res.render("index.html");
})
app.get('/test', function (req, res) {
  res.render("phystest.html");
})

var server = app.listen(3015, function () {

  var host = server.address().address
  var port = server.address().port

  console.log('Example app listening at http://%s:%s', host, port)

})