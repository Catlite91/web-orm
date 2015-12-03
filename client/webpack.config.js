'use strict';

var path = require('path');
var fs = require('fs');

var webpack = require('webpack');
var cheerio = require('cheerio'); // 类jquery库

// plugins
var ExtractTextPlugin = require('extract-text-webpack-plugin');
var HtmlWebpackPlugin = require('html-webpack-plugin');
var UglifyJsPlugin = webpack.optimize.UglifyJsPlugin;
var ProvidePlugin = webpack.ProvidePlugin;

function makeConf(options) {
    options = options || {};
    var srcDir = options.srcDir || 'src',
        buildDest = options.buildDest || 'build',
        releaseDest = options.releaseDest || 'release',
        debug = !!options.debug;

    var config = {
        entry: {
            // login: path.resolve(srcDir, 'js', 'login/login.js'),
            index: path.resolve(srcDir, 'js', 'index.js')
        },

        output: {
            path: path.resolve(debug ? buildDest : releaseDest),
            filename: debug ? 'js/[name].js' : 'js/[chunkhash:8].[name].min.js'
        },

        devtool: debug ? 'eval' : '',

        resolve: {
            root: [srcDir, './node_modules'],
            alias: {
                "zepto": "zepto/zepto.min.js"
            },
            extensions: ['', '.js', '.css', '.scss', '.png', '.jpg']
        },

        resolveLoader: {
            root: path.join(__dirname, 'node_modules')
        },

        module: {
            loaders: [{
                test: /\.js$/,
                exclude: /node_modules/,
                loader: 'babel-loader'
            }, {
                test: /\.css$/,
                loader: ExtractTextPlugin.extract('style', 'css?minimize')
            }, {
                test: /\.scss$/,
                loader: ExtractTextPlugin.extract('style', 'css?minimize', 'sass')
            }]
        },

        plugins: [
            new ProvidePlugin({
                zepto: 'zepto'
            }),
            // @see https://github.com/webpack/extract-text-webpack-plugin
            new ExtractTextPlugin('css/[contenthash:8].[name].min.css', {
                allChunks: false
            })
        ]
    };

    // 自动生成入口文件，入口js名必须和入口文件名相同
    // 例如，首页是index.html，那么在js目录下必须有一个index.js作为入口文件
    var pages = fs.readdirSync(srcDir);
    pages.forEach(function (filename) {
        var m = filename.match(/(.+)\.html$/);
        if (m) {
            var conf = {
                //template: path.resolve(srcDir, filename),
                templateContent: function (templateParams, compilation, callback) {
                    var file = fs.readFileSync(path.resolve(srcDir, filename)),
                        $ = cheerio.load(file.toString());
                    // 移除带有data-debug的标签
                    $('[data-debug]').remove();
                    return $.html();
                },
                minify: {
                    collapseWhitespace: true,
                    removeComments: true,
                    minifyJS: true,
                    minifyCSS: true
                },
                filename: filename
            };
            // 不是入口文件则不处理
            var isEntry = m[1] in config.entry;
            if (!isEntry) {
                return;
            }

            if (m[1] in config.entry) {
                conf.inject = 'body';
            }
            config.plugins.push(new HtmlWebpackPlugin(conf));
        }
    });

    // 压缩js
    !debug && config.plugins.push(new UglifyJsPlugin());
    return config;
}

module.exports = makeConf({
    debug: true
});