var tests = [
	{
		url:'./public/kitchensink.html',
		execute: function(postfix){
			casper.then( function() {
	            this.echo('screenshot:' + postfix);
				phantomcss.screenshot('.btn', 'button'+postfix);
	        })
			.then(function() {
				this.mouse.move('.btn');
				phantomcss.screenshot('.btn', 'button hover'+postfix);
			});
		}
	},
	{
		url:'./public/index.html',
		execute: function(postfix){
			casper.then( function() {
	            this.echo('screenshot:' + postfix);
				phantomcss.screenshot('header h1', 'heading'+postfix);
	        });
		}
	}
];

var viewportSizes = [
    [320,480],
    [1024,768]
	/*
    [320,480],
    [320,568],
    [600,1024],
    [1024,768],
    [1280,800],
    [1440,900]
	*/
];


casper.start();
 
casper.each(tests, function(self, test, n) {
	casper.each(viewportSizes, function(self, viewportSize, i) {

		var width = viewportSize[0],
			height = viewportSize[1],
			postfix = width + 'x' + height;

		casper.wait(500, function() {
			this.viewport(width, height);
			if(i==0){
				casper.thenOpen(test.url, function() {
					this.echo('opening:' + test.url);
				});
			}
			test.execute(postfix);
		});
	});
});