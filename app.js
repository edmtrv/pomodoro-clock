// internal representation of both timers in seconds
const state = {
  timers: {
    session: 1500,
    break: 300,
    currentTimer: 0
  },
  session: true,
  timerId: null
};

// control timers
function handleInput(e) {
  if (e.target.dataset.type === 'session') {
    const sessionTime = change(e.target.dataset.action, state.timers.session);
    state.timers.session = sessionTime;
    sessionLength.textContent = sessionTime / 60;
    counter.textContent = `${leftPad(sessionTime / 60)}:00`;
  } else if (e.target.dataset.type === 'break') {
    const breakTime = change(e.target.dataset.action, state.timers.break);
    state.timers.break = breakTime
    breakLength.textContent = breakTime / 60;
  }
}

function change(action, value) {
  let numericValue = value;

  if (action === 'inc') {
    if (numericValue > 3000) return numericValue;
    numericValue += 60;
  } else {
    if (numericValue < 120) return numericValue;
    numericValue -= 60;
  }

  return numericValue;
}

function decrement() {
  state.currentTimer--;
  counter.textContent = timeString(state.currentTimer);
}

function timeString(seconds) {
  let sValue = Math.floor(seconds % 60);
  let mValue = Math.floor(seconds / 60);

  return `${leftPad(mValue)}:${leftPad(sValue)}`;
}

function leftPad(str, pad = "00") {
  if (typeof str === 'undefined') {
    return pad;
  }

  return (pad + str).slice(-pad.length);
}

function timerHandler(e) {
  setupTimer();
}

function setupTimer() {
  state.currentTimer = state.session ? state.timers.session : state.timers.break;
  
  state.timerId = setTimeout(runTimer, 1000);
}

function runTimer() {
  decrement();
  if (state.currentTimer === 0) {
    state.session = !state.session;
    clearTimeout(state.timerId);
    setupTimer();
  }
  clearTimeout(state.timerId);
  state.timerId = setTimeout(runTimer, 1000);
}

const sessionLength = document.querySelector('.session .value');
const breakLength = document.querySelector('.break .value');
const counter = document.querySelector('.timer .counter');

const control = document.querySelector('.control');
const startButton = document.querySelector('.start-pause');

control.addEventListener('click', handleInput);
startButton.addEventListener('click', timerHandler);