const path = require("path");
const WebExtPlugin = require("web-ext-plugin");

module.exports = {
  mode: "production",
  entry: {
    background: "./src/background/index.ts",
    options: "./src/options/index.ts",
  },
  output: {
    path: path.resolve(__dirname, "js"),
    filename: "[name].js",
  },
  module: {
    rules: [
      {
        test: /.ts$/,
        include: [path.resolve(__dirname, "src")],
        loader: "ts-loader",
        resolve: {
          extensions: [".ts"],
        },
      },
    ],
  },
  plugins: [
    new WebExtPlugin({
      firefox: "/usr/bin/firefox-developer-edition",
      startUrl: "about:debugging#/runtime/this-firefox",
    }),
  ],
  experiments: {
    topLevelAwait: true,
  },
};
