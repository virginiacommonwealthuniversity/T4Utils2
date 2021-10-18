const glob = require('glob');
const path = require('path');

const index = path.join(__dirname, 'index.js');
const readme = path.join(__dirname, 'readme.md');
const modules = glob.sync(path.join(__dirname, 'modules/*.js'));

module.exports = {
    opts: {
        destination: './docs',
        recurse: true
    },
    source: {
        include: [
            index,
            readme,
            ...modules
        ]
    }
};
