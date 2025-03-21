const path = require("path");
const HtmlWebpackPlugin = require("html-webpack-plugin");

module.exports = {
  mode: "development", // Ensure Webpack knows this is in development mode
  entry: "./app.js", // Entry file
  output: {
    filename: "bundle.js",
    path: path.resolve(__dirname, "dist"),
  },
  module: {
    rules: [
      {
        test: /\.scss$/, // Match .scss files
        use: [
          "style-loader", // Inject CSS into the DOM
          "css-loader", // Resolve CSS imports
          "sass-loader", // Compile SCSS to CSS
        ],
      },
      {
        test: /\.html$/, // Match .html files
        use: ["html-loader"], // Import HTML files as modules
      },
      {
        test: /\.js$/, // Process JS files with Babel
        exclude: /node_modules/,
        use: {
          loader: "babel-loader",
          options: {
            presets: ["@babel/preset-env"],
          },
        },
      },
    ],
  },
  plugins: [
    new HtmlWebpackPlugin({
      template: "./index.html",
      inject: "body",
    }),
  ],
  devServer: {
    static: path.resolve(__dirname, "dist"),
    port: 3000,
    hot: true,
  },
};
