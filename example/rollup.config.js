import vue from 'rollup-plugin-vue'
import nodeResolve from 'rollup-plugin-node-resolve'
import commonjs from 'rollup-plugin-commonjs'

export default {
  entry: './example/index.js',
  dest: './example/bundle.js',
  format: 'iife',
  sourceMap: 'inline',
  moduleName: 'vueApp',
  useStrict: false,
  plugins: [
    nodeResolve({browser: true, jsnext: true}),
    commonjs(),
    vue()
  ]
};