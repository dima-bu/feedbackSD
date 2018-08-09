const path = require('path');
const fs = require('fs');

module.exports = env => {

    if (env.development === true) {

        return {
            devServer: {
                contentBase: path.join(__dirname, 'dist'),
                compress: true,
                port: 9000,
                before: function() {
                    fs.createReadStream('example/index.html').pipe(fs.createWriteStream('dist/index.html'));
                    fs.createReadStream('src/style.css').pipe(fs.createWriteStream('dist/style.css'));
                }
            },
            entry: './src/index.js',
            output: {
                filename: 'feedbackSD.js',
                path: path.resolve(__dirname, 'dist')
            },
            optimization: {
                minimize: false
            }
        };
    }

    if (env.production === true) {

        return {
            entry: './src/index.js',
            output: {
                filename: 'feedbackSD.min.js',
                path: path.resolve(__dirname, 'dist')
            },
            optimization: {
                minimize: true
            }
        };
    }

};
