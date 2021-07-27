const path = require('path');

module.exports = (_, argv) => [{
    /** Main entry point. https://webpack.js.org/concepts/entry-points */
    entry: './frontend/src/main.js',
    /** Top-level output. https://webpack.js.org/configuration/output */
    output: {
        path: path.join(__dirname, 'frontend', 'public', 'dist'),
        filename: '[name].js' // https://webpack.js.org/configuration/output/#outputfilename
    },
    /** Different types of modules within the project. https://webpack.js.org/configuration/module */
    module: {
        rules: [
            /** 
             * Transpile react JSX to JS. https://webpack.js.org/loaders/babel-loader
             * React, webpack, and Babel 7: https://www.valentinog.com/blog/babel/
             */
            {
                test: /\.jsx?$/,
                exclude: /node_modules/,
                use: {
                    loader: 'babel-loader',
                    options: { 'presets': ['@babel/preset-env', '@babel/preset-react'] }
                }
            }
        ]
    },
    /** Generate source map in development mode. https://webpack.js.org/configuration/devtool */
    devtool: argv.mode === 'development' ? 'source-map' : false,
}, {
    /** Standalone modules for browser support. */
    entry: {
        /** Provides polyfills necessary for a full ES2015+ environment. https://github.com/babel/babel/tree/master/packages/babel-polyfill */
        polyfills: 'babel-polyfill',
        /** The Fetch standard defines requests, responses, and the process that binds them: fetching. https://github.com/whatwg/fetch */
        fetch: 'whatwg-fetch'
    },
    devtool: false,
    output: {
        path: path.join(__dirname, 'frontend', 'public', 'dist'),
        filename: 'support.[name].js'
    }
}];