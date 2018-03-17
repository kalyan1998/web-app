var app = require('express')();
var http = require('http').Server(app);
var io = require('socket.io')(http);
app.get('/', function(req, res){
  res.sendFile(__dirname + '/index7.html');
});
users=[];
io.on('connection', function(socket){
  io.emit('chat message',"user connected");
   socket.on('chat message', function(msg){
      io.emit('chat message', msg);
  });
    socket.on('setUsername', function(data) {
        if(users.indexOf(data) > -1) {
         socket.emit('userExists', data + ' username is taken! Try some other username.');
      } else {
         users.push(data);
         socket.emit('userSet', {username: data});
      }
   });
  socket.on('disconnect',function(){
  io.emit('chat message',"user disconnected");
  })
});

http.listen(3000, function(){
  console.log('listening on *:3000');
});