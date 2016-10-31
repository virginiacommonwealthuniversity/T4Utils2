// Required Modules
var build = require('./gulp/build.js'),
    config = require('./gulp/config.js'),
    gulp = require('gulp'),
    jsdoc = require('gulp-jsdoc3');

// Default Task
gulp.task('default', ['build']);

// Build Task
gulp.task('build', ['build-8.1', 'build-7.4']); // Build both versions of the library
build(gulp, config, '8.1');                     // Build the v8 version of the library
build(gulp, config, '7.4');                     // Build the v7 version of the library

// Watch Task
gulp.task('watch', function() {
    gulp.watch(config.watch, ['build']);        // Run the build task
});

// Docs Task
gulp.task('docs', ['build'], function(doc) {
    gulp.src('dist/T4Utils.js', {read: false})
        .pipe(jsdoc(doc));
});
