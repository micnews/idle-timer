# idle-timer
Checks if a user is idle for a configurable amount of time and fires a callback

[![Build Status](https://travis-ci.org/micnews/idle-timer.svg)](https://travis-ci.org/micnews/idle-timer)


### Usage
```js
var timer = idleTimer({
  // function to fire after idle
  callback: callbackFn,
  // function to fire when active
  activeCallback: activeCallbackFn,
  // Amount of time in milliseconds before becoming idle. default 60000
  idleTime: 5000
})
function callbackFn () {
  console.log("You're idle!");
}

// when no longer needed, destroy() will remove
// all of the event listeners and clear the timeouts
timer.destroy();
```
