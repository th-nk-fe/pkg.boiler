'use strict';

Object.defineProperty(exports, '__esModule', {
    value: true
});

var _createClass = (function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ('value' in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; })();

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError('Cannot call a class as a function'); } }

var TestModule = (function () {
    /**
     * @constructor
     */

    function TestModule() {
        _classCallCheck(this, TestModule);

        this._init();
    }

    _createClass(TestModule, [{
        key: '_init',
        value: function _init() {
            console.log('test module loaded');
        }
    }]);

    return TestModule;
})();

exports.TestModule = TestModule;