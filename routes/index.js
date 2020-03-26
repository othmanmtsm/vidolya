var express = require('express');
var router = express.Router();

/* GET home page. */
router.get('/', function(req, res, next) {
  res.io.on('connection', function(socket){
    socket.on('buffering',(data)=>{
      res.io.emit('buffering',data);
    });
    socket.on('pause',(data)=>{
      res.io.emit('pause',data);
    });
    socket.on('play',(data)=>{
      res.io.emit('play',data);
    });
    socket.on('skip',(data)=>{
      res.io.emit('skip',data);
    });
  });
  res.render('index');
});

module.exports = router;
