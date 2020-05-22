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
            // suppress useless warning
            preferBuiltins: true,
        }),
        require('rollup-plugin-commonjs')(),
        // set 'process.env.NODE_ENV' for Vue
        require('rollup-plugin-node-polyfills')(),
    ],
    onwarn: warning => {
        const circularModules = [
            '@vue/test-utils',
        ];
        if (warning.code === 'CIRCULAR_DEPENDENCY'
            && circularModules.some(m => warning.importer.includes(m))) {
            return;
        }
        throw Error(warning.message);
    },
};
