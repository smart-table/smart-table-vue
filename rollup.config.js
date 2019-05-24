import nodeResolve from 'rollup-plugin-node-resolve'

export default {
  input: './index.js',
  output: {
    file: './dist/smart-table-vue.js',
    format: 'umd',
    name:'smart-table-vue',
    sourcemap: true,
  },
  plugins: [
    nodeResolve(),
  ]
}
