const webpackConfig = require("../webpack.config");
webpackConfig.entry = function() {
  return {};
};

module.exports = function(config) {
  config.set({
    basePath: "../",
    // customContextFile: "test/index.html",
    webpack: webpackConfig,
    preprocessors: {
      "src/index.js": ["webpack"],
      "test/**/*.js": ["webpack"],
      "test/fixtures/*.html": ["html2js"]
    },
    html2JsPreprocessor: {
      stripPrefix: "test/"
      //     prependPrefix: 'served/'
    },
    babelPreprocessor: {
      options: {
        presets: ["env"],
        sourceMap: "inline"
      },
      filename: function(file) {
        return file.originalPath.replace(/.js$/, ".es5.js");
      },
      sourceFileName: function(file) {
        return file.originalPath;
      }
    },
    frameworks: ["mocha", "chai", "sinon"],
    files: [
      "node_modules/bootstrap/dist/css/bootstrap.min.css",
      "dist/pdx-bootstrap.css",
      "node_modules/jquery/dist/jquery.min.js",
      "node_modules/bootstrap/dist/js/bootstrap.min.js",
      "node_modules/@babel/polyfill/dist/polyfill.js",
      "dist/pdx-bootstrap.js",
      "test/**/*.html",
      "test/**/*.js"
    ],
    // reporters: ["progress"],
    reporters: ["mocha"],
    port: 9876, // karma web server port
    colors: true,
    logLevel: config.LOG_INFO,
    browsers: ["ChromeHeadless"],
    autoWatch: false,
    // singleRun: false, // Karma captures browsers, runs the tests and exits
    concurrency: Infinity,
    failOnEmptyTestSuite: false
  });
};
