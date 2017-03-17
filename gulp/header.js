// Required Modules
let datestamp = require('./datestamp.js'),
    header =    require('gulp-header'),
    pkg =       require('../package.json');

module.exports = () => {
    let banner =
`/**
 * T4Utils 2
 * @author <%= pkg.author %>
 * @version <%= pkg.version %>_<%= info.date %>
 * @license <%= pkg.license %>
 */

`,
        info = {
            date: datestamp()
        };
    return header(banner, {pkg, info});
};
