import path from 'path'
import merge from 'webpack-merge'
import type { Configuration } from 'webpack'
import nodeExternals from 'webpack-node-externals'

const commonConfig: Configuration = {
  output: {
    path: path.resolve(__dirname, '../dist/main/'),
    filename: '[name].js'
  },
  externalsPresets: { node: true }, // 为了忽略诸如path、fs等内置模块。
  externals: [
    nodeExternals({ modulesDir: path.resolve(__dirname, 'node_modules') })
  ] as Configuration['externals'], // 排除Node模块
  resolve: {
    extensions: ['.ts', '.js', '.json', '.node']
  },
  // 模块解析
  module: {
    rules: [
      {
        test: /\.ts$/,
        exclude: /node_modules/,
        use: {
          loader: 'babel-loader',
          options: { cacheDirectory: true }
        }
      },
      // 解析C++模块
      {
        test: /\.node$/,
        exclude: /node_modules/,
        use: 'node-loader'
      }
    ]
  }
}

const mainConfig: Configuration = merge(commonConfig, {
  target: 'electron-main',
  entry: {
    main: './src/main/index.ts',
    preload: './src/preload/index.ts'
  }
})

const preloadConfig: Configuration = merge(commonConfig, {
  target: 'electron-preload',
  entry: {
    main: './src/main/index.ts',
    preload: './src/preload/index.ts'
  }
})

export default [mainConfig, preloadConfig]
