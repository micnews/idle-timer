var test = require("tape").test;
var idleTimer = require("./index");

test('idleTimer is a function', function (t) {
  t.equal(typeof idleTimer , "function");
  t.end();
});

test('idleTimer.destroy removes the listeners', function (t) {
  var foo = 'nothing happened';
  t.plan(1);
  idleTimer({
    callback: function() {
      foo = 'beep';
    },
    idleTime: 10
  }).destroy();
  setTimeout(function() {
    t.equal(foo, 'nothing happened');
  }, 11);
});

test('idleTimer callback gets called after being idle', function (t) {
  var foo;
  t.plan(2);
  t.equal(foo, undefined);
  idleTimer({
    callback: function() {
      foo = 'beep';
    }, 
    idleTime: 10
  });
  setTimeout(function() {
    t.equal(foo, "beep");
  }, 11);
});

test('idleTimer activeCallback gets called after user activity', function (t) {
  var activeCalls = 0;
  var idleCalls = 0;
  t.plan(10);
  idleTimer({
    activeCallback: function() {
      activeCalls++;
    }, 
    callback: function() {
      idleCalls++;
    }, 
    idleTime: 10
  });
  setTimeout(function() {
    t.equal(activeCalls, 0, 'active initial');
    t.equal(idleCalls, 0, 'idle initial');
  }, 9);
  setTimeout(function() {
    t.equal(activeCalls, 0, 'active afrter first sleep');
    t.equal(idleCalls, 1, 'idle after first sleep');
  }, 11);
  setTimeout(function() {
    dispatchEvent(new Event('load'));
    setTimeout(function() {
      t.equal(activeCalls, 1, 'active after first activity');
      t.equal(idleCalls, 1, 'idle after first activity');
    }, 1);
    setTimeout(function() {
      t.equal(activeCalls, 1, 'active right before second sleep');
      t.equal(idleCalls, 1, 'idle right before second sleep');
    }, 9);
    setTimeout(function() {
      t.equal(activeCalls, 1, 'active after second sleep');
      t.equal(idleCalls, 2, 'idle after second sleep');
    }, 11);
  }, 12);
});

test('idleTimer activeCallback does not get called before first callback', function (t) {
  var activeCalls = 0;
  var idleCalls = 0;
  t.plan(2);
  idleTimer({
    activeCallback: function() {
      activeCalls++;
    }, 
    callback: function() {
      idleCalls++;
    }, 
    idleTime: 10
  });
  dispatchEvent(new Event('load'));
  setTimeout(function() {
    t.equal(activeCalls, 0);
    t.equal(idleCalls, 0);
  }, 5);
});
