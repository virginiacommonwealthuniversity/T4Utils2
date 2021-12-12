import { URL } from 'node:url';

const paths = {
    input: new URL('./index.js', import.meta.url).pathname,
    output: new URL('./dist', import.meta.url).pathname,
    package: new URL('./package.json', import.meta.url).pathname
};

const mode = process.env.NODE_ENV;

import TerserPlugin from 'terser-webpack-plugin';

const terserPlugin = new TerserPlugin({
    extractComments: false
});

import webpack from 'webpack';
const { BannerPlugin } = webpack;

import { readFileSync } from 'node:fs';

const {
    version,
    license,
    author
} = JSON.parse(readFileSync(paths.package));

const bannerPlugin = new BannerPlugin({
    banner: `T4Utils2 v${ version } | ${ license } | ${ author }`
});

export default {
    entry: paths.input,
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
        path: paths.output
    },
    plugins: [
        terserPlugin,
        bannerPlugin
    ],
    stats: mode === 'production' ? 'summary' : true,
    target: ['web', 'es5']
};
