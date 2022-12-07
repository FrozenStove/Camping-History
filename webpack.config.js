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
    filename: 'index.html',
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
    },
    proxy: {
      '/': 'http://localhost:3000/',
    },
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

--------------------------------------------------------------------------------
{
  "name": "axolotl-beats",
  "version": "1.0.0",
  "description": "",
  "main": "./client/index.js",
  "scripts": {
    "start": "node server/server.js",
    "build": "webpack",
    "devStart": "nodemon server/server.js",
    "dev_old": "webpack serve --open",
    "dev": "concurrently \"cross-env NODE_ENV=development webpack serve\" \"cross-env NODE_ENV=development nodemon server/server.js \"",
    "test": "node --experimental-vm-modules node_modules/.bin/jest",
    "test-coverage": "node --experimental-vm-modules node_modules/.bin/jest --coverage"
  },
  "repository": {
    "type": "git",
    "url": "git+https://github.com/Team-Axolotl-WCRI-52/axolotl-beats.git"
  },
  "keywords": [],
  "author": "",
  "license": "ISC",
  "bugs": {
    "url": "https://github.com/Team-Axolotl-WCRI-52/axolotl-beats/issues"
  },
  "homepage": "https://github.com/Team-Axolotl-WCRI-52/axolotl-beats#readme",
  "dependencies": {
    "@shelf/jest-mongodb": "^4.0.0",
    "@testing-library/react": "^13.3.0",
    "axios": "^0.27.2",
    "cookie-parser": "^1.4.6",
    "cors": "^2.8.5",
    "css-loader": "^6.7.1",
    "dotenv": "^16.0.1",
    "enzyme": "^3.11.0",
    "express": "^4.18.1",
    "file-loader": "^6.2.0",
    "image-loader": "^0.0.1",
    "jest-puppeteer": "^6.1.1",
    "mongodb": "^4.8.1",
    "mongodb-memory-server": "^8.8.0",
    "mongoose": "^6.5.2",
    "puppeteer": "^16.1.1",
    "react": "^18.2.0",
    "react-dom": "^18.2.0",
    "react-router-dom": "^6.3.0",
    "sass-loader": "^13.0.2",
    "spotify-web-api-node": "^5.0.2",
    "style-loader": "^3.3.1"
  },
  "devDependencies": {
    "@babel/core": "^7.18.10",
    "@babel/preset-env": "^7.18.10",
    "@babel/preset-react": "^7.18.6",
    "babel-cli": "^6.26.0",
    "babel-jest": "^28.1.3",
    "babel-loader": "^8.2.5",
    "babel-preset-env": "^1.7.0",
    "concurrently": "^7.3.0",
    "cross-env": "^7.0.3",
    "html-webpack-plugin": "^5.5.0",
    "identity-obj-proxy": "^3.0.0",
    "jest": "^28.1.3",
    "jsdom": "^20.0.0",
    "jsdom-global": "^3.0.2",
    "nodemon": "^2.0.19",
    "react-test-renderer": "^18.2.0",
    "sass": "^1.54.4",
    "superagent": "^8.0.0",
    "supertest": "^6.2.4",
    "webpack": "^5.74.0",
    "webpack-cli": "^4.10.0",
    "webpack-dev-server": "^4.9.3"
  }
}

--------------------------------------------------------------------------------


const path = require("path");
const HtmlWebpackPlugin = require("html-webpack-plugin");

module.exports = {
  entry: path.resolve(__dirname, "./client/index.js"),
  output: {
    path: path.resolve(__dirname, "./build"),
    filename: "bundle.js",
  },
  mode: "development",
  module: {
    rules: [
      {
        test: /\.jsx?/,
        exclude: /(node_modules)/,
        use: {
          loader: "babel-loader",
          options: {
            presets: ["@babel/preset-env", "@babel/preset-react"],
          },
        },
      },
      {
        test: /\.s[ac]ss$/i,
        use: ["style-loader", "css-loader", "sass-loader"],
      },
      {
        test: /\.(png|jpe?g|gif)$/i,
        use: [
          {
            loader: 'file-loader',
          },
        ],
      },
    ],
  },
  plugins: [
    new HtmlWebpackPlugin({
      template: "./client/index.html",
    }),
  ],
  devServer: {
    proxy: {
      "/api": "http://localhost:3000",
    },
    static: {
      publicPath: "/build",
      directory: path.join(__dirname, "build"),
    },
  },
};



*/