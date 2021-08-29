import { defineConfig } from 'umi'

export default defineConfig({
  devServer: {
    port: 1666
  },
  publicPath: './',
  outputPath: '../../dist/renderer',
  nodeModulesTransform: {
    type: 'none',
    exclude: []
  },
  history: { type: 'hash' },
  dva: {
    immer: true,
    hmr: true
  },
  routes: [
    {
      path: '/',
      component: './index'
    }
  ]
})
