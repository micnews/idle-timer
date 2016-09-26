/**
 * idleTimer
 *
 * If user is idle for idleTime fire callback
 * 
 * @param {object} options
 *    - {function} callback - fired when user is idle
 *    - {function} activeCallback - fired when user is active
 *    - {Number} idleTime - time in milliseconds  
 */

module.exports = idleTimer;

function idleTimer(options) {
  options = options || {};
  var callback = options.callback || function() {};
  var activeCallback = options.activeCallback || function() {};
  var idleTime = options.idleTime || 60000;
  var isActive = true;
  var timer;

  addOrRemoveEvents('addEventListener');
  resetTimer();

  function addOrRemoveEvents(addOrRemove) {
    window[addOrRemove]('load', resetTimer);
    document[addOrRemove]('mousemove', resetTimer);
    document[addOrRemove]('scroll', resetTimer);
    document[addOrRemove]('keypress', resetTimer);
  }

  function resetTimer() {
    if (!isActive) {
      isActive = true;
      activeCallback();
    }
    clearTimeout(timer);
    timer = setTimeout(function() {
      isActive = false;
      callback();
    }, idleTime);
  }

  return {
    destroy: function() {
      clearTimeout(timer);
      addOrRemoveEvents('removeEventListener');
    }
  };
}
