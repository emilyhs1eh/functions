// countdownTimer.js

var countdownTimerInterval;

document.getElementById('btn').addEventListener('click', function() {
  var minutes = document.getElementById('minutesInput').value;
  if (!isNaN(minutes) && minutes > 0) {
    startCountdownTimer(minutes);
    this.style.display = 'none';
    document.getElementById('resetBtn').style.display = 'inline-block';
    document.getElementById('main-sections').style.display = 'block';
  } else {
    alert('Please enter a valid number of minutes.');
  }
});

function startCountdownTimer(duration) {
  var timer = duration * 60, display = document.getElementById('countdown');
  countdownTimerInterval = setInterval(function() {
    var minutes = parseInt(timer / 60, 10),
        seconds = parseInt(timer % 60, 10);

    minutes = minutes < 10 ? '0' + minutes : minutes;
    seconds = seconds < 10 ? '0' + seconds : seconds;
    display.textContent = minutes + ':' + seconds;

    if (--timer < 0) {
      clearInterval(countdownTimerInterval);
      display.textContent = "Time's up!";
      document.getElementById('btn').style.display = 'inline-block';
      document.getElementById('resetBtn').style.display = 'none';
      document.getElementById('blackScreen').style.display = 'block';
    }
  }, 1000);
}

document.getElementById('resetBtn').addEventListener('click', function() {
  clearInterval(countdownTimerInterval);
  resetCountdownTimer();
  document.getElementById('btn').style.display = 'inline-block';
  this.style.display = 'none';
  document.getElementById('main-sections').style.display = 'none';
  document.getElementById('blackScreen').style.display = 'none';
});

function resetCountdownTimer() {
  document.getElementById('countdown').textContent = '00:00';
}

document.getElementById('redirectBtn').addEventListener('click', function() {
  window.location.href = 'detox.html';
});

const icons = document.querySelectorAll('.bottom-icons a');
icons.forEach(icon => {
  icon.addEventListener('click', e => {
    e.preventDefault();
    const targetId = icon.getAttribute('href').substring(1);
    const targetElement = document.getElementById(targetId);
    targetElement.scrollIntoView({ behavior: 'smooth' });
  });
});
