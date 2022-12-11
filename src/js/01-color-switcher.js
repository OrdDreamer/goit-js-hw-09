const COLORING_DELAY = 1000;

function getRandomHexColor() {
  return `#${Math.floor(Math.random() * 16777215).toString(16)}`;
}

function startColoring() {
  startButton.setAttribute("disabled", "true");
  stopButton.removeAttribute("disabled");

  timerId = setInterval(() => {
    document.body.style.backgroundColor = getRandomHexColor();
  }, COLORING_DELAY);
}

function stopColoring() {
  startButton.removeAttribute("disabled");
  stopButton.setAttribute("disabled", "true");

  clearInterval(timerId);
}



let timerId = null;
const startButton =  document.querySelector("button[data-start]");
const stopButton = document.querySelector("button[data-stop]");

if (startButton) {
  startButton.addEventListener("click", startColoring);
}

if (stopButton) {
  stopButton.addEventListener("click", stopColoring);
  stopButton.setAttribute("disabled", "true");
}






