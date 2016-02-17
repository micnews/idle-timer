# idle-timer
Checks if a user is idle for a configurable amount of time and fires a callback

[![Build Status](https://travis-ci.org/micnews/idle-timer.svg)](https://travis-ci.org/micnews/idle-timer)


### Usage
```js
idleTimer({
  // function to fire after idle
  callback: callbackFn,
  // Amount of time in milliseconds before becoming idle. default 60000
  idleTime: 5000
})
function callbackFn () {
  console.log("You're idle!");
}
```
