/**
* Events module
* @module events
* @global
*/
var events = {
    /**
    * Bind event to element
    * @memberOf module:events#
    * @param {object} el DOM element
    * @param {string} evt Event type
    * @param {function} fn Callback
    */
    on: function(el, evt, fn) { 
        if (!el) {
            return false;
        }

        if (el.addEventListener) { 
            this.addEvent = function(el, evt, fn) { 
                el.addEventListener(evt, fn, false); 
                return el; 
            }; 
        } else if (el.attachEvent) { 
            this.addEvent = function(el, evt, fn) { 
                el.attachEvent('on' + evt, fn); 
                return el; 
            }; 
        } else { 
            this.addEvent = function(el, evt, fn) { 
                el['on' + evt] = fn; 
                return el; 
            }; 
        } 
        return this.addEvent(el, evt, fn); 
    }, 
    /**
    * Remove event to element
    * @memberOf module:events#
    * @param {object} el DOM element
    * @param {string} evt Event type
    * @param {function} fn Callback
    */
    off: function(el, evt, fn) { 
        if (!el) {
            return false;
        }

        if (el.removeEventListener) { 
            this.removeEvent = function(el, evt, fn) { 
                el.removeEventListener(evt, fn, false); 
                return el; 
            }; 
        } else if (el.detachEvent) { 
            this.removeEvent = function(el, evt, fn) { 
                el.removeEvent('on' + evt, fn); 
                return el; 
            }; 
        } else { 
            this.removeEvent = function(el, evt, fn) { 
                el['on' + evt] = fn; 
                return el; 
            }; 
        } 
        return this.removeEvent(el, evt, fn); 
    },
    /**
    * Trigger event on element
    * @memberOf module:events#
    * @param {object} el DOM element
    * @param {string} evt Event type
    * @param {function} fn Callback
    */
    trigger: function(el, evt) {
        if (!el) {
            return false;
        }
        var _evt;

        if (document.createEvent) {
            _evt = document.createEvent('HTMLEvents');
            _evt.initEvent(evt, true, true);
        } 
        else {
            _evt = document.createEventObject();
            _evt.eventType = evt;
        }

        _evt.eventName = evt;

        if (document.createEvent) {
            el.dispatchEvent(_evt);
        } else {
            el.fireEvent('on' + _evt.eventType, _evt);
        }
    },
    /**
    * Cross browser e.preventDefault()
    * @memberOf module:events#
    * @param {string} evt Event type
    */
    cancel: function(evt) {
        if (!el) {
            return false;
        }

        if (evt.stopPropagation){
            evt.stopPropagation();
        }

        if (evt.preventDefault) { 
            evt.preventDefault();
        } else {
            evt.returnValue = false; 
        }
    }
}

export {events}
