function getRandomHexColor() {
    return `#${Math.floor(Math.random() * 16777215).toString(16)}`;
  }
const startButton = document.querySelector('button[data-start]');
const stopButton = document.querySelector('button[data-stop]');
const body = document.querySelector('body');

let intervalId = null;
stopButton.disebled = true;

startButton.addEventListener('click', () => {
    startButton.disabled = true;
    stopButton.disabled = false;

    intervalId = setInterval(() => {
        body.style.background = getRandomHexColor()
    }, 1000);
});
stopButton.addEventListener('click', () => {
   clearInterval(intervalId);
   startButton.disabled = false;
   stopButton.disabled = true;
});



