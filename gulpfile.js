let config = require('./gulp/config'),
    datestamp = require('./gulp/datestamp.js'),
    gulp =   require('gulp'),
    header =    require('./gulp/header.js'),
    include =   require('gulp-include'),
    jsdoc =  require('gulp-jsdoc3'),
    pkg =       require('./package.json'),
    rename =    require('gulp-rename'),
    replace =   require('gulp-replace'),
    uglify =    require('gulp-uglify');

gulp.task('default', ['build']);

// gulp.task('build', ['build-8.1', 'build-7.4']); // Build both versions of the library

// build(gulp, config, '8.1');                     // Build the v8 version of the library
// build(gulp, config, '7.4');                     // Build the v7 version of the library

gulp.task('build', () => {
    return gulp.src(config.src)                           // Grab the source files
        .pipe(include())                                  // Include javascript modules
        .pipe(replace(/\{\{version\}\}/g, pkg.version))   // Replace {{version}} with the package.json version
        .pipe(replace(/\{\{datestamp\}\}/g, datestamp())) // Replace {{datestamp}} with a YYYY.mm.dd datestamp
        .pipe(header())                                   // Inject library header
        .pipe(gulp.dest(config.dest))                     // Save to the destination folder
        .pipe(uglify())                                   // Uglify the code
        .pipe(header())                                   // Re-inject library header
        .pipe(rename({suffix:'.min'}))                    // Give the filename a .min suffix
        .pipe(gulp.dest(config.dest));                    // Save to the destination folder
});

gulp.task('watch', function() {
    gulp.watch(config.watch, ['build']);        // Run the build task
});

gulp.task('docs', ['build'], function(doc) {
    gulp.src('dist/T4Utils.js', {read: false})
        .pipe(jsdoc(doc));
});
