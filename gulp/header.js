// Required Modules
var datestamp = require('./datestamp.js'),
    header = require('gulp-header'),
    pkg = require('../package.json');

// Export
module.exports = function(version) {
    // Define banner structure
    var banner = [
        '/**',
        ' * T4Utils 2',
        ' * @author <%= pkg.author %>',
        ' * @version <%= pkg.version %>_<%= info.date %> (<%= info.version %>)',
        ' * @license <%= pkg.license %>',
        ' */',
        '\n'
    ].join('\n');
    // Define the build information
    var info = {
        version: version,
        date: datestamp()
    };
    // Return
    return header(banner, { pkg:pkg, info:info });
};
