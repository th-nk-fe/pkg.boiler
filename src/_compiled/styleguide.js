'use strict';

var _libComponentsPkgCollapseCollapse = require('../../lib/components/pkg.collapse/collapse');

var _libComponentsPkgTooltipTooltip = require('../../lib/components/pkg.tooltip/tooltip');

var _libComponentsPkgMobilenavMobilenav = require('../../lib/components/pkg.mobilenav/mobilenav');

var _libComponentsPkgCarouselCarousel = require('../../lib/components/pkg.carousel/carousel');

var _libComponentsPkgModalModal = require('../../lib/components/pkg.modal/modal');

window.addEventListener('styleguide:onRendered', function () {
	var collapse = new _libComponentsPkgCollapseCollapse.Collapse('click', document.querySelectorAll('body /deep/ .collapse'));

	/* Carousel */
	var carousels = document.querySelectorAll('body /deep/ .carousel');
	for (var i = 0, il = carousels.length; i < il; i++) {
		new _libComponentsPkgCarouselCarousel.Carousel(carousels[i], i);
	};

	var modal = new _libComponentsPkgModalModal.Modal(document.querySelectorAll('body /deep/ .modal'), document.querySelectorAll('body /deep/ .modal-trigger'));

	var tooltips = new _libComponentsPkgTooltipTooltip.Tooltips();

	var menu = document.querySelectorAll('body /deep/ .page__nav');
	if (menu.length > 0) {

		for (var m = 0; m < menu.length; m++) {
			var nav = new _libComponentsPkgMobilenavMobilenav.MobileNav(menu[m], document.querySelectorAll('html /deep/ .page__nav-show'));
			nav.page = document.querySelector('html /deep/ .page');
		}
	}
}, false);