const webpack = require("webpack");
const path = require("path");
const HtmlWebpackPlugin = require("html-webpack-plugin");
const { CleanWebpackPlugin } = require("clean-webpack-plugin");
const MiniCssExtractPlugin = require("mini-css-extract-plugin");
const TerserPlugin = require("terser-webpack-plugin");
const OptimizeCSSAssetsPlugin = require("optimize-css-assets-webpack-plugin");

module.exports = () => {
  const isProduction = process.env.NODE_ENV === "production";
  const WebpackBundleAnalyzer = require("webpack-bundle-analyzer").BundleAnalyzerPlugin;
  !isProduction && require("dotenv").config();

  return {
    entry: ["./src/app.tsx"],
    resolve: {
      extensions: [".ts", ".tsx", ".js", ".jsx"],
    },
    output: {
      filename: "[name].[hash].js",
      path: path.resolve(__dirname, "dist"),
      publicPath: "/",
    },
    node: {
      fs: "empty",
    },
    module: {
      rules: [
        {
          test: /\.(t|j)sx?$/,
          loader: "babel-loader",
          exclude: /node_modules/,
        },
        {
          enforce: "pre",
          test: /\.js$/,
          use: ["source-map-loader"],
          exclude: /node_modules/,
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
        {
          test: /\.(woff(2)?|ttf|eot|svg)(\?v=\d+\.\d+\.\d+)?$/,
          use: [
            {
              loader: "file-loader",
              options: {
                name: "[name].[ext]",
                outputPath: "fonts/",
              },
            },
          ],
        },
      ],
    },
    optimization: {
      minimizer: [
        new TerserPlugin({
          extractComments: true,
        }),
        new OptimizeCSSAssetsPlugin({}),
      ],
      moduleIds: "hashed",
      runtimeChunk: "single",
      splitChunks: {
        cacheGroups: {
          default: {
            minChunks: 2,
            priority: -20,
            reuseExistingChunk: true,
          },
          commons: {
            test: /[\\/]node_modules[\\/]/,
            name(module, chunks, cacheGroupKey) {
              const moduleFileName = module
                .identifier()
                .split("\\")
                .reduceRight((item) => item);
              const allChunksNames = chunks.map((item) => item.name).join("~");
              return `${cacheGroupKey}-${allChunksNames}-${moduleFileName}`;
            },
            priority: -10,
          },
        },
        chunks: "all",
      },
    },
    plugins: [
      new CleanWebpackPlugin(),
      new MiniCssExtractPlugin({
        filename: "[name].css",
        chunkFilename: "[id].css",
      }),
      new HtmlWebpackPlugin({
        template: "./public/index.html",
        favicon: "./public/images/favicon.png",
      }),
      new webpack.DefinePlugin({
        "process.env": {
          TWITCH_CLIENT_ID: JSON.stringify(process.env.TWITCH_CLIENT_ID),
        },
      }),
      !isProduction && new WebpackBundleAnalyzer(),
    ],
    devtool: isProduction ? "source-map" : "inline-source-map",
    devServer: {
      contentBase: path.join(__dirname, "public"),
      historyApiFallback: true,
      proxy: {
        "/api/*": {
          target: "http://[::1]:5000",
          secure: false,
          changeOrigin: true,
        },
      },
    },
  };
};
