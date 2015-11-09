class TestModule {
    /**
     * @constructor
     */
    constructor() {
        this._init();
    }
    
    _init(){
        console.log('test module loaded');
    }
   
    
}
export { TestModule };
