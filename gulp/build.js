let datestamp = require('./datestamp.js'),
    header =    require('./header.js'),
    include =   require('gulp-include'),
    pkg =       require('../package.json'),
    rename =    require('gulp-rename'),
    replace =   require('gulp-replace'),
    uglify =    require('gulp-uglify');

module.exports = (gulp, config) => {
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
};
