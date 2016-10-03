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
  activate();

  function addOrRemoveEvents(addOrRemove) {
    window[addOrRemove]('load', activate);
    document[addOrRemove]('mousemove', activate);
    document[addOrRemove]('scroll', activate);
    document[addOrRemove]('keypress', activate);
  }

  function activate() {
    if (!isActive) {
      isActive = true;
      activeCallback();
    }
    clearTimeout(timer);
    timer = setTimeout(idle, idleTime);
  }

  function idle() {
    if (!isActive) return;
    isActive = false;
    callback();
  }

  function destroy() {
    clearTimeout(timer);
    addOrRemoveEvents('removeEventListener');
  }

  return {
    activate: activate,
    destroy: destroy,
    idle: idle
  };
}
