const path = require("path");
const webpack = require("webpack");
const HtmlWebpackPlugin = require("html-webpack-plugin");
const CleanWebpackPlugin = require("clean-webpack-plugin");
const MiniCssExtractPlugin = require("mini-css-extract-plugin");
const TerserPlugin = require("terser-webpack-plugin");
const OptimizeCSSAssetsPlugin = require("optimize-css-assets-webpack-plugin");
const PurgecssPlugin = require("purgecss-webpack-plugin");

module.exports = env => {
  const isProduction = env === "production";

  return {
    entry: ["@babel/polyfill", "./src/app.tsx", "jquery"],
    resolve: {
      extensions: [".ts", ".tsx", ".js"],
    },
    output: {
      path: path.join(__dirname, "dist"),
      filename: "bundle.min.js",
      publicPath: "/",
    },
    optimization: {
      minimizer: [new TerserPlugin({}), new OptimizeCSSAssetsPlugin({})],
      //   splitChunks: {
      //     cacheGroups: {
      //       styles: {
      //         name: "styles",
      //         test: /\.css$/,
      //         chunks: "all",
      //         enforce: true,
      //       },
      //     },
      //   },
    },
    module: {
      rules: [
        {
          test: /\.tsx?$/,
          loader: "awesome-typescript-loader",
        },
        {
          test: /\.js$/,
          exclude: /node_modules/,
          use: {
            loader: "babel-loader",
            options: {
              presets: ["@babel/preset-env", "@babel/preset-react"],
            },
          },
        },
        {
          test: /\.(sa|sc|c)ss$/,
          use: [
            {
              loader: !isProduction ? "style-loader" : MiniCssExtractPlugin.loader,
              options: {
                hmr: process.env.NODE_ENV === "development",
              },
            },
            "css-loader",
            "sass-loader",
          ],
        },
        {
          test: /\.(jpg|jpeg|png|gif|svg|pdf|ico)$/i,
          loader: "file-loader?name=[path][hash].[ext]",
        },
        {
          test: /\.(mp3|wav|mpe?g)$/,
          loader: "file-loader?name=[path][hash].[ext]",
        },
      ],
    },
    plugins: [
      new webpack.ProvidePlugin({ $: "jquery", jQuery: "jquery" }),
      new CleanWebpackPlugin(["dist"]),
      new MiniCssExtractPlugin({
        filename: "[name].css",
        chunkFilename: "[id].css",
      }),
      new HtmlWebpackPlugin({
        template: "./public/index.html",
        favicon: "./public/images/favicon.png",
      }),
    ],
    devtool: isProduction ? "source-map" : "inline-source-map",
    devServer: {
      contentBase: path.join(__dirname, "public"),
      historyApiFallback: true,
      proxy: {
        "/api/*": {
          target: "http://localhost:5000",
          secure: false,
          changeOrigin: true,
        },
      },
    },
  };
};
