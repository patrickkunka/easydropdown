// tslint:disable:no-var-requires
const path = require('path');
const webpack = require('webpack');

module.exports = {
    entry: './src/umd.ts',
    output: {
        filename: 'easydropdown.min.js',
        path: path.resolve(__dirname, '../', 'bundle'),
        library: 'easydropdown',
        libraryTarget: 'umd'
    },
    devtool: 'source-map',
    plugins: [
        // new webpack.optimize.UglifyJsPlugin({
        //    sourcemaps: true
        // })
    ],
    resolve: {
        extensions: ['.ts', '.js']
    },
    module: {
        rules: [
            {
                test: /\.ts/,
                exclude: /node_modules/,
                loader: 'ts-loader'
            }
        ]
    }
};