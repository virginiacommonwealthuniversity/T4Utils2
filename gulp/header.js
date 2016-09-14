// Required Modules
var header = require('gulp-header'),
    pkg = require('../package.json');

// Export
module.exports = function() {
    // Generate date-string function
    function generateDateString() {
        // Create variables of the current date and the string values they will represent
        var today = new Date(),
            day = today.getDay(),
            month = today.getMonth(),
            date = today.getDate(),
            year = today.getFullYear(),
            days = ['Sunday', 'Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday', 'Saturday'],
            months = ['January', 'February', 'March', 'April', 'May', 'June', 'July', 'August', 'September', 'October', 'November', 'December'];
        // Get ordinal function
        function getOrdinal(int) {
            var indicators = ["th","st","nd","rd"],
                modulus = int % 100;
            return int + (indicators[(modulus - 20) % 10] || indicators[modulus] || indicators[0]);
        }
        return days[day] + ', ' + months[month] + ' ' + getOrdinal(date) + ' ' + year;
    }
    // Define banner structure
    var banner = [
        '/**',
        ' * T4Utils 2',
        ' * @version <%= pkg.version %>',
        ' * @author <%= pkg.author %>',
        ' * @license <%= pkg.license %>',
        ' * This document was compiled on <%= info.date %>',
        ' */',
        '\n'
    ].join('\n');
    // Define the build information
    var info = {
        date: generateDateString()
    };
    // Return
    return header(banner, { pkg:pkg, info:info });
};
