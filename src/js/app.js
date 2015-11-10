import {Collapse} from '../components/pkg.collapse/collapse';
import {MobileNav} from '../components/pkg.mobilenav/mobilenav';
import {Ajax} from '../components/js.ajax/ajax';
import {Tooltips} from '../components/pkg.tooltip/tooltip';
import {Carousel} from '../components/pkg.carousel/carousel';
import {Modal} from '../components/pkg.modal/modal';

/**
 * The jQuery plugin namespace.
 * @external "$.slick"
 * @see {@link http://kenwheeler.github.io/slick/|Slick jQuery Plugin}
 */
import './thirdparty/slick.js';

console.log('123');

let worker = new Worker('/assets/js/webworkers/worker.js');
worker.onmessage = function(e) {
	//console.log(e.data);
};
worker.onerror = function(e) {
	//console.log(e);
};
worker.postMessage({'value':'echo from babel testing'});

window.data = {
	title: 'data binding'
}

var init = function() {
	var collapse = new Collapse('click');
	var ajax = new Ajax();

	var modal = new Modal();
	
	/* Carousel */
	let carousels = document.querySelectorAll('.carousel');
	for (var i =0, il = carousels.length; i <il; i++) {
		new Carousel(carousels[i],i);
	};

	var tooltips = new Tooltips();
}

window.onload = init;

/* MobileNav */
let menu = document.getElementsByClassName('page__nav');
if (menu.length > 0){
	for (let m = 0; m < menu.length; m++){
		new MobileNav(menu[m], document.getElementsByClassName('page__nav-show'));
	}
}
