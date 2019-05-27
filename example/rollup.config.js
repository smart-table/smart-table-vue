import vue from 'rollup-plugin-vue'
import nodeResolve from 'rollup-plugin-node-resolve'
import commonjs from 'rollup-plugin-commonjs'

export default {
  input: './example/index.js',
  output: {
    file: './example/bundle.js',
    format: 'iife',
    name: 'vueApp',
    sourcemap: 'inline',
    strict: false,
  },
  plugins: [
    nodeResolve({mainFields: ['browser', 'main']}),
    commonjs(),
    vue()
  ]
};
