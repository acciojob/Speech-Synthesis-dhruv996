// Your script here.
document.addEventListener('DOMContentLoaded', init);

let synth;
let voices = [];

function init() {
  synth = window.speechSynthesis;

  if ('speechSynthesis' in window) {
    populateVoiceList();
    document.getElementById('startButton').addEventListener('click', startSpeaking);
    document.getElementById('stopButton').addEventListener('click', stopSpeaking);
    document.getElementById('rateInput').addEventListener('input', updateRate);
    document.getElementById('pitchInput').addEventListener('input', updatePitch);
  } else {
    alert('Speech synthesis is not supported in your browser.');
  }
}

function populateVoiceList() {
  voices = synth.getVoices();

  const voiceSelect = document.getElementById('voiceSelect');
  voiceSelect.innerHTML = '';

  voices.forEach(voice => {
    const option = document.createElement('option');
    option.textContent = voice.name + ' (' + voice.lang + ')';
    option.value = voice.name;
    voiceSelect.appendChild(option);
  });
}

function startSpeaking() {
  const textInput = document.getElementById('textInput').value;
  const voiceSelect = document.getElementById('voiceSelect');
  const selectedVoice = voices.find(voice => voice.name === voiceSelect.value);

  if (textInput.trim() !== '' && selectedVoice) {
    const utterance = new SpeechSynthesisUtterance(textInput);
    utterance.voice = selectedVoice;
    utterance.rate = document.getElementById('rateInput').value;
    utterance.pitch = document.getElementById('pitchInput').value;

    synth.speak(utterance);
  } else {
    alert('Please enter text and select a voice.');
  }
}

function stopSpeaking() {
  synth.cancel();
}

function updateRate() {
  const rateValue = document.getElementById('rateInput').value;
  document.getElementById('rateValue').innerText = `Rate: ${rateValue}`;
}

function updatePitch() {
  const pitchValue = document.getElementById('pitchInput').value;
  document.getElementById('pitchValue').innerText = `Pitch: ${pitchValue}`;
}
