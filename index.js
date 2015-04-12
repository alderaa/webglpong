var express = require('express')
var app = express()
var app = require('express')();
var http = require('http').Server(app);
var io = require('socket.io')(http);
var player1;
var player2;
app.set('views', __dirname+"/views");
app.engine('html', require('ejs').renderFile);

app.use(express.static(__dirname + '/assets'));

app.get('/', function (req, res) {
  res.render("index.html");
})
app.get('/test', function (req, res) {
  res.render("phystest.html");
})

io.on('connection', function(socket){
 
   socket.emit('playerid',socket.id);
   socket.on('bounce', function(msg){
    io.emit('bounce', msg);
   });
   socket.on('moved',function(data){
   	socket.broadcast.emit('otherplayermove',data);
   });
   
});


var server = http.listen(3015, function () {

  var host = server.address().address
  var port = server.address().port

  console.log('Example app listening at http://%s:%s', host, port)

})