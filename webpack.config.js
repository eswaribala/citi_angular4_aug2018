var webpack = require("webpack"),
    path = require('path');

const ccpOptions = {
    name: 'vendor',
    filename: './dist/vendor.bundle.js'
};

function root(__path) {
    return path.join(__dirname, __path);
}

module.exports = {
    entry: {
        "vendor": "./app/external",
        "app": "./app/main"
    },
    output: {
        path: __dirname,
        filename: "./dist/[name].bundle.js"
    },
    resolve: {
        extensions: ['.ts', '.js'],
        modules: [
            path.resolve('./app'),
            'node_modules'
        ]
    },
    devtool: 'source-map',
    module: {
        rules: [
            {
                test: /\.ts/,
                loader: 'ts-loader',
                exclude: /node_modules/
            }
        ]
    },
    plugins: [
        new webpack.optimize.CommonsChunkPlugin(ccpOptions),
        new webpack.ContextReplacementPlugin(
            // The (\\|\/) piece accounts for path separators in *nix and Windows
            /angular(\\|\/)core(\\|\/)(@angular|esm5)/,
            path.resolve(__dirname, '../src')
        ),

        new webpack.LoaderOptionsPlugin({
            minimize: true,
            debug: false
        }),

        new webpack.optimize.UglifyJsPlugin({
            minimize: true,
            sourceMap: true
        })
    ]
}
