const path = require('path')
const cleanWebpackPlugin = require('clean-webpack-plugin')
const MiniCssExtractPlugin = require('mini-css-extract-plugin')

let config = {
    mode: 'development',
    watch: true,
    watchOptions: {
        ignored: /node_modules/
    },
    devtool: 'cheap-module-source-map',
    module: {
        rules: [
            {
                test: /\.(woff2?|eot|ttf|otf)$/,
                use: [{
                    loader: 'file-loader',
                    options: {
                        name: '[name].[ext]',
                        outputPath: 'fonts'
                    }
                }]
            }, {
                test: /\.(png|jpg|jpeg|gif|svg)$/i,
                use: [
                    {
                        loader: 'url-loader',
                        options: {
                            limit: 8192,
                            name: '[name].[ext]',
                            outputPath: 'images'
                        },
                    },
                ],
            }, {
                test: /\.scss$/,
                use: [MiniCssExtractPlugin.loader, 'css-loader', 'sass-loader']
            }, {
                test: /\.js$/,
                exclude: /node_modules/,
                use: [{
                    loader: 'babel-loader',
                    options: {
                        presets: ['@babel/preset-env']
                    }
                }]
            }
        ]
    },
    plugins: [
        new cleanWebpackPlugin.CleanWebpackPlugin(),
        new MiniCssExtractPlugin({
            filename: '[name].css'
        }),
    ]
}
const dev_server = false;
if(dev_server === true) {
    config = {
        ...config,
        devServer: {
            port: 3000,
            contentBase: path.join(__dirname, 'dist')
        }
    }
}
const config1 = {
    ...config,

    entry: {
        app: ['./assets/scss/app.scss', './assets/js/app.js'],
        admin: ['./assets/scss/admin.scss']
    },
    output: {
        filename: '[name].js',
        path: path.resolve(__dirname, 'dist'),
        publicPath: '/dist/'
    },
}
module.exports = config1

