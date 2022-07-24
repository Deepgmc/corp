const { defineConfig } = require('@vue/cli-service')

module.exports = defineConfig({
    transpileDependencies: true
})

module.exports = {
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