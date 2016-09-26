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

  addOrRemoveEvents('addEventListener');
  resetTimer();

  function addOrRemoveEvents(addOrRemove) {
    window[addOrRemove]('load', resetTimer);
    document[addOrRemove]('mousemove', resetTimer);
    document[addOrRemove]('scroll', resetTimer);
    document[addOrRemove]('keypress', resetTimer);
  }

  function resetTimer() {
    clearTimeout(timer);
    timer = setTimeout(callback, idleTime);
  }

  return {
    destroy: function() {
      clearTimeout(timer);
      addOrRemoveEvents('removeEventListener');
    }
  };
}
