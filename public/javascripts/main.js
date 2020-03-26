var socket = io();

let tim = document.getElementById('vtime');

var tag = document.createElement('script');

tag.src = "https://www.youtube.com/iframe_api";
var firstScriptTag = document.getElementsByTagName('script')[0];
firstScriptTag.parentNode.insertBefore(tag, firstScriptTag);

var player;
function onYouTubeIframeAPIReady() {
player = new YT.Player('player', {
    height: '390',
    width: '640',
    videoId: 'Vwrqp89yqXY',
    playerVars:{
        controls: 0,
        autoplay: 1,
        disablekb: 1,
        enablejsapi: 1,
        modestbranding: 1,
        start: 0,
        rel: 0,
        origin: 'localhost'
    },
    events: {
    'onReady': onPlayerReady,
    'onStateChange': onPlayerStateChange
    }
});
}



function onPlayerReady(event) {
    // if (playing) {
    //     player.seekTo(playingT);
    //     player.playVideo();
    // }else{
    //     playing = true;
    // }
}

function onPlayerStateChange(event) {

}

//player
let btn = document.getElementById('play-pause');
let bar = document.querySelector('.progressbar');
let fill = document.querySelector('.progress-f');
btn.addEventListener('click',()=>{
    if (player.getPlayerState() == 1) {
        btn.className = 'play';
        socket.emit('pause',player.getCurrentTime());
    }else if (player.getPlayerState() == 2) {
        btn.className = 'pause';
        socket.emit('play',player.getCurrentTime());
    }
})


window.setInterval(function(){
    let curTime = player.getCurrentTime() / player.getDuration();
    fill.style.width = curTime * 100 + '%';
    socket.emit('start',player.getCurrentTime());
}, 1000);

bar.addEventListener('click',(e)=>{
    socket.emit('skip',{bclient:e.target.getBoundingClientRect(),clientX:e.clientX});
})

socket.on('buffering',(d)=>{
    player.seekTo(d);
    player.playVideo();
})
socket.on('pause',()=>{
    player.pauseVideo();
})
socket.on('play',()=>{
    player.playVideo();
})
socket.on('skip',(e)=>{
    let rect = e.bclient;
    let x = e.clientX - rect.left;
    let curTime = x/640;
    let vidTime = curTime * player.getDuration();
    player.seekTo(vidTime);
    fill.style.width = curTime * 100 + '%';
})
