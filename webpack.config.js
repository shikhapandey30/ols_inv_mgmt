var HtmlWebpackPlugin = require('html-webpack-plugin');

module.exports = {
    mode: 'development',
    resolve: {
        extensions: ['.js', '.jsx']
    },
    module: {
        rules: [
            {
                test: /\.jsx?$/,
                loader: 'babel-loader'
            }
        ]
    },
    plugins: [new HtmlWebpackPlugin({
        template: './src/index.html'
    })],
    devServer: {
        historyApiFallback: true,
       https: false,       
    },
    
    externals: {
        // global app config object
        config: JSON.stringify({
            apiUrl: 'http://18.217.112.188:8084/warehouse_user'
        })
    }
}

