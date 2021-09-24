
const path = require('path');

module.exports = {

    entry: './layout/src/index.js',
    output: {
        filename: 'dev-bundle.js',
        path: path.resolve(__dirname, './layout/dist')
    },
    mode: 'development',
    devServer: {
        open: true,
        port: 8081,
        hot: true,
        writeToDisk: true,
    },
    module: {
        rules: [
            {
                test: /\.js$/,
                use: {
                    loader: 'babel-loader',
                    options: {
                        presets: ['@babel/env']
                    },
                },
                exclude: /node_modules/,
            }
        ]
    }
};