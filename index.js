/**
 * idleTimer
 *
 * If user is idle for idleTime fire callback
 * 
 * @param {object} options
 *    - {function} callback - fired when user is idle
 *    - {Number} idleTime - time in milliseconds  
 */

module.exports = idleTimer;

function idleTimer(options) {
  options = options || {};
  var callback = options.callback || function() {};
  var idleTime = options.idleTime || 60000;
  var timer;
  
  window.onload = resetTimer;
  document.onmousemove = resetTimer;
  document.onscroll = resetTimer;
  document.onkeypress = resetTimer;

  resetTimer();

  function resetTimer() {
    clearTimeout(timer);
    timer = setTimeout(callback, idleTime);
  }
}