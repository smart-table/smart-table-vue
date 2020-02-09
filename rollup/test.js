module.exports = {
    input: __dirname + '/../test/index.js',
    output: [{
        file: __dirname + '/../test/bundle.js',
        name: 'test',
        format: 'iife',
        sourcemap: 'inline',
    }],
    plugins: [
        require('rollup-plugin-node-resolve')({
            mainFields: ['browser', 'main'],
        }),
    ],
};
