var r = document.getElementById('result');

var speech;

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


