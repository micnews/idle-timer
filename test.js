var test = require("tape").test;
var idleTimer = require("./index");

test('idleTimer is a function', function (t) {
	t.equal(typeof idleTimer , "function");
	t.end();
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
