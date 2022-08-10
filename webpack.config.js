const path = require('path');
const HtmlWebpackPlugin = require('html-webpack-plugin');
const { SourceMapDevToolPlugin } = require('webpack');
const ArcGISPlugin = require("@arcgis/webpack-plugin");


//https://stackoverflow.com/questions/61767538/devtools-failed-to-load-sourcemap-for-webpack-node-modules-js-map-http-e
module.exports = {
    entry: './client/index.js',
    output: {
        path: path.resolve(__dirname, './build'),
        filename: 'bundle.js',
    },
    mode: 'development',
    plugins: [new HtmlWebpackPlugin({        
        filename: 'bundle.html',        
        template: 'index.html'
    }),
    new SourceMapDevToolPlugin({
        filename: "[file].map"
    }),
    new ArcGISPlugin({
        // features: {
        //     "3d": false
        // },
        locales: ['en'],
    })
    ], 
    devServer: {
        static: {
          publicPath: '/',
          directory: path.resolve(__dirname)
        }
    },
    module: {    
        rules: [
            {
                test: /\.jsx?/,
                exclude: /node_modules/,
                loader: 'babel-loader',
                options: {
                    presets: [
                        "@babel/preset-react", 
                        "@babel/preset-env"
                    ],
                }
            },
            {
                test: /\.scss/,
                use: [
                    "style-loader", // create style tags from JS strings
                    "css-loader", // CSS to CommonJS
                    "sass-loader", // Sass to CSS
                ],
            },
            {
                test: /\.js$/,
                enforce: 'pre',
                use: ['source-map-loader'],
              },
        ],
    },
};




/*

https://webpack.js.org/concepts/loaders/



////// reminder: FRONTEND ASSESSMENT used webpack...

const HtmlWebpackPlugin = require('html-webpack-plugin');
const path = require('path');

module.exports = {
  entry: 'index.js',
  output: {
    path: path.resolve(__dirname, './dist'),
    filename: 'index_bundle.js',
  },
  plugins: [new HtmlWebpackPlugin()],
};

*/