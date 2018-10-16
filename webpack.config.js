var webpack = require('webpack');
var path = require('path');

// variables
var isProduction = process.argv.indexOf('-p') >= 0;
var sourcePath = path.join(__dirname, './src');
var outPath = path.join(__dirname, './dist');

// plugins
var HtmlWebpackPlugin = require('html-webpack-plugin');
var ExtractTextPlugin = require('extract-text-webpack-plugin');
var WebpackCleanupPlugin = require('webpack-cleanup-plugin');
var StyleLintPlugin = require('stylelint-webpack-plugin');
// var BundleAnalyzerPlugin = require('webpack-bundle-analyzer').BundleAnalyzerPlugin;

const pkg = require('./package.json');

var webpackConfig;

webpackConfig = {
  context: sourcePath,
  output: {
    path: outPath,
    filename: `[name]${isProduction ? '.min' : ''}.js`,
    // chunkFilename: '[chunkhash].js',
    publicPath: '/',
    libraryExport: "default",
    library: "SlideCaptcha",
    libraryTarget: "umd"
  },
  target: 'web',
  resolve: {
    extensions: ['.js', '.ts', '.tsx'],
    mainFields: ['module', 'browser', 'main'],
    alias: {}
  },
  module: {
    rules: [
      // .ts, .tsx
      {
        test: /\.tsx?$/,
        use: isProduction
            ? 'ts-loader'
            : ['babel-loader?plugins=react-hot-loader/babel', 'ts-loader']
      },

      {
        test: /\.js|tsx$/,
        exclude: [/\node_modules/, /\.json$/],
        enforce: "pre",
        loader: "tslint-loader"
      },
      // static assets
      { test: /\.html$/, use: 'html-loader' },
      {
        test:  /\.(?:ico|gif|png|jpg|jpeg|webp|svg)$/i,
        loader: 'url-loader?limit=200000',
        options: {
          name: '[path][name].[ext]',
          publicPath: './',
          outputPath: './assets/img/',
        }
      },
      // { test: /\.(?:ico|gif|png|jpg|jpeg|webp|svg)$/i,
      //   loader: 'file-loader',
      //   options: {
      //     name: '[path][name].[ext]',
      //     publicPath: './',
      //     outputPath: './assets/img/',
      //   }
      // }
    ]
  },
  optimization: {
    splitChunks: {
      name: true,
      cacheGroups: {
        commons: {
          chunks: 'initial',
          minChunks: 2
        },
        vendors: {
          test: /[\\/]node_modules[\\/]/,
          chunks: 'all',
          priority: -10
        }
      }
    },
    runtimeChunk: false
  },
  plugins: [
    new WebpackCleanupPlugin(),
    new ExtractTextPlugin({
      filename: 'styles.css',
      // disable: isProduction
    }),
    new StyleLintPlugin({
        context: "src",
        configFile: '.stylelintrc.js',
        files: '**/*.less',
        failOnError: false,
        quiet: false,
        syntax: 'less'
      }
    ),
    // new BundleAnalyzerPlugin(),
  ],
  devtool: 'cheap-module-eval-source-map',
  node: {
    // workaround for webpack-dev-server issue
    // https://github.com/webpack/webpack-dev-server/issues/60#issuecomment-103411179
    fs: 'empty',
    net: 'empty'
  },
};

if (!isProduction) {
  webpackConfig.entry = {
    slideCaptcha: './main.tsx'
  };
  webpackConfig.module.rules.push(
    {
      test: /\.css|less$/,
      exclude: [path.resolve('node_modules')],
      use: [
        'style-loader',
        {
          loader: 'css-loader',
          query: {
            modules: false,
            sourceMap: true,
            importLoaders: 1,
            localIdentName: '[local]__[hash:base64:5]'
          }
        },
        {
          loader: "less-loader",
          query: {
            modules: false,
            sourceMap: true,
            importLoaders: 1,
            localIdentName: '[local]__[hash:base64:5]'
          }
        },
        {
          loader: 'postcss-loader',
          options: {
            ident: 'postcss',
            plugins: [
              require('postcss-import')({ addDependencyTo: webpack }),
              require('postcss-url')(),
              require('autoprefixer')({
                browsers: pkg.browserslist,
                flexbox: true,
              }),
              require('postcss-reporter')(),
            ]
          }
        }
      ]
    }
  );
  webpackConfig.plugins.push(
    new HtmlWebpackPlugin({
      template: '../index.html',
    }),
  );

  webpackConfig.devServer = {
    contentBase: sourcePath,
    hot: true,
    inline: true,
    historyApiFallback: {
      disableDotRule: true
    },
    stats: 'minimal'
  }
} else {
  webpackConfig.entry = {
    slideCaptcha: './index.tsx'
  };
  webpackConfig.plugins.push(
    new HtmlWebpackPlugin({
      template: './index.html',
    }),
  );
  webpackConfig.module.rules.push(
    {
      test: /\.css|less$/,
      exclude: [path.resolve('node_modules')],
      use: ExtractTextPlugin.extract({
        fallback: 'style-loader',
        use: [
          {
            loader: 'css-loader',
            query: {
              modules: false,
              sourceMap: false,
              importLoaders: 1,
              localIdentName: '[local]__[hash:base64:5]'
            }
          },
          {
            loader: "less-loader",
            query: {
              modules: false,
              sourceMap: false,
              importLoaders: 1,
              localIdentName: '[local]__[hash:base64:5]'
            }
          },
          {
            loader: 'postcss-loader',
            options: {
              ident: 'postcss',
              plugins: [
                require('postcss-import')({ addDependencyTo: webpack }),
                require('postcss-url')(),
                require('autoprefixer')({
                  browsers: pkg.browserslist,
                  flexbox: true,
                }),
                require('postcss-reporter')(),
              ]
            }
          }
        ]
      })
    },
  );
  webpackConfig.externals = {
    react: {
      root: 'React',
      commonjs2: 'react',
      commonjs: 'react',
      amd: 'react',
      umd: 'react',
    },
    'react-dom': {
      root: 'ReactDOM',
      commonjs2: 'react-dom',
      commonjs: 'react-dom',
      amd: 'react-dom',
      umd: 'react-dom',
    },
  }
}

module.exports = webpackConfig;
