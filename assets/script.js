var SpeechRecognition = SpeechRecognition || webkitSpeechRecognition;
var SpeechGrammarList = SpeechGrammarList || webkitSpeechGrammarList;
var SpeechRecognitionEvent =
  SpeechRecognitionEvent || webkitSpeechRecognitionEvent;

var commandPara = document.querySelector('.output');
var listenBtn = document.querySelector('button');

function testSpeech() {
  listenBtn.disabled = true;
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

  recognition.onresult = function (event) {
    var speechResult = event.results[0][0].transcript.toLowerCase();
    commandPara.textContent = speechResult;
  };

  recognition.onspeechend = function () {
    recognition.stop();
    listenBtn.disabled = false;
  };

  recognition.onerror = function (event) {
    listenBtn.disabled = false;
    commandPara.textContent = 'Error occurred in recognition: ' + event.error;
  };

  recognition.onaudiostart = function (event) {
    //Fired when the user agent has started to capture audio.
    console.log('SpeechRecognition.onaudiostart');
  };

  recognition.onaudioend = function (event) {
    //Fired when the user agent has finished capturing audio.
    console.log('SpeechRecognition.onaudioend');
  };

  recognition.onend = function (event) {
    //Fired when the speech recognition service has disconnected.
    console.log('SpeechRecognition.onend');
  };

  recognition.onnomatch = function (event) {
    //Fired when the speech recognition service returns a final result with no significant recognition. This may involve some degree of recognition, which doesn't meet or exceed the confidence threshold.
    console.log('SpeechRecognition.onnomatch');
  };

  recognition.onsoundstart = function (event) {
    //Fired when any sound — recognisable speech or not — has been detected.
    console.log('SpeechRecognition.onsoundstart');
  };

  recognition.onsoundend = function (event) {
    //Fired when any sound — recognisable speech or not — has stopped being detected.
    console.log('SpeechRecognition.onsoundend');
  };

  recognition.onspeechstart = function (event) {
    //Fired when sound that is recognised by the speech recognition service as speech has been detected.
    console.log('SpeechRecognition.onspeechstart');
  };

  recognition.onstart = function (event) {
    //Fired when the speech recognition service has begun listening to incoming audio with intent to recognize grammars associated with the current SpeechRecognition.
    console.log('SpeechRecognition.onstart');
  };
}

listenBtn.addEventListener('click', testSpeech);
