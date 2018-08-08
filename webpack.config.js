const path = require('path');

module.exports = env => {

    if (env.NODE_ENV === 'local') {

        return {
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

}
