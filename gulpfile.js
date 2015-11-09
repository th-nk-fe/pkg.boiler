var gulp = require('gulp');
var styleguide = require('sc5-styleguide');
var sass = require('gulp-sass');
var pkg = require('./package.json');
var sassdoc = require('sassdoc');

var outputPath = 'docs/styleguide',
    source = ['src/components/**/*.scss',
              'src/scss/**/*.scss',
              '!src/components/susy/',
              '!src/components/susy/**',
              '!src/components/animate.css-scss/',
              '!src/components/animate.css-scss/**',
              'public/assets/icons/icons.data.svg.css'],
    styleTitle = pkg.name + " " + pkg.version + ' styleguide';


gulp.task('styleguide:generate', function() {
  return gulp.src(source)
    .pipe(styleguide.generate({
        title: styleTitle,
        disableEncapsulation:false,
        server: true,
        /*
        extraHead: [
            '<script src="/section/assets/js/styleguide.js"></script>',
            '<script src="https://cdnjs.cloudflare.com/ajax/libs/hammer.js/2.0.4/hammer.min.js"></script>'
        ],
        */
        rootPath: outputPath,
        overviewPath: 'docs/overview.md'
      }))
    .pipe(gulp.dest(outputPath));
});

gulp.task('styleguide:applystyles', function() {
  return gulp.src(source)
    .pipe(sass({
      errLogToConsole: true
    }))
    .pipe(styleguide.applyStyles())
    .pipe(gulp.dest(outputPath));
});

gulp.task('watch', ['styleguide'], function() {
  gulp.watch([source], ['styleguide']);
});

gulp.task('sassdoc', function () {
  return gulp.src(source)
  .pipe(sassdoc
    (
      {
        dest: './docs/sassdoc'
      }   
    )
  );
});

var babel = require("gulp-babel");
var babelify = require('babelify');
var browserify = require('browserify');
var ss = require('vinyl-source-stream');

var jssource = ["./src/js/**/*.js", "!./src/js/**/*.test.js"];
var jsheadsource = ["./src/js/head.js"];

gulp.task("jsapp", function () {
  browserify({ entries: './src/js/app.js', debug: false })
  .transform(babelify)
  .bundle()
  .pipe(ss('app.js'))
  .pipe(gulp.dest('./public/assets/js'));
});

gulp.task("jshead", function () {
  browserify({ entries: './src/js/head.js', debug: false })
  .transform(babelify)
  .bundle()
  .pipe(ss('head.js'))
  .pipe(gulp.dest('./public/assets/js'));
});

gulp.task("watchjs", function(){
    gulp.run(['jsapp','jshead']);
    gulp.watch(jssource, ['jsapp','jshead']);
});

/*
gulp.task("jsbabel", function () {
  return gulp.src(jssource)
    .pipe(babel())
    .pipe(gulp.dest("src/_compiled"));
});

gulp.task("watchjj", function(){
    gulp.run(['jj']);
    gulp.watch(jssource, ['jj']);
});

gulp.task("watchjs", function(){
    gulp.run(['jsbabel','modules']);
    gulp.watch(jssource, ['jsbabel','modules']);
});

gulp.task('modules', function() {
    browserify({
      entries: 'src/_compiled/app.js',
      debug: true
    })
    .transform(babelify)
    .bundle()
    .pipe(ss('app.js')) //output file name
    .pipe(gulp.dest('./public/assets/js'));
});
*/

gulp.task('styleguide', ['styleguide:generate', 'styleguide:applystyles', 'sassdoc']);