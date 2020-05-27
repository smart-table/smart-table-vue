module.exports = {
    input: __dirname + '/index.js',
    output: [{
        file: __dirname + '/bundle.js',
        name: 'test',
        format: 'cjs',
    }],
    external: [
        '@vue/server-test-utils',
        'readable-stream',
    ],
    plugins: [
        require('rollup-plugin-node-resolve')({
            mainFields: ['module', 'main'],
            preferBuiltins: true,
        }),
        require('rollup-plugin-commonjs')(),
        require('rollup-plugin-vue')(),
        require('rollup-plugin-babel')({
            babelrc: false,
            presets: [
                ['@babel/preset-env', {
                    modules: false,
                    targets: {
                        node: true,
                    },
                    useBuiltIns: 'usage',
                    corejs: {
                        version: 2,
                    }
                }]
            ],
            ignore: [
                /node_modules\/(?!zora)/,
            ]
        }),
    ],
};
