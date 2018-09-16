// internal representation of both timers in seconds
const state = {
  timers: {
    session: 1500,
    break: 300,
    currentTimer: -1
  },
  session: true,
  timerId: null,
  active: false
};

// control timers
function inputHandler(e) {
  if (!(state.timers.currentTimer === -1)) resetHandler();

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
  state.timers.currentTimer--;
  counter.textContent = timeString(state.timers.currentTimer);
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
  state.active = !state.active;

  if (state.active) {
    startButton.textContent = 'pause';
    setupTimer();
  } else {
    startButton.textContent = 'play_arrow';
    clearTimeout(state.timerId);
  }
}

function resetHandler() {
  clearTimeout(state.timerId);
  state.timers.session = 1500;
  state.timers.break = 300;
  state.timers.currentTimer = -1;
  sessionLength.textContent = state.timers.session / 60;
  breakLength.textContent = state.timers.break / 60;
  counter.classList.remove('breakAlert');
  counter.classList.remove('sessionAlert');
  counter.textContent = `${leftPad(state.timers.session / 60)}:00`;
  mode.textContent = 'Session';
  startButton.textContent = 'play_arrow';
  state.active = false;
}

function setupTimer() {
  if (state.timers.currentTimer === -1) {
    state.timers.currentTimer = state.session ? state.timers.session : state.timers.break;
  }

  if (state.session) {
    mode.textContent = 'Session';
    counter.classList.add('sessionAlert');
    counter.classList.remove('breakAlert');
  } else {
    mode.textContent = 'Break';
    counter.classList.add('breakAlert');
    counter.classList.remove('sessionAlert');
  }
  
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

const settings = document.querySelector('.settings');
const mode = document.querySelector('.mode');

const startButton = document.querySelector('.start-pause');
const resetButton = document.querySelector('.reset'); 

settings.addEventListener('click', inputHandler);
startButton.addEventListener('click', timerHandler);
resetButton.addEventListener('click', resetHandler);