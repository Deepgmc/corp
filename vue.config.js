const { defineConfig } = require('@vue/cli-service')

module.exports = defineConfig({
    transpileDependencies: true
})

module.exports = {
    pages: {
        index: {
            entry: 'src/main.js',
            title: 'CORP'
        }
    },
    // chainWebpack: config => {
    //     config
    //         .plugin('html')
    //         .tap(args => {
    //             args[0].title = "My Vue App";
    //             return args;
    //         })
    // },
    // configureWebpack: {
    //     plugins: [
    //         new MyAwesomeWebpackPlugin()
    //     ]
    // },
    devServer: {
        proxy: {
            '/auth': {
                target: 'http://localhost:3000'
            },
            '/api': {
                target: 'http://localhost:3000'
            },
        },
    },

    publicPath: '/',
    outputDir: 'dist',

    css: {
        loaderOptions: {
            sass: {
                additionalData: ' @import "@/assets/styles/"; '
            }
        }
    }
}