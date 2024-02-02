const CONST_SONGS = [
    {
        title: 'Forest Lullaby',
        artist: 'Lesfm',
        img: 'cover-1.png',
        song: 'forest-lullaby-110624.mp3' 
    },
    {
        title: 'Lost in the City Lights',
        artist: 'Cosmo Sheldrake',
        img: 'cover-2.png',
        song: 'lost-in-city-lights-145038.mp3' 
    },  
]
const buttonPlay = document.getElementById('btn-play-id')
const buttonNext = document.getElementById('btn-next-song')
const buttonPrev = document.getElementById('btn-prev-song')

const title = document.getElementById('title')
const artist = document.getElementById('artist')
const cover = document.getElementById('cover')
const duration = document.getElementById('duration')
const startDuration = document.getElementById('start-duration')
//timeline
const timeline = document.querySelector('.timeline');
timeline.addEventListener('change', changeSeek);

function changeTimelinePosition () {

    const percentagePosition = (100*audio.currentTime) / audio.duration;
    timeline.style.backgroundSize = `${percentagePosition}% 100%`;
    timeline.value = percentagePosition;
  }

function changeDuration () {
    console.log("chanbgeduration")
    startDuration.innerHTML = fancyTimeFormat(audio.currentTime)
 }
 
  function changeSeek () {
    const time = (timeline.value * audio.duration) / 100
    audio.currentTime = time
    console.log("time " + audio)
  }

let index = 0
let audio;

function init() {
    changeInnerHTML()
}
    
function changeInnerHTML () {
    audio = new Audio(CONST_SONGS[index].song)
    title.innerHTML = CONST_SONGS[index].title
    artist.innerHTML = CONST_SONGS[index].artist
    cover.src = CONST_SONGS[index].img
    audio.onloadedmetadata = function() {
        songControl(audio)   
        duration.innerHTML =  fancyTimeFormat( audio.duration)
        startDuration.innerHTML = "0:00"
    }
}

function songControl(audio) {
    audio.addEventListener('timeupdate', changeTimelinePosition)
    audio.addEventListener('timeupdate', changeDuration)
} 

function fancyTimeFormat(duration) {
    // Hours, minutes and seconds
    const hrs = ~~(duration / 3600)
    const mins = ~~((duration % 3600) / 60)
    const secs = ~~duration % 60
    // Output like "1:01" or "4:03:59" or "123:03:59"
    let ret = "";

    if (hrs > 0) {
      ret += "" + hrs + ":" + (mins < 10 ? "0" : "")
    }
    ret += "" + mins + ":" + (secs < 10 ? "0" : "")
    ret += "" + secs
    return ret
  }

init()

buttonPlay?.addEventListener("click", playSong)

function playSong() {
    console.log(audio.paused)
    if(audio.paused) {
        audio.play()
    } else {
        audio.pause()
    }
}
function stopSong() {
    audio.pause()
}
buttonNext?.addEventListener("click", nextSong)
buttonPrev.addEventListener("click", prevSong)

function nextSong() {
    stopSong()
    index == 0 ? index = 1 : index= 0
    changeInnerHTML()
    playSong()
}

function prevSong() {
    stopSong()
    index == 0 ? index = 1 : index= 0
    changeInnerHTML()
    playSong()
}
