'use strict';

const webpack = require('webpack');
const UglifyJSPlugin = require('uglifyjs-webpack-plugin');
const { CleanWebpackPlugin } = require('clean-webpack-plugin');
const path = require('path');
const CopyPlugin = require("copy-webpack-plugin");

module.exports = {

   //   mode: 'development',
   mode: 'production',

   entry: {
       'phaser-core': `./phaser-core.js`,
       'phaser-core.min': './phaser-core.js'
   },

   resolve: {
       alias: {
           'eventemitter3': path.resolve(__dirname, './node_modules/eventemitter3')
       },
       modules: [ 'node_modules/phaser/src' ]
   },

   output: {
       path: `${__dirname}/dist/`,
       filename: '[name].js',
       library: 'Phaser',
       libraryTarget: 'umd',
       sourceMapFilename: '[file].map',
       devtoolModuleFilenameTemplate: 'webpack:///[resource-path]',
       devtoolFallbackModuleFilenameTemplate: 'webpack:///[resource-path]?[hash]',
       umdNamedDefine: true
   },

   performance: { hints: false },

   optimization: {
       minimizer: [
           new UglifyJSPlugin({
               include: /\.min\.js$/,
               parallel: true,
               sourceMap: false,
               uglifyOptions: {
                   compress: true,
                   ie8: false,
                   ecma: 5,
                   output: {comments: false},
                   warnings: false
               },
               warningsFilter: () => false
           })
       ]
   },

   plugins: [
       new webpack.DefinePlugin({
           "typeof CANVAS_RENDERER": JSON.stringify(true),
           "typeof WEBGL_RENDERER": JSON.stringify(true),
           "typeof EXPERIMENTAL": JSON.stringify(false),
           "typeof PLUGIN_CAMERA3D": JSON.stringify(false),
           "typeof PLUGIN_FBINSTANT": JSON.stringify(false)
       }),

       new CleanWebpackPlugin(),
       new CopyPlugin({
           patterns: [
               {
               from: "node_modules/phaser/plugins/spine/dist/",
               to: "../plugins/spine/dist/"
                },
                {
                    from: "node_modules/phaser/types/",
                    to: "../types/"
                },
            ],
       }),
   ],

   devtool: 'source-map'

};
