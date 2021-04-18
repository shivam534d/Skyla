var SpeechRecognition = SpeechRecognition || webkitSpeechRecognition;
var SpeechGrammarList = SpeechGrammarList || webkitSpeechGrammarList;
var SpeechRecognitionEvent =
  SpeechRecognitionEvent || webkitSpeechRecognitionEvent;

var commandPara = document.querySelector('.output');
var listenBtn = document.querySelector('button');

function testSpeech() {
  listenBtn.disabled = true;
  listenBtn.classList.remove('red-color');
  listenBtn.classList.add('blue-color');
  // To ensure case consistency while checking with the returned output text
  var grammar = '#JSGF V1.0;';
  var recognition = new SpeechRecognition();
  var speechRecognitionList = new SpeechGrammarList();

  speechRecognitionList.addFromString(grammar, 1);
  recognition.grammars = speechRecognitionList;
  recognition.lang = 'en-US';
  recognition.interimResults = false;
  recognition.maxAlternatives = 1;
  
  recognition.start();

  // Runs on Result
  recognition.onresult = function (event) {
    var speechResult = event.results[0][0].transcript.toLowerCase();
    commandPara.textContent = speechResult;
    listenBtn.classList.remove('blue-color');
    listenBtn.classList.add('green-color');
  };

  // Runs on SpeechEnd
  recognition.onspeechend = function () {
    recognition.stop();
    listenBtn.disabled = false;
  };
  // Runs on VoiceRecon Error
  recognition.onerror = function (event) {
    listenBtn.disabled = false;
    commandPara.textContent = 'Error occurred in recognition: ' + event.error;
    listenBtn.classList.remove('blue-color');
    listenBtn.classList.add('red-color');
  };
}

listenBtn.addEventListener('click', testSpeech);
