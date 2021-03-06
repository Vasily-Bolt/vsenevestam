
const path = require('path')
const webpack = require('webpack')
const ASSET_PATH = process.env.ASSET_PATH || '';
const HTMLWebpackPlugin = require('html-webpack-plugin')
const {CleanWebpackPlugin} = require('clean-webpack-plugin')
const CopyWebpackPlugin = require('copy-webpack-plugin')
const MiniCssExtractPlugin = require('mini-css-extract-plugin')
const OptimizeCssAssetWebpackPlugin = require('optimize-css-assets-webpack-plugin')
const TerserWebpackPlugin = require('terser-webpack-plugin')
const pugFilesToConvert = require('./website-pug-file-list.js');

const isDev = process.env.NODE_ENV === 'development'
const isProd = !isDev

console.log ("iS DEV ", isDev)

const optimization = () => {
  const config = {
    splitChunks: {
      chunks: 'all'
    }
  }
  if (isProd) {
    config.minimizer = [
      new OptimizeCssAssetWebpackPlugin (),
      new TerserWebpackPlugin ()
    ]
  }
  return config
}

const filename = ext => isDev ? `[name].${ext}` : `[name].[contenthash].${ext}`

const cssLoaders = extra => {
  const loaders = [
    {
      loader: MiniCssExtractPlugin.loader,
      options: {
        hmr: isDev,
        reloadAll: true
      },
    },
    'css-loader'
  ]

  if (extra) {
    loaders.push(extra)
  }

  return loaders
}


let multipleHtmlPlugins = pugFilesToConvert.map(filePath => {
  const pathName = filePath.split('/').splice(-2,1).join();
  const name = filePath.slice( filePath.lastIndexOf('/')+1,filePath.lastIndexOf('.') );
  console.log( `Will be added to HTMLWebpackPlugin - ${name}`);
  return new HTMLWebpackPlugin({
    template: filePath,
    filename: `./${pathName}/${name}.html`,
    inject: true,
    chunks: [`main`],
    minify: {
      collapseWhitespace: isProd 
    }
  })
});
// console.log(multipleHtmlPlugins);

module.exports = {
  context: path.resolve(__dirname, 'src'),
  mode: 'development',
  entry: {
    main: './index.js',
    // catalog: './indexnot.js'
  },
  output: {
    filename: filename('js'),
    path: path.resolve(__dirname, 'dist'),
    publicPath: ASSET_PATH
  },
  resolve: {
    extensions: ['.js', '.json', '.png'],
    alias: {
      // '@models': path.resolve(__dirname, 'src/models'),
      '@': path.resolve(__dirname, 'src'),
    }
  },
  optimization: optimization(),
  devServer: {
    port: 4200,
    open: true,
    hot: isDev,
  },
  plugins: [
    new HTMLWebpackPlugin( {
      template: './pages/index/index.pug',
      filename: 'index.html',
      inject: true,
      chunks: ['main'],
      minify: {
        collapseWhitespace: isProd 
      }
    }),
    new HTMLWebpackPlugin( {
      template: './pages/contacts/contacts.pug',
      filename: 'contacts.html',
      inject: true,
      chunks: ['main'],
      minify: {
        collapseWhitespace: isProd 
      }
    }),
    // new HTMLWebpackPlugin( {
    //   template: './pages/articles/dekoracii-svadebnymi-rastenijami.pug',
    //   filename: './articles/index.html',
    //   inject: true,
    //   chunks: ['main'],
    //   minify: {
    //     collapseWhitespace: isProd 
    //   }
    // }),

    new CleanWebpackPlugin(),
    new CopyWebpackPlugin({
      patterns: [
        {
          from: path.resolve(__dirname, 'src/assets/favicons/favicon.ico'),
          to: path.resolve(__dirname, 'dist')
        },{
          from: path.resolve(__dirname, 'src/assets/images/'),
          to: path.resolve(__dirname, 'dist/images/')
        },{
          from: path.resolve(__dirname, 'src/assets/catalog/'),
          to: path.resolve(__dirname, 'dist/catalog/')
        },{
          from: path.resolve(__dirname, 'src/assets/others/'),
          to: path.resolve(__dirname, 'dist')
        }
    ]}),
    new webpack.ProvidePlugin({
			$: 'jquery',
			jQuery: 'jquery'
		}),
    new MiniCssExtractPlugin({
      filename: filename('css')
    })
  ].concat(multipleHtmlPlugins),
  module: {
    rules: [
      {
        test: /\.css$/,
        use: cssLoaders()
      },
      {
        test: /\.s[ac]ss$/,
        use: cssLoaders('sass-loader')
      },
      {
        test: /\.(png|jpg|JPG|svg|gif)$/,
        use: ['file-loader']
      },
      {
        test: /\.(ttf|woff|woff2|eot)$/,
        use: ['file-loader']
      },
      {
        test: /\.pug$/,
        loader: 'pug-loader'
      }
    ]
  }
}