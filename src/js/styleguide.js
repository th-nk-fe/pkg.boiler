import {Collapse} from '../../lib/components/pkg.collapse/collapse';
import {Tooltips} from '../../lib/components/pkg.tooltip/tooltip';
import {MobileNav} from '../../lib/components/pkg.mobilenav/mobilenav';
import {Carousel} from '../../lib/components/pkg.carousel/carousel';
import {Modal} from '../../lib/components/pkg.modal/modal';

window.addEventListener('styleguide:onRendered', function() {
	var collapse = new Collapse('click', document.querySelectorAll('body /deep/ .collapse'));

	/* Carousel */
	let carousels = document.querySelectorAll('body /deep/ .carousel');
	for (var i =0, il = carousels.length; i <il; i++) {
		new Carousel(carousels[i],i);
	};

	var modal = new Modal(document.querySelectorAll('body /deep/ .modal'),document.querySelectorAll('body /deep/ .modal-trigger'));

	var tooltips = new Tooltips();

	var menu = document.querySelectorAll('body /deep/ .page__nav');	
	if (menu.length > 0){
		
		for (var m = 0; m < menu.length; m++){
			var nav = new MobileNav(menu[m], document.querySelectorAll('html /deep/ .page__nav-show'))
			nav.page = document.querySelector('html /deep/ .page');
		}
	}

}, false);

