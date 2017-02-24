// Required Modules
let datestamp = require('./datestamp.js'),
    header =    require('gulp-header'),
    pkg =       require('../package.json');

module.exports = function(version) {
    let banner =
`/**
 * T4Utils 2
 * @author <%= pkg.author %>
 * @version <%= pkg.version %>_<%= info.date %> (<%= info.version %>)
 * @license <%= pkg.license %>
 */

`,
        info = {
            version: version,
            date: datestamp()
        };
    return header(banner, {pkg, info});
};
