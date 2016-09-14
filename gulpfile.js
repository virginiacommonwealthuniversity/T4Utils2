// Required Modules
var config = require('./gulp/config.js'),
    datestamp = require('./gulp/datestamp.js'),
    gulp = require('gulp'),
    header = require('./gulp/header.js'),
    include = require('gulp-include'),
    pkg = require('./package.json'),
    rename = require('gulp-rename'),
    replace = require('gulp-replace'),
    uglify = require('gulp-uglify');

// Default Task
gulp.task('default', ['build']);

// Build Task
gulp.task('build', ['build-exp', 'build-min']);

// Build Expanded Task
gulp.task('build-exp', function() {
    return gulp.src(config.src)                           /* Grab the source files */
        .pipe(include())                                  /* Include javascript modules */
        .pipe(replace(/\{\{version\}\}/g, pkg.version))   /* Replace {{version}} with the package.json version */
        .pipe(replace(/\{\{datestamp\}\}/g, datestamp())) /* Replace {{datestamp}} with a YYYY.mm.dd datestamp */
        .pipe(header())                                   /* Inject library header */
        .pipe(gulp.dest(config.dest));                    /* Save to the destination folder  */
});

// Build Minified Task
gulp.task('build-min', function() {
    return gulp.src(config.src)                           /* Grab the source files */
        .pipe(include())                                  /* Include javascript modules */
        .pipe(replace(/\{\{version\}\}/g, pkg.version))   /* Replace {{version}} with the package.json version */
        .pipe(replace(/\{\{datestamp\}\}/g, datestamp())) /* Replace {{datestamp}} with a YYYY.mm.dd datestamp */
        .pipe(uglify())                                   /* Uglify the code */
        .pipe(header())                                   /* Inject library header */
        .pipe(rename({suffix:'.min'}))                    /* Give the filename a .min suffix */
        .pipe(gulp.dest(config.dest));                    /* Save to the destination folder  */
});

// Watch Task
gulp.task('watch', function() {
    gulp.watch(config.watch, ['build']);                  /* Run the build task */
});
