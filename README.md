#TH_NK pkg.boiler
>Front end development boilerplate / standards implementation

###usage

install ruby [http://rubyinstaller.org/downloads/](http://rubyinstaller.org/downloads/)
```shell
gem install sass
```

```shell
npm clean cache

npm install
```

```shell
grunt
```

##grunt

###included dependencies

```js
"devDependencies": {
    "babelify": "^6.1.0",
    "bower": "^1.2.12",
    "grunt": "~0.4.1",
    "grunt-asset-cachebuster": "^0.3.1",
    "grunt-babel": "^5.0.1",
    "grunt-bower-install-simple": "^1.1.3",
    "grunt-browserify": "^3.8.0",
    "grunt-cache-bust": "^0.4.13",
    "grunt-concurrent": "^2.0.0",
    "grunt-contrib-clean": "^0.6.0",
    "grunt-contrib-connect": "~0.2.0",
    "grunt-contrib-copy": "^0.8.0",
    "grunt-contrib-csslint": "^0.5.0",
    "grunt-contrib-cssmin": "^0.12.3",
    "grunt-contrib-imagemin": "~0.9.4",
    "grunt-contrib-uglify": "^0.9.1",
    "grunt-contrib-watch": "~0.3.1",
    "grunt-eslint": "~16.0.0",
    "grunt-exec": "^0.4.6",
    "grunt-grunticon": "^2.2.1",
    "grunt-htmlhint-plus": "^0.1.0",
    "grunt-jscs": "~1.8.0",
    "grunt-jsdoc": "~0.6.7",
    "grunt-modernizr": "^0.6.0",
    "grunt-newer": "^1.1.1",
    "grunt-open": "^0.2.3",
    "grunt-phantomas": "^0.12.0",
    "grunt-phantomcss": "git://github.com/anselmh/grunt-phantomcss.git",
    "grunt-postcss": "^0.5.5",
    "grunt-real-favicon": "0.0.4",
    "grunt-sass": "~1.0.0",
    "grunt-sass-convert": "^0.2.0",
    "grunt-stripmq": "0.0.6",
    "grunt-svgmin": "^2.0.1",
    "grunt-webp": "~0.0.4",
    "grunt-wiredep": "^2.0.0",
    "grunt-zetzer": "^2.0.0",
    "gulp": "^3.9.0",
    "gulp-sass": "^2.0.4",
    "jit-grunt": "^0.9.1",
    "phantomas": "^1.11.0",
    "phantomjs": "^1.9.7-14",
    "sassdoc": "^2.1.15",
    "sc5-styleguide": "^0.3.26",
    "time-grunt": "^1.2.1",
    "webp-bin": "^0.1.4"
}
```

##js
>[STYLEGUIDE](https://github.com/th-nk-fe/guide.js)

###compiler

>modular js using es6/esnext pattern

compile with either [babeljs](https://babeljs.io/) (greater ES6 support) or [typescript](http://www.typescriptlang.org/) (strongly typed, angular2.0) currently only compiles to commonJS, [jQuery](https://jquery.com/) is imported via npm for babel, src/js/lib/jquery.d.ts for typescript

set in Gruntfile.js
```js
data = {
    es6:'babel'
}
```

further info [es compatibility tables](http://kangax.github.io/compat-table/es5/)

###code checker/linter

grunt [JSCS](http://jscs.info/) and [ESLint](http://eslint.org/)

ide plugins available for sublime/visual studio

###docs
```
./docs/jsdoc
```

guide [JSDoc](http://usejsdoc.org/)

####TBD - JS
>
* [unit tests](http://stackoverflow.com/questions/300855/javascript-unit-test-tools-for-tdd)
* analytics - [tag manager](http://www.google.co.uk/tagmanager/)
* frameworks [ionic](http://ionicframework.com/) / [famous](http://famous.org/) / [angular](https://angularjs.org) / [angular 2](https://angular.io/)

##CSS
>[STYLEGUIDE](https://github.com/th-nk-fe/guide.js)

* SCSS SASS
* BEM notation
* [normalize.css](http://necolas.github.io/normalize.css/)
* [animate.css](https://daneden.github.io/animate.css/)

###docs
```
./docs/styleguide
```

guide [KSS](https://www.npmjs.com/package/grunt-kss)

####TBD - CSS
>
* frameworks [materialize.css](http://materializecss.com/) / [inuit.css](https://github.com/inuitcss) / [furtive](http://furtive.co/)
* mobile [sculpt](https://www.heartinternet.uk/sculpt?__ja=tsid:60927|cgn:6157437) / [framework7](http://www.idangero.us/framework7/#.VaO53_lVhuB) / [ionic](http://ionicframework.com/) / [clank](http://getclank.com/)

##HTML

>basic boilerplate included - [zetzer templating system](https://github.com/brainshave/zetzer)

```
./public/index.html
```

####TBD - HTML

* shims/shivs/fallbacks/boilerplates [polyfills](https://github.com/Modernizr/Modernizr/wiki/HTML5-Cross-Browser-Polyfills)
* markup guidelines - accessibility wai-aria [aria design patterns](http://www.creativebloq.com/html5/5-html5-and-aria-design-patterns-7133753) 