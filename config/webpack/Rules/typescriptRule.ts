import {Rule} from 'webpack';

const typescriptRule: Rule = {
    test: /\.tsx?$/,
    exclude: /node_modules/,
    loader: 'ts-loader'
};

export default typescriptRule;