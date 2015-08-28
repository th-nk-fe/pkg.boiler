'use strict';

Object.defineProperty(exports, '__esModule', {
	value: true
});

var _get = function get(_x, _x2, _x3) { var _again = true; _function: while (_again) { var object = _x, property = _x2, receiver = _x3; desc = parent = getter = undefined; _again = false; if (object === null) object = Function.prototype; var desc = Object.getOwnPropertyDescriptor(object, property); if (desc === undefined) { var parent = Object.getPrototypeOf(object); if (parent === null) { return undefined; } else { _x = parent; _x2 = property; _x3 = receiver; _again = true; continue _function; } } else if ('value' in desc) { return desc.value; } else { var getter = desc.get; if (getter === undefined) { return undefined; } return getter.call(receiver); } } };

var _createClass = (function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ('value' in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; })();

function _interopRequireWildcard(obj) { if (obj && obj.__esModule) { return obj; } else { var newObj = {}; if (obj != null) { for (var key in obj) { if (Object.prototype.hasOwnProperty.call(obj, key)) newObj[key] = obj[key]; } } newObj['default'] = obj; return newObj; } }

function _inherits(subClass, superClass) { if (typeof superClass !== 'function' && superClass !== null) { throw new TypeError('Super expression must either be null or a function, not ' + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass; }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError('Cannot call a class as a function'); } }

var _libComponentsJsEventsEvents = require('../../../lib/components/js.events/events');

var _libComponentsJsDomDom = require('../../../lib/components/js.dom/dom');

var dom = _interopRequireWildcard(_libComponentsJsDomDom);

/**
* @class Carousel
* @classdesc JS carousel panels
* @global
*/

var Carousel = (function () {
	/**
  * @constructor
  */

	function Carousel(elem) {
		_classCallCheck(this, Carousel);

		this.pageWidth = 0;
		this.carousels = [];
		this.use_transform = dom.hasClass(document.documentElement, 'csstransforms3d');
		this.css_prefix_transform = typeof Modernizr !== 'undefined' ? Modernizr.prefixed('transform') : 'transform';

		var that = this;
		_libComponentsJsEventsEvents.events.on(window, 'resize', function () {
			that.resized();
		});
		this.init(elem);
	}

	_createClass(Carousel, [{
		key: 'init',
		value: function init() {
			var elems = document.querySelectorAll('.carousel');

			for (var i = 0, il = elems.length; i < il; i++) {
				this.carousels.push(new Carouselle(elems[i], i));
			};
		}
	}, {
		key: 'resized',
		value: function resized() {
			for (var i = 0, il = this.carousels.length; i < il; i++) {
				this.carousels[i].setSize();
			};
		}
	}, {
		key: 'getTransformString',
		value: function getTransformString(x, y) {
			var str;
			if (isNaN(x)) {
				str = this.is_ie ? 'auto' : 'initial';
			} else {
				str = this.is_ie ? x + 'px' : 'translate3d(' + x + 'px, ' + y + 'px, 0)';
			}
			return str;
		}
	}]);

	return Carousel;
})();

var Carouselle = (function (_Carousel) {
	_inherits(Carouselle, _Carousel);

	/**
  * @constructor
  */

	function Carouselle() {
		_classCallCheck(this, Carouselle);

		for (var _len = arguments.length, args = Array(_len), _key = 0; _key < _len; _key++) {
			args[_key] = arguments[_key];
		}

		_get(Object.getPrototypeOf(Carouselle.prototype), 'constructor', this).apply(this, args);
	}

	_createClass(Carouselle, [{
		key: 'init',
		value: function init(elem) {
			this.elem = elem;

			this.animate = this.elem.getAttribute('data-autoscroll') !== null || false;
			this.infinate = this.elem.getAttribute('data-infinate') !== null || false;
			this.pagination = this.elem.getAttribute('data-pagination') !== null || false;
			this.direction = this.elem.getAttribute('data-direction') || 'ltr';
			this.time_interval = this.elem.getAttribute('data-time') || 5000;
			this.inview = this.elem.getAttribute('data-inview') || 1;

			this.container = elem.querySelector('.carousel__container');
			this.panels = [].slice.call(elem.querySelectorAll('.carousel__panel'));
			this.panels_len = this.panels.length;
			this.horizontal = this.direction === 'rtl' || this.direction === 'ltr';
			this.opposite = this.direction === 'rtl' || this.direction === 'btt';

			if (this.infinate) {
				this.appendClones();
			};

			if (this.opposite) {
				this.position = this.infinate ? this.panels_len - this.inview * 2 : this.panels_len - 1;
			} else {
				this.position = this.infinate ? this.inview : 0;
			}

			this.panels_percent = 100 / this.panels_len;

			this.setPosition = this.horizontal ? this.setPositionX : this.setPositionY;

			this.setSize();

			if (this.animate) {
				this.animatePosition = this.opposite ? this.movePrevious : this.moveNext;
				this.startAnim();
			}

			if (this.pagination) {
				this.addPagination().bindPaginationEvents();
			}

			this.bindTouchEvents();
		}
	}, {
		key: 'addPagination',
		value: function addPagination() {
			var _this = this;

			var list = document.createElement('ul');
			this.elem.appendChild(list);
			dom.addClass(list, 'carousel__pagination list--inline');

			var len;
			if (this.infinate) {
				len = this.panels_len - this.inview * 2 + 2;
			} else {
				len = this.panels_len + 2;
			}

			var _loop = function () {
				var label = undefined;
				var callback = undefined;
				if (i == 0) {
					label = '<';
					callback = _this.previousPanel;
				} else if (i == len - 1) {
					label = '>';
					callback = _this.nextPanel;
				} else {
					label = i;
					callback = _this.goTo;
				}
				var li = document.createElement('li');
				var anchor = document.createElement('a');
				var txt = document.createTextNode(label);

				list.appendChild(li);
				li.appendChild(anchor);
				anchor.appendChild(txt);

				var that = _this;

				clickEvent = (function (n, cb) {
					return function () {
						that.stopAnim();
						that.elem.setAttribute('data-autoscroll', 'animating');

						var page;
						if (!that.opposite || that.direction === 'btt') {
							//cant reorder stacking
							page = parseInt(n) - 1;
							if (that.infinate) {
								page += parseInt(that.inview);
							}
						} else {
							page = that.panels_len - parseInt(n);
							if (that.infinate) {
								page -= parseInt(that.inview);
							}
						}

						cb.call(that, page);
					};
				})(i, callback);

				_libComponentsJsEventsEvents.events.on(anchor, 'click', clickEvent);
			};

			for (var i = 0; i < len; i++) {
				var clickEvent;

				_loop();
			}

			return this;
		}
	}, {
		key: 'bindPaginationEvents',
		value: function bindPaginationEvents() {
			return this;
		}
	}, {
		key: 'setSize',
		value: function setSize() {
			if (this.horizontal) {
				this.setContainerWidth().setPanelWidth();
			} else {
				this.setContainerHeight().setPanelHeight();
			}

			this.setPosition(this.position);
		}
	}, {
		key: 'bindTouchEvents',
		value: function bindTouchEvents() {
			var that = this;

			delete Hammer.defaults.cssProps.userSelect;
			var hammer = new Hammer(this.elem, { drag_lock_to_axis: true });

			if (this.horizontal) {
				this.dragEnd = this.dragEndX;
				hammer.get('pan').set({ direction: Hammer.DIRECTION_HORIZONTAL, threshold: 0 });
			} else {
				this.dragEnd = this.dragEndY;
				hammer.get('pan').set({ direction: Hammer.DIRECTION_VERTICAL, threshold: 0 });
			}

			hammer.on('pan', function (e) {
				switch (e.direction) {
					case 2:
					case 4:
						if (that.horizontal) {
							that.dragX(e);
						}
						break;
					case 8:
					case 16:
						if (!that.horizontal) {
							that.dragY(e);
						}
						break;
				};
			}).on('panstart', function (e) {
				that.stopAnim();
			}).on('panend', function (e) {
				that.dragEnd(e);
			});
		}
	}, {
		key: 'drag',
		value: function drag(distance, size) {
			if (distance > 0 && distance > size) {
				distance = size;
			}
			if (distance < 0 && distance < -size) {
				distance = -size;
			}
			this.setPosition(this.position, distance);
		}
	}, {
		key: 'dragX',
		value: function dragX(e) {
			this.drag(e.deltaX, this.getCarouselWidth() / this.inview);
		}
	}, {
		key: 'dragY',
		value: function dragY(e) {
			this.drag(e.deltaY, this.getCarouselHeight() / this.inview);
		}
	}, {
		key: 'dragFin',
		value: function dragFin(distance, size) {
			var abDistance = Math.abs(distance);

			if (abDistance >= size / 2) {
				if (distance < 0) {
					this.moveNext(distance);
				} else {
					this.movePrevious(distance);
				}
			}
			this.elem.setAttribute('data-autoscroll', 'animating');
			this.setPosition(this.position);
		}
	}, {
		key: 'dragEndX',
		value: function dragEndX(e) {
			this.dragFin(e.deltaX, this.getCarouselWidth() / this.inview);
		}
	}, {
		key: 'dragEndY',
		value: function dragEndY(e) {
			this.dragFin(e.deltaY, this.getCarouselHeight() / this.inview);
		}
	}, {
		key: 'startAnim',
		value: function startAnim() {
			this.setAnimInterval(this.time_interval);
		}
	}, {
		key: 'stopAnim',
		value: function stopAnim() {
			this.elem.setAttribute('data-autoscroll', 'stop');
			this.interval = null;
			this.animate = false;
		}
	}, {
		key: 'nextPanel',
		value: function nextPanel(e) {
			this.moveNext();
		}
	}, {
		key: 'goTo',
		value: function goTo(n) {
			this.position = n;
			this.setPosition(this.position);
		}
	}, {
		key: 'previousPanel',
		value: function previousPanel(e) {
			this.movePrevious();
		}
	}, {
		key: 'setAnimInterval',
		value: function setAnimInterval(time) {
			var that = this;
			this.interval = setTimeout(function () {
				if (that.animate) {
					that.animatePosition();
				}
			}, time);
		}
	}, {
		key: 'moveNext',
		value: function moveNext(drag) {
			this.position++;

			if (this.infinate && this.position % this.panels_len == this.panels_len - this.inview) {
				this.elem.setAttribute('data-autoscroll', 'true');
				this.position = this.inview - 1;
				this.setPosition(this.position, drag);
				this.position++;
			};

			this.setPosition(this.position, drag);
			this.elem.setAttribute('data-autoscroll', 'animating');

			if (this.animate) {
				this.setAnimInterval(this.time_interval);
			}
		}
	}, {
		key: 'movePrevious',
		value: function movePrevious(drag) {
			this.position--;

			if (this.infinate && this.position < this.inview - 1) {
				if (this.infinate) {
					this.elem.setAttribute('data-autoscroll', 'true');
					this.position = this.panels_len - this.inview - 1;

					this.setPosition(this.position, drag);
					this.position--;
				} else {
					this.position = this.panels_len - 1;
				}
			} else if (this.position < 0) {
				this.position = this.panels_len - 1;
			}

			this.setPosition(this.position, drag);
			this.elem.setAttribute('data-autoscroll', 'animating');

			if (this.animate) {
				this.setAnimInterval(this.time_interval);
			}
		}
	}, {
		key: 'appendClones',
		value: function appendClones() {
			var clones_last = [];
			var clones_first = [];
			for (var i = 0, il = this.inview; i < il; i++) {
				clones_last.push(this.panels[this.panels_len - (1 + i)].cloneNode(true));
				clones_first.push(this.panels[i].cloneNode(true));
			}

			for (var i = 0, il = this.inview; i < il; i++) {
				var clone_last = clones_last[i];
				var clone_first = clones_first[i];

				this.container.appendChild(clone_first);
				this.container.insertBefore(clone_last, this.container.firstChild);

				this.panels_len += 2;

				this.panels.unshift(clone_first);
				this.panels.push(clone_last);
			}
		}
	}, {
		key: 'setPositionX',
		value: function setPositionX(n, drag) {
			var pixels = n % this.panels_len * -(this.getCarouselWidth() / this.inview);
			if (drag) {
				pixels += drag;
			}
			this.setTransform(pixels, 0);
			return this;
		}
	}, {
		key: 'setPositionY',
		value: function setPositionY(n, drag) {
			var pixels = n % this.panels_len * -(this.getCarouselHeight() / this.inview);
			if (drag) {
				pixels += drag;
			}
			this.setTransform(0, pixels);
			return this;
		}
	}, {
		key: 'setTransform',
		value: function setTransform(x, y) {
			if (this.use_transform) {
				this.container.style[this.css_prefix_transform] = 'translate3d(' + x + 'px, ' + y + 'px, 0)';
			} else {
				this.container.style['left'] = x + 'px';
				this.container.style['top'] = y + 'px';
			}
		}
	}, {
		key: 'setContainerWidth',
		value: function setContainerWidth() {
			var w = 100 / this.inview * this.panels_len;
			this.container.style.width = w + '%';

			return this;
		}
	}, {
		key: 'setContainerHeight',
		value: function setContainerHeight() {
			var h = 100 / this.inview * this.panels_len;
			this.container.style.height = h + '%';

			return this;
		}
	}, {
		key: 'getCarouselWidth',
		value: function getCarouselWidth() {
			return this.elem.clientWidth;
		}
	}, {
		key: 'getCarouselHeight',
		value: function getCarouselHeight() {
			return this.elem.clientHeight;
		}
	}, {
		key: 'setPanelWidth',
		value: function setPanelWidth() {
			for (var i = 0, il = this.panels_len; i < il; i++) {
				this.panels[i].style.width = this.panels_percent + '%';
			};

			return this;
		}
	}, {
		key: 'setPanelHeight',
		value: function setPanelHeight() {
			for (var i = 0, il = this.panels_len; i < il; i++) {
				this.panels[i].style.height = this.panels_percent + '%';
			};

			return this;
		}
	}]);

	return Carouselle;
})(Carousel);

exports.Carousel = Carousel;
exports.Carouselle = Carouselle;