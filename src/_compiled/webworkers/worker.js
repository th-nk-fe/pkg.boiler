'use strict';

function echo(str) {
	console.log('web worker test .ts ' + str);
}

self.onmessage = function (e) {
	var x = e.data.value;
	echo(x);
};