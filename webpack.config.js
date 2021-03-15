const path = require('path')
const MiniCssExtractPlugin = require('mini-css-extract-plugin')

let config = {
    mode: 'development',
    // watchOptions: {
    //     ignored: /node_modules/
    // },
    devtool: 'cheap-module-source-map',
    entry: {
        app: ['./assets/scss/app.scss', './assets/js/app.js'],
    },
    output: {
        filename: '[name].js',
        path: path.resolve(__dirname, 'dist'),
        publicPath: '/portfolio2/dist/'
    },
    devServer: {
        contentBase: path.join(__dirname, '.'), // Dossier avec les 
        // compress: true,
        port: 9000,
        // liveReload: true,
        // sockjsPrefix: '/assets',
        // hot: true
    },    
    plugins: [
        new MiniCssExtractPlugin({
            filename: '[name].css'
        }),
    ],    
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
    }
}
module.exports = config

