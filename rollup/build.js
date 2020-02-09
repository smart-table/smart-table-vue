export default {
  input: './index.js',
  external: [
      'smart-table-core',
  ],
  output: [{
    file: './dist/index.js',
    format: 'cjs',
  },{
    file:'./dist/index.mjs',
    format: 'esm'
  }],
  plugins: []
}
