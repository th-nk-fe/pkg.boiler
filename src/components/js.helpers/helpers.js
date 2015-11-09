/**
* Generic Helpers Module
* @module helpers
* @global
*/

let getTransformValue = function(style) {
	return style['-webkit-transform']
	|| 	style['webkit-transform'] 
	|| 	style['transform']
	|| 	style.webkitTransform
	||	style['-moz-transform']
	|| 	style['moz-transform'] 
	|| 	style.MozTransform
	|| 	style.mozTransform;
}


let setTransformValue = function(style, value) {
 	style.webkitTransform = value;
    style.MozTransform = value;
    style.msTransform = value;
    style.OTransform = value;
    style.transform = value;
}


let getTransitionDuration = function(style) {
 	var time = style['-webkit-transition-duration']
    || style['transition-duration'];

	return parseFloat(time.split('s')[0]) * 1000;
    
}


module.exports = {
	/**
	* Retrieves a browser specific transition duration property in ms
	* @memberOf module:helpers#
	* @param {array} style
	*/
	getTransitionDuration: getTransitionDuration,
	/**
	* Retrieves a browser specific transform property
	* @memberOf module:helpers#
	* @param {array} style
	* @function
	*/
	getTransformValue: getTransformValue,
	/**
	* Sets a browser specific transform property
	* @memberOf module:helpers#
	* @param {array} style
	* @param {string} value
	* @function
	*/
	setTransformValue: setTransformValue
}