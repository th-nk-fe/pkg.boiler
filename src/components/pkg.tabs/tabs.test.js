import {Tabs} from './tabs';

describe('Tabs tests', function() {
    
    beforeEach(function(){
        var tabMarkup = '<div id="tab" class="tabs"><ul class="tabs__nav"><li><a href="#content1">Tab 1</a></li><li><a href="#content2">Tab 2</a></li></ul><div class="tabs__content"><div id="content1"><p>Tab 1 content</p></div><div id="content2"><p>Tab 2 content</p></div></div></div>';
        document.body.insertAdjacentHTML('afterbegin', tabMarkup);
        new Tabs();
    })
    
    afterEach(function(){
        document.body.removeChild(document.getElementById('tab'));
    })
    
    it('should hide the second tab by default', function() {
        var tab2 = document.getElementById('content2');
        var hasClass = tab2.classList.contains('hide');
        var style = window.getComputedStyle(tab2);
        expect(style.display).toBe('none');
    });
    
    it('should show the second tab and hide the first when the second tab trigger is clicked', function() {
        var trigger2 = document.querySelector('.tabs__nav > li:nth-child(2) > a');
        var tab1 = document.getElementById('content1');
        var tab2 = document.getElementById('content2');
        var clickevent = document.createEvent('HTMLEvents');
        clickevent.initEvent('click', true, false);
        trigger2.dispatchEvent(clickevent);
        
        var style1 = window.getComputedStyle(tab1);
        var style2 = window.getComputedStyle(tab2);
        
        expect(style1.display).toBe('none');
        expect(style2.display).toBe('block');
    });
    
    
});