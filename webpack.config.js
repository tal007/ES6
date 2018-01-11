module.exports = {
    entry:[
        "babel-polyfill",
        "./index.js"
    ],
    output: {
        path: __dirname + "/dist",
        filename: "bundle.js"
    },
    module: {
        rules: [
            {
                test: /.css$/,
                exclude: /(node_modules|bower_components)/,
                use: ["style-loader", "css-loader"]
            },
            {
                test: /\.jsx?$/,
                exclude: /(node_modules|bower_components)/,
                loader: 'babel-loader', // 'babel-loader' is also a legal name to reference
                query: {
                    presets: ['es2015']
                }
            }
        ]
    }
}