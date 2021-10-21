const { BannerPlugin } = require('webpack');
const path = require('path');
const TerserPlugin = require('terser-webpack-plugin');
const {
    version,
    license,
    author
} = require('./package.json');

const mode = process.env.NODE_ENV;

module.exports = {
    entry: path.join(__dirname, 'index.js'),
    mode,
    module: {
        rules: [
            {
                exclude: /node_modules/,
                test: /\.js$/,
                loader: 'babel-loader'
            }
        ]
    },
    output: {
        filename: 'T4Utils.js',
        library: {
            name: 'T4Utils',
            type: 'var'
        },
        path: path.join(__dirname, 'dist')
    },
    plugins: [
        new TerserPlugin({
            extractComments: false
        }),
        new BannerPlugin({
            banner: `T4Utils2 v${ version } | ${ license } | ${ author }`
        })
    ],
    stats: mode === 'production' ? 'summary' : true,
    target: ['web', 'es5']
};
