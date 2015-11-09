import {events} from '../js.events/events';
import * as dom from '../js.dom/dom';

/**
* @class Tooltips
* @classdesc Tooltips module initialised by adding .tooltip class to an element
* Tooltip module
* @global
*/
class Tooltips {
    /**
     * @constructor
     */
    constructor() {
        this._init();
    }
    
    _init(){
        this.tooltipList = document.querySelectorAll('[data-tooltip-type="enhanced"]');
        if(!this.tooltipList.length) return false;

        this.tooltips = [];
        this._addTooltipLayer();
        this._addTooltips();
    }
    
    _addEvents(tooltip){
        events.on(tooltip.trigger,'mouseover', evt => {
            this._show(tooltip.el);
        })
        events.on(tooltip.trigger,'mouseout', evt => {
            this._hide(tooltip.el);
        });
    }
    
    _storeDimensions(tooltip){
        let position = tooltip.trigger.getBoundingClientRect();
        
        tooltip.el.style.display="block";
        
        let parentSize = {
            x:tooltip.trigger.offsetWidth,
            y:tooltip.trigger.offsetHeight
        }
        
        let size = {
            x:tooltip.el.offsetWidth,
            y:tooltip.el.offsetHeight
        }
        
        let offset ={
            x:tooltip.trigger.hasAttribute('data-tooltip-offset-x') ? parseInt(tooltip.trigger.getAttribute('data-tooltip-offset-x')) : 0,
            y:tooltip.trigger.hasAttribute('data-tooltip-offset-y') ? parseInt(tooltip.trigger.getAttribute('data-tooltip-offset-y')) : 0
        } 
        
        tooltip.el.style.display="";
        
        //set position based on css class
        if(dom.hasClass(tooltip.trigger,'tooltip--top')){
            tooltip.el.style.left = (position.left+offset.x)+"px";
            tooltip.el.style.top = (position.top-size.y+offset.y)+"px";
        }
        else if(dom.hasClass(tooltip.trigger,'tooltip--bottom')){
            tooltip.el.style.left = (position.left+offset.x)+"px";
            tooltip.el.style.top = (position.top+parentSize.y+offset.y)+"px";
        }
        else if(dom.hasClass(tooltip.trigger,'tooltip--left')){
            tooltip.el.style.left = (position.left-size.x+offset.x)+"px";
            tooltip.el.style.top = (position.top+offset.y)+"px";
        }
        else if(dom.hasClass(tooltip.trigger,'tooltip--right')){
            tooltip.el.style.left = (position.left+parentSize.x+offset.x)+"px";
            tooltip.el.style.top = (position.top+offset.y)+"px";
        }
    }
    
    _addTooltipLayer(){
        this.tooltipLayer = document.createElement('div');
        this.tooltipLayer.className="tooltip-overlay";
        document.querySelector('body').appendChild(this.tooltipLayer);
    }
    
    _addTooltips(){
        Object.keys(this.tooltipList).forEach(key => {
            this._addTooltip(this.tooltipList[key]);
        })
    }
    
    _addTooltip(tooltip){
        var tt = {
            trigger:tooltip,
            el:tooltip.querySelector('.tooltip__text')
        }
        
        this.tooltipLayer.appendChild(tt.el);
        
        this._addEvents(tt);
        this._storeDimensions(tt);
        this.tooltips.push(tt);
    }
    
    _show(el){
        el.style.display = "block";
        dom.addClass (el,'animated');
        dom.addClass (el,'fadeIn');
    }
    
    _hide(el){
        //set display to none
        el.style.display = "none";
        dom.removeClass (el,'animated');
        dom.removeClass (el,'fadeIn');
    }
    
   
    
}
export { Tooltips };
