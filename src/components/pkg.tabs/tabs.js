import {events} from '../js.events/events';
import * as dom from '../js.dom/dom';

/**
 * @class Tabs
 * @classdesc Tabs module
 * Tabs module
 * @global
 */
class Tabs {
    /**
     * @constructor
     */
    constructor() {
        let tabCollections = document.querySelectorAll('.tabs');
        Object.keys(tabCollections).forEach(key => {
            this._init(tabCollections[key]);
        })
    }
    
    _init(el){
        this._hidePanels(el);
        this._bindEvents(el);
    }
    
    _hidePanels(el){
        //check for active
        let activeTab = 0;
        let nav = el.querySelectorAll('.tabs__nav > li');
        Object.keys(nav).forEach(key => {
            if(dom.hasClass(nav[key].querySelector('a'),'active')){
                activeTab = parseInt(key);
            }
        })
        
        //show active panel and hide panels that aren't active
        this._showPanel(el,activeTab)
    }
    
    _bindEvents(el){
        let nav = el.querySelectorAll('.tabs__nav > li > a');
        Object.keys(nav).forEach(key => {
            events.on(nav[key],'click', evt => {
                 this._showPanel(el,key)
            })
        })
    }
    
    _showPanel(el,panelNumber){
        let panels = el.querySelectorAll('.tabs__content > div');
        let nav = el.querySelectorAll('.tabs__nav > li > a');
        Object.keys(panels).forEach(key => {
            if(key!=panelNumber){
                dom.addClass(panels[key],'hide');
                dom.removeClass(nav[key],'active');
            }
            else{
                dom.removeClass(panels[key],'hide');
                dom.addClass(nav[key],'active');
            }
        })
    }
    
}
export { Tabs };
