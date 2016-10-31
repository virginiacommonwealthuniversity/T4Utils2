var datestamp = require('./datestamp.js'),
    header = require('./header.js'),
    include = require('gulp-include'),
    pkg = require('../package.json'),
    rename = require('gulp-rename'),
    replace = require('gulp-replace'),
    uglify = require('gulp-uglify');

var api = {
    content_type_id: {
        '8.1': 'content.getContentTypeID()',
        '7.4': 'content.getTemplateID()'
    },
    ocm: {
        '8.1': 'com.terminalfour.spring.ApplicationContextProvider.getBean(com.terminalfour.content.IContentManager)',
        '7.4': 'ContentManager.getManager()'
    },
    ocm_get_id: {
        '8.1': 'oCM.get(contentInSection[i], \'en\').getID()',
        '7.4': 'oCM.get(dbStatement, contentInSection[i], \'en\').getID()'
    },
    ocm_next_content_type_id: {
        '8.1': 'oCM.get(contentInSection[i + 1], \'en\').getContentTypeID()',
        '7.4': 'oCM.get(dbStatement, contentInSection[i + 1], \'en\').getTemplateID()'
    },
    ocm_prev_content_type_id: {
        '8.1': 'oCM.get(contentInSection[i - 1], \'en\').getContentTypeID()',
        '7.4': 'oCM.get(dbStatement, contentInSection[i - 1], \'en\').getTemplateID()'
    }
};

module.exports = function(gulp, config, version) {
    gulp.task('build-' + version, function() {
        return gulp.src(config.src)                                                                          // Grab the source files
            .pipe(include())                                                                                 // Include javascript modules
            .pipe(replace(/\{\{version\}\}/g, pkg.version))                                                  // Replace {{version}} with the package.json version
            .pipe(replace(/\{\{t4_version\}\}/g, version))                                                   // Replace {{t4_version}} with the passed in version
            .pipe(replace(/\{\{datestamp\}\}/g, datestamp()))                                                // Replace {{datestamp}} with a YYYY.mm.dd datestamp
            .pipe(replace(/'\{\{api:content_type_id\}\}'/g, api.content_type_id[version]))                   // Replace {{api:content_type_id}} with the version specific JS
            .pipe(replace(/'\{\{api:ocm\}\}'/g, api.ocm[version]))                                           // Replace {{api:ocm}} with the version specific JS
            .pipe(replace(/'\{\{api:ocm_get_id\}\}'/g, api.ocm_get_id[version]))                             // Replace {{api:ocm_get_id}} with the version specific JS
            .pipe(replace(/'\{\{api:ocm_next_content_type_id\}\}'/g, api.ocm_next_content_type_id[version])) // Replace {{api:ocm_next_content_type_id}} with the version specific JS
            .pipe(replace(/'\{\{api:ocm_prev_content_type_id\}\}'/g, api.ocm_prev_content_type_id[version])) // Replace {{api:ocm_prev_content_type_id}} with the version specific JS
            .pipe(header(version))                                                                           // Inject library header
            .pipe(rename({suffix:'.' + version}))                                                            // Give the filename a version suffix
            .pipe(gulp.dest(config.dest))                                                                    // Save to the destination folder
            .pipe(uglify())                                                                                  // Uglify the code
            .pipe(header(version))                                                                           // Re-inject library header
            .pipe(rename({suffix:'.min'}))                                                                   // Give the filename a .min suffix
            .pipe(gulp.dest(config.dest));                                                                   // Save to the destination folder
    });
};
