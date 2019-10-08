import * as fs from 'fs-extra'
import * as path from 'path'
import * as webpack from 'webpack'

const dist = path.resolve(__dirname, 'dist')

try {
  fs.copySync('./src/views', `${dist}`)
} catch (error) {
  console.error(error)
}

const main: webpack.Configuration = {
  mode: 'development',
  target: 'electron-main',
  entry: path.join(__dirname, 'src', 'main'),
  output: {
    filename: 'main.js',
    path: path.resolve(__dirname, 'dist')
  },
  node: {
    __dirname: false,
    __filename: false
  },
  module: {
    rules: [
      {
        test: /.ts?$/,
        include: [path.resolve(__dirname, 'src')],
        exclude: [path.resolve(__dirname, 'node_modules')],
        loader: 'ts-loader'
      }
    ]
  },
  resolve: {
    extensions: ['.js', '.ts']
  }
}

const renderer: webpack.Configuration = {
  mode: 'development',
  target: 'electron-renderer',
  entry: path.join(__dirname, 'src', 'renderer'),
  output: {
    filename: 'renderer.js',
    path: path.resolve(__dirname, 'dist')
  },
  resolve: {
    extensions: ['.json', '.js', '.jsx', '.css', '.ts', '.tsx']
  },
  module: {
    rules: [
      {
        test: /\.(tsx|ts)$/,
        use: ['ts-loader'],
        include: [path.resolve(__dirname, 'src'), path.resolve(__dirname, 'node_modules')]
      }
    ]
  }
}

const preload: webpack.Configuration = {
  mode: 'development',
  target: 'electron-renderer',
  entry: path.join(__dirname, 'src', 'preload'),
  output: {
    filename: 'preload.js',
    path: path.resolve(__dirname, 'dist')
  },
  resolve: {
    extensions: ['.json', '.js', '.jsx', '.css', '.ts', '.tsx']
  },
  module: {
    rules: [
      {
        test: /\.(tsx|ts)$/,
        use: ['ts-loader'],
        include: [path.resolve(__dirname, 'src'), path.resolve(__dirname, 'node_modules')]
      }
    ]
  }
}

module.exports = [main, renderer, preload]
