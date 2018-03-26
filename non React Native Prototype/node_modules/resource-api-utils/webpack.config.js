/*
* Webpack development server configuration
*
* This file is set up for serving the webpak-dev-server, which will watch for changes and recompile as required if
* the subfolder /webpack-dev-server/ is visited. Visiting the root will not automatically reload.
*/

'use strict';

module.exports = {
    context: __dirname,
    output: {
        publicPath: '/scripts/',
        path: __dirname + "/lib/",
        filename: "index.js"
    },
    resolve: {
        modulesDirectories: ['node_modules', 'src'],
        extensions: ['', '.js', '.jsx']
    },
    cache: true,
    debug: true,
    devtool: false,
    entry: './src/ResourceApiServiceFactory.js',
    plugins: [],
    stats: {
        colors: true,
        reasons: true
    },
    module: {
        preLoaders: [],
        loaders: [
                {
                    test: /\.jsx$/,
                    loaders: ['jsx-loader?harmony']
                }, {
                    test: /\.js$/,
                    loaders: ['jsx-loader?harmony']
                }
        ]
    }
};