var socket = io();

var tag = document.createElement('script');

tag.src = "https://www.youtube.com/iframe_api";
var firstScriptTag = document.getElementsByTagName('script')[0];
firstScriptTag.parentNode.insertBefore(tag, firstScriptTag);

var player;
function onYouTubeIframeAPIReady() {
player = new YT.Player('player', {
    height: '390',
    width: '640',
    videoId: 'M7lc1UVf-VE',
    events: {
    'onReady': onPlayerReady,
    'onStateChange': onPlayerStateChange
    }
});
}

function onPlayerReady(event) {

}

function onPlayerStateChange(event) {
    if (event.target.getPlayerState() == 3){
        socket.emit('buffering',player.getCurrentTime());
    }else if (event.target.getPlayerState() == 2) {
        socket.emit('pause',player.getCurrentTime());
    }else if (event.target.getPlayerState() == 1) {
        socket.emit('play',player.getCurrentTime());
    }
}
socket.on('buffering',(d)=>{
    player.seekTo(d);
})
socket.on('pause',()=>{
    player.pauseVideo();
})
socket.on('play',()=>{
    player.playVideo();
})