import nodeResolve from 'rollup-plugin-node-resolve'

export default {
    input: './index.js',
    output: [{
        file:'./dist/smart-table-vue.js',
        format: 'esm'
    }],
    plugins: [
        nodeResolve()
    ]
}