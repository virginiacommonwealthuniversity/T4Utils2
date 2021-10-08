const path = require('path');
const TerserPlugin = require('terser-webpack-plugin');

const mode = process.env.NODE_ENV;

module.exports = {
    entry: './index.js',
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
            export: 'default',
            name: 'T4Utils',
            type: 'var'
        },
        path: path.join(__dirname, 'dist')
    },
    plugins: [
        new TerserPlugin()
    ],
    target: ['web', 'es5']
};
