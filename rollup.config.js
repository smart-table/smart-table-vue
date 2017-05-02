import nodeResolve from 'rollup-plugin-node-resolve'

export default {
  entry: './index.js',
  dest: './dist/smart-table-vue.js',
  format: 'umd',
  sourceMap: true,
  moduleName:'smart-table-vue',
  plugins: [
    nodeResolve({jsnext: true})
  ]
}
