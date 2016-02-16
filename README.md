# idle-timer
Checks if a user is idle for a configurable amount of time and fires a callback


### Usage
```js
idleTimer({
  callback: callbackFn,
  idleTime: 5000
})
function callbackFn () {
  console.log("You're idle!");
}
```
