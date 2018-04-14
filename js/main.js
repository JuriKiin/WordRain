// import {createWord} from './classes.js'

let r = document.getElementById('result');

let speech;
const canvas = document.querySelector("canvas"); 
const ctx = canvas.getContext("2d");

let words = []
window.onload = update;

function startConverting(){
    if('webkitSpeechRecognition' in window){
        speech = new webkitSpeechRecognition();
        speech.continuous = true;
        speech.interimResults = true;
        speech.lang = 'en-US';
        speech.start();
    
        var finalWords = '';
        speech.onresult = function(event){
            var interimTranscript = '';
            for(var i = event.resultIndex; i < event.results.length; i++){
                var transcript = event.results[i][0].transcript;
                transcript.replace("\n", "<br>");
                if(event.results[i].isFinal){
                    finalWords += transcript;
                } else {
                    interimTranscript += transcript;
                    createWord(transcript);
                    // let word = createWord();
                    // words.push(word);
                }
            }
            r.innerHTML = finalWords +  '<span style="color:#999">' + interimTranscript + '</span>';
        };
    
        speech.onerror = function(error){
        };
    } else {
        r.innerHTML = "Your Browser is not supported.";
    }
}

function update(){
    requestAnimationFrame(update);
    for(let i = 0; i < words.length; i++){
        words[i].move();
        words[i].draw(ctx);
    }
}

function createWord(word, color, font){
    let wordObj = {
        word: word,
        speed: word.length / 10,
        x: 50,
        y: 0,
        color: color,
        font: font,
        move: function(){
            this.y += this.speed;
        },
        draw: function (ctx){
            ctx.font = "30px Comic Sans MS";
            ctx.fillStyle = "red";
            ctx.textAlign = "center";
            ctx.fillText(this.word, this.x, this.y);
        }
    }
    words.push(wordObj);
}

