import * as path from 'path';
// import * as webpack from 'webpack';

module.exports = {
    entry: './src/index.ts',
    output: {
        filename: 'tome.js',
        path: path.resolve(__dirname, '../', 'dist'),
        library: 'tome',
        libraryTarget: 'umd'
    },
    devtool: 'source-map',
    plugins: [
        // new webpack.optimize.UglifyJsPlugin({
        //    sourcemap: true
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