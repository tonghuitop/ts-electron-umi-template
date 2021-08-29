import merge from 'webpack-merge'
import { CleanWebpackPlugin } from 'clean-webpack-plugin'
import common from './webpack.common.config'
import type { Configuration } from 'webpack'

const config: Configuration[] = common.map((item) =>
  merge(item, {
    mode: 'production',
    plugins: [new CleanWebpackPlugin()]
  })
)
export default config
