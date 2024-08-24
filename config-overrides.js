/* config-overrides.js */
const webpack = require('webpack');

module.exports = function override(config, env) {
    config.resolve.extensions.push('.js', '.jsx', '.ts');

    config.resolve.fallback = {
        url: false,
        fs: require.resolve('fs'),
        assert: require.resolve('assert'),
        http: require.resolve('stream-http'),
        https: require.resolve('https-browserify'),
        buffer: require.resolve('buffer'),
        stream: require.resolve('stream-browserify'),
        path: require.resolve('path-browserify'),
        zlib: require.resolve('browserify-zlib'),
        crypto: require.resolve("crypto-browserify"),
        "buffer": require.resolve("buffer/"),
        'process/browser': require.resolve('process/browser'),
    };

    config.plugins.push(
        new webpack.ProvidePlugin({
            process: 'process/browser',
            Buffer: ['buffer', 'Buffer']
        })
    );

    config.plugins.push(
        new webpack.ProvidePlugin({
            $: "jquery",
            jQuery: "jquery"
        })
    );

    config.ignoreWarnings = [/Failed to parse source map/];

    return config;
};
