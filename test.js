var test = require("tape").test;
var idleTimer = require("./index");

test('idleTimer is a function', function (t) {
	t.equal(typeof idleTimer , "function");
	t.end();
});
