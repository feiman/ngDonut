(function() {

    var mainModule = 'components/ngDonut.js',
        vendorDest = 'example/vendor/ng-donut',
        devDist    = 'ng-donut.js',
        minDist    = 'ng-donut.min.js';

    var gulp   = require('gulp'),
        uglify = require('gulp-uglify'),
        rename = require('gulp-rename'),
        karma  = require('gulp-karma'),
        jshint = require('gulp-jshint');

    gulp.task('build', function gulpBuild(){
        gulp.src(mainModule)
            .pipe(rename(devDist))
            .pipe(gulp.dest('dist'))
            .pipe(gulp.dest(vendorDest))
            .pipe(rename(minDist))
            .pipe(uglify())
            .pipe(gulp.dest('dist'))
    });

    gulp.task('karma', function gulpKarma() {

        var testFiles = [
            'example/js/vendor/d3/d3.js',
            'example/js/vendor/angular-mocks/angular-mocks.js',
            'tests/Spec.js',
            mainModule
        ];

        return gulp.src(testFiles).pipe(karma({
                configFile: 'karma.conf.js',
                action: 'run'
            })).on('error', function onError(error) {
                throw error;
            });
    });

    gulp.task('hint', function gulpHint() {

        return gulp.src(mainModule)
            .pipe(jshint('.jshintrc'))
            .pipe(jshint.reporter('default'));
    });

    gulp.task('test', ['hint', 'karma']);
    gulp.task('default', ['hint', 'test']);

})();