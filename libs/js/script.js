var string = [];
var app = document.getElementById('typing');

var tw = new Typewriter(app, {
    loop: false,
    deleteSpeed: 'natural',
    delay: 75,
});

$(document).ready(function() {
    fetchTyping();
});

async function fetchTyping() {
    fetch('/libs/data/data.txt')
        .then((res) => {
            return res.text();
        })
        .then((data) => {
            string = data.split('\n');
            string = shuffle(string);
        })
        .finally(() => {
            typewriter();
        })
}

function shuffle(array) {
    let currentIndex = array.length,  randomIndex;
  
    // While there remain elements to shuffle.
    while (currentIndex > 0) {
  
      // Pick a remaining element.
      randomIndex = Math.floor(Math.random() * currentIndex);
      currentIndex--;
  
      // And swap it with the current element.
      [array[currentIndex], array[randomIndex]] = [
        array[randomIndex], array[currentIndex]];
    }
  
    return array;
  }
function typewriter(){
    for(let i = 0; i < string.length; i++){
        var temp = string.shift();
        if(temp.includes("<strong>")){
            var firstPart = temp.slice(0, temp.indexOf("<strong>"));
            var partToPaste = temp.slice(temp.indexOf("<strong>"), temp.indexOf("</strong>"));
            var lastPart = temp.slice(temp.indexOf("</strong>")+9, temp.length -1);
            tw.typeString(firstPart)
                .typeString(partToPaste)
                .typeString(lastPart)
                .pauseFor(1000)
                .deleteAll();
        } else {
            tw.typeString(temp.trim())
                .pauseFor(1000)
                .deleteAll();
        }
        
    }
    tw.start().callFunction(() => fetchTyping());
}