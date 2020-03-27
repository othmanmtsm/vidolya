var express = require('express');
var router = express.Router();


router.get('/:id',(req,res)=>{
    res.io.on('connection', function(socket){
        console.log(`joining room : ${req.params.id}`);
        socket.join(req.params.id);
        console.log('joined room');
        socket.on('buffering',(data)=>{
          res.io.in(req.params.id).emit('buffering',data);
        });
        socket.on('pause',(data)=>{
          res.io.in(req.params.id).emit('pause',data);
        });
        socket.on('play',(data)=>{
          res.io.in(req.params.id).emit('play',data);
        });
        socket.on('skip',(data)=>{
          console.log(`skipping on room ${req.params.id}`);
          res.io.in(req.params.id).emit('skip',data);
        });
    });
    res.render('room',{title:'Video room'});
})

module.exports = router;