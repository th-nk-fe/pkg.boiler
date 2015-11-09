import {Tooltips} from './tooltip';

describe('Tooltip tests', function() {
    
    beforeEach(function(){
        var tooltipLink = '<a id="tooltip" style="position:absolute;top:100px;left:100px;" class="btn tooltip tooltip--top" data-tooltip-type="enhanced"><span class="tooltip__text">tooltip text top</span>top tooltip</a>';
        document.body.insertAdjacentHTML('afterbegin', tooltipLink);
        new Tooltips();
    })
    
    afterEach(function(){
        document.body.removeChild(document.getElementById('tooltip'));
    })
    
    it('should be visible on hover', function() {
        var tt = document.getElementById('tooltip');
        var hoverevent = document.createEvent('HTMLEvents');
        hoverevent.initEvent('mouseover', true, false);
        tt.dispatchEvent(hoverevent);
        var tooltipEl = document.querySelector('.tooltip__text');
        var style = window.getComputedStyle(tooltipEl);
        expect(style.display).toBe('block');
    });
    
    it('should have the correct left position', function() {
        var tooltipEl = document.querySelector('.tooltip__text');
        var style = window.getComputedStyle(tooltipEl);
        expect(style.left).toBe('100px');
    });
    
    it('should have the correct top position', function() {
        var tooltipEl = document.querySelector('.tooltip__text');
        var height = tooltipEl.offsetHeight;
        var style = window.getComputedStyle(tooltipEl);
        expect(style.top).toBe((100-height)+"px");
    });
    
});