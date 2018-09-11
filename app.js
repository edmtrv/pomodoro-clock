function handleChange(e) {
  if (e.target.dataset.type === 'session') {
    const sessionValue = change(e.target.dataset.action, sessionLength.textContent);
    sessionLength.textContent = sessionValue;
    timerLength.textContent = `${leftPad("00", sessionValue)}:00`;
  } else if (e.target.dataset.type === 'break') {
    const breakValue = change(e.target.dataset.action, breakLength.textContent);
    breakLength.textContent = breakValue;
  }
}

function change(action, value) {
  let numericValue = +value;

  if (action === 'inc') {
    if (numericValue > 49) return numericValue;
    numericValue += 1;
  } else {
    if (numericValue < 2) return numericValue;
    numericValue -= 1;
  }

  return numericValue + "";
}

function leftPad(pad, str) {
  if (typeof str === 'undefined') {
    return pad;
  }

  return (pad + str).slice(-pad.length);
}

const sessionLength = document.querySelector('.session .value');
const breakLength = document.querySelector('.break .value');
const timerLength = document.querySelector('.timer .counter');

const control = document.querySelector('.control');

control.addEventListener('click', handleChange);