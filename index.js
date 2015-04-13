var express = require('express')
var app = express()
var app = require('express')();
var http = require('http').Server(app);
var io = require('socket.io')(http);
var player1 = 0;
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
   if(!player1){
   	 socket.emit('playerid','one');
   	 player1=1;
   }
   else{
   	 socket.emit('playerid','two');
   	 player1=0;
   }
   socket.on('bounce', function(msg){
    io.emit('bounce', msg);
   });
   socket.on('moved',function(data){
   	socket.broadcast.emit('otherplayermove',data);
   });
   socket.on('ready',function(data){
   	socket.broadcast.emit('ready',data);
   });
   socket.on('begin',function(data){
   	io.emit('begin',data);
   });
   socket.on('start',function(data){
   	io.emit('start',data);
   });
   socket.on('point1',function(data){
   	io.emit('point1',data);
   });
   socket.on('point2',function(data){
   	io.emit('point2',data);
   });
   
   
});


var server = http.listen(3015, function () {

  var host = server.address().address
  var port = server.address().port

  console.log('Example app listening at http://%s:%s', host, port)

})