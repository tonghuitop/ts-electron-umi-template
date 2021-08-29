import path from 'path'
import merge from 'webpack-merge'
import common from './webpack.common.config'
import type { Configuration } from 'webpack'

const ElectronReloadPlugin = require('webpack-electron-reload')({
  path: path.join(__dirname, '../dist/main/main.js')
})

const config: Configuration[] = common.map((item) =>
  merge(item, {
    mode: 'development',
    devtool: 'source-map',
    plugins: [ElectronReloadPlugin()]
  })
)

export default config
