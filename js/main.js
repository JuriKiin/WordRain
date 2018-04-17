
let speech;
const canvas = document.querySelector("#canvas"); 
const ctx = canvas.getContext("2d");
const poemCanvas = document.querySelector("#poemCanvas");
const poemCtx = poemCanvas.getContext("2d");
let colors = [
    "#CCFF66FF",
    "#5D2E8CFF",
    "#2EC4B6FF",
    "#DA4167FF",
    "#34344AFF"
];
let fonts = [
    "Comic Sans MS"
];

let words = []
let finalWords = '';
window.onload = init;

function init() {
    console.log("init");
    let div = document.querySelector("#canvas");

    canvas.width = div.clientWidth;
    canvas.height = div.clientHeight;

    startConverting();
    update();
}

function startListening(){
    console.log("start listening");
    ctx.clearRect(0, 0, canvas.width, canvas.height);
    poemCtx.clearRect(0, 0, canvas.width, canvas.height);

    words = [];
    finalWords = '';
    startConverting();
}

function startConverting(){
    if('webkitSpeechRecognition' in window){
        speech = new webkitSpeechRecognition();
        speech.continuous = true;
        speech.interimResults = true;
        speech.lang = 'en-US';
        speech.start();


        speech.onsoundstart = function(){
            console.log("Starting");
            ctx.clearRect(0,0,canvas.width,canvas.height);
        };

        speech.onspeechend = function(){
            console.log("Speech ended");
        }

        speech.onresult = function(event){
            var interimTranscript = '';
            for(var i = event.resultIndex; i < event.results.length; i++){
                var transcript = event.results[i][0].transcript;
                transcript.replace("\n", "<br>");
                if(event.results[i].isFinal){
                    finalWords += transcript;
                } else {
                    interimTranscript += transcript;
                    prepareWord(transcript);
                }
            }
        };
    
        speech.onerror = function(error){
        };
    }
}

function generatePoem(){
    return;

    poemCtx.font = "14px Comic Sans MS";
    poemCtx.fillStyle = "black";
    poemCtx.textAlign = "center";

    let x = 25;
    let y = 25;

    console.log("Final Words: " + finalWords + " Poem Width: " + poemCanvas.width);
    let finalWordArr = finalWords.split(' ');

    for(let i = 0; i < finalWordArr.length; i++){
        console.log("Word: " +  finalWordArr[i] + " X: " + x + " Y: " + y);

        // If we run out of room vertically use ... and end the loop
        if(y >= poemCanvas.height){
            poemCtx.fillText("...", x, y);
            break;
        }

        poemCtx.fillText(finalWordArr[i], x, y);
        // console.log ("Width: " + poemCtx.measureText(finalWordArr[i]).width + 10);
        x += poemCtx.measureText(finalWordArr[i]).width + 10;

        // If we run out of room horizontally start a new line
        if(x >= poemCanvas.width){
            y += 50;
            x = 0;
        }
    }
}

function update(){
    requestAnimationFrame(update);
    for(let i = 0; i < words.length; i++){
        words[i].move();
        words[i].draw(ctx);
    }
}

function prepareWord(word) {
    let wordArray = word.split(" ");
    for(var i = 0; i< wordArray.length;i++){
        createWord(wordArray[i]);
    }
}

function createWord(word){
    let wordObj = {
        word: word,
        speed: word.length/3,
        x: Math.floor(Math.random() * Math.floor(canvas.width)),
        y: 0,
        color: colors[parseInt(Math.random() * Math.floor(colors.length-1))],
        font: parseInt(Math.random() * (40 - 20) + 20) + "px " + fonts[parseInt(Math.random() * Math.floor(fonts.length-1))],
        move: function(){
            this.y += this.speed;
        },
        draw: function (ctx){
            ctx.font = this.font;
            ctx.fillStyle = this.color;
            ctx.textAlign = "center";
            ctx.fillText(this.word, this.x, this.y);
        }
    }
    words.push(wordObj);
}

