import {events} from  '../../../lib/components/js.events/events';
import * as dom from '../../../lib/components/js.dom/dom';

/**
* @class Modal
* @classdesc Modal module initialised by adding .modal class to an element
* Modal module
* @global
*/
class Modal {
    
    /**
     * @constructor
     */
    constructor(modals,triggers) {

        this.modals = modals || document.querySelectorAll('.modal');
        this.triggers = triggers || document.querySelectorAll('.modal-trigger');
        
        //Add open events to triggers
        for (var i = 0; i < this.triggers.length; i++){
            this._addEvents(this.triggers[i]);
        }        
        
        //Add close events to the modals
        for (var i = 0; i < this.modals.length; i++){
            this._addCloseEvents(this.modals[i]);
        }             
    }
    
    /**
     * Assign events to trigger modal opening
     * @memberOf Modal
     * @param {object} trigger - .modal-trigger DOM element
     */
    _addEvents(trigger) {
        
        let elementType = trigger.nodeName,
            target;
        
        //Click trigger to show modal
        events.on(trigger,'click', evt => {
            
            if (elementType == 'A'){
                evt.preventDefault();
                target = trigger.getAttribute('href');
            }else if (trigger.getAttribute('data-modal-href')){
                target = trigger.getAttribute('data-modal-href');
            }else {
                return false;   
            }
            
            this._showModal(target);
            
        });
    }  
    
    /**
     * Assign events to close the modal
     * @memberOf Modal
     * @param {object} target - .modal DOM element
     */
    _addCloseEvents(target) {
        
        let closeTriggers = target.querySelectorAll('.modal__close');

        //close buttons if used
         for (var i = 0; i < closeTriggers.length; i++){
            events.on( closeTriggers[i] ,'click', evt => {
                this._hideModal();
            });
        }        
        
        //bg close if used
        if (target.getAttribute('data-bg-close')){
            events.on( target ,'click', evt => {
                if (evt.target == target){
                    this._hideModal();
                }
            });
        }
    } 
    
     /**
     * Show modal handler
     * @memberOf Modal
     * @param {target} String - modal content to show
     */
    _showModal(target) {
        
        this.modalTarget = document.querySelector(target);
            
        if (this.modalTarget){
            dom.addClass(document.querySelector(target), 'active');
        }        
    } 
    
    /**
     * Hide the modal
     * @memberOf Modal
     */
    _hideModal() {
        dom.removeClass(this.modalTarget, 'active');    
    }    
    
}

export { Modal };
