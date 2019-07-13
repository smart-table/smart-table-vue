import nodeResolve from 'rollup-plugin-node-resolve'

const globals = {
  'smart-table-core': 'smartTableCore',
};

export default {
  input: './index.js',
  output: {
    file: './dist/smart-table-vue.js',
    format: 'umd',
    globals,
    name:'smart-table-vue',
    sourcemap: true,
  },
  external: Object.keys(globals),
  plugins: [
    nodeResolve(),
  ]
}
