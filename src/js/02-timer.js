import flatpickr from "flatpickr";
import "flatpickr/dist/flatpickr.min.css";

function getTimeLeft(date) {
  return Math.floor((date - new Date()) / 1000);
}

function verifyDate(d) {
  return getTimeLeft(d) > 0;
}

function addLeadingZero(value) {
  return String(value).padStart(2, '0');
}


function setTimeLeft(timeLeft) {
  const s =  timeLeft ;
  const m = Math.floor(s / 60);
  const h = Math.floor(m / 60);

  timer.days = Math.floor(h / 24);
  timer.hours = h % 24;
  timer.minutes = m % 60;
  timer.seconds = s % 60;

  updateTimerView();
}

function stopTimer() {
  clearInterval(timer.intervalID);
  datePicker?.removeAttribute("disabled");
  updateStartButton();
}

function startTimer() {
  timer.intervalID = setInterval(() => {
    const timeLeft = getTimeLeft(timer.selectedDate);
    if (timeLeft > 0) {
      setTimeLeft(timeLeft);
    } else {
      setTimeLeft(0);
      stopTimer();
    }
  }, 1000);
}


function showError() {
  if (errorView.message) {
    errorView.message.textContent = "Invalid date! Please enter a date later than the current one.";
  }
  if (errorView.container) {
    clearInterval(timer.errorTimeoutID);

    errorView.container.classList.add("show");

    timer.errorTimeoutID = setTimeout(() => {
      errorView.container.classList.remove("show");
    }, 3000);
  }
}

function updateStartButton() {
  if (verifyDate(timer.selectedDate)) {
    startButton?.removeAttribute("disabled");
  } else {
    startButton?.setAttribute("disabled", "true");
  }
}

function updateTimerView() {
  const { days, hours, minutes, seconds } = timerView;
  if (days) {
    days.textContent = addLeadingZero(timer.days > 99 ? 99 : timer.days);
  }
  if (hours) {
    hours.textContent = addLeadingZero(timer.hours);
  }
  if (minutes) {
    minutes.textContent = addLeadingZero(timer.minutes);
  }
  if (seconds) {
    seconds.textContent = addLeadingZero(timer.seconds) ;
  }
}

function onDatePickerClose(selectedDates) {
  timer.selectedDate = new Date(selectedDates[0]);
  updateStartButton();

  if (!verifyDate(timer.selectedDate)) {
    showError();
  } else if (errorView.container) {
    errorView.container.classList.remove("show");
  }
}

function onStartButtonClick() {
  datePicker?.setAttribute("disabled", "true");
  startButton?.setAttribute("disabled", "true");
  startTimer();
}


const startButton =  document.querySelector("button[data-start]");
const datePicker =  document.querySelector("#datetime-picker");
const timerView = {
  days: document.querySelector("span[data-days]"),
  hours: document.querySelector("span[data-hours]"),
  minutes: document.querySelector("span[data-minutes]"),
  seconds: document.querySelector("span[data-seconds]"),
};
const errorView = {
  container: document.querySelector("div.error"),
  message: document.querySelector("p.error-message"),
}

const timer = {
  selectedDate: new Date(),
  intervalID: null,
  errorTimeoutID: null,
  days: 0,
  hours: 0,
  minutes: 0,
  seconds: 0,
}

flatpickr(
  "#datetime-picker",
  {
    enableTime: true,
    time_24hr: true,
    defaultDate: timer.selectedDate,
    minuteIncrement: 1,
    onClose: onDatePickerClose,
  }
);

updateStartButton();

startButton?.addEventListener("click", onStartButtonClick);
