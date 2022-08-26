const { defineConfig } = require('@vue/cli-service')
module.exports = defineConfig({
  transpileDependencies: true
})


module.exports = {
  publicPath: '/',
  outputDir: 'dist',
  indexPath: 'index.html',
  runtimeCompiler: false,
  productionSourceMap: true,
  transpileDependencies: true,
  configureWebpack: {
      devtool: 'source-map'
  },
  pages: {
      index: {
          entry: 'src/main.ts',
          title: 'CORP',
          template: 'public/index.html',
          filename: 'index.html',
      }
  },

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

  css: {
      loaderOptions: {
          sass: {
              additionalData: ' @import "@/assets/styles/"; '//Prepends Sass/SCSS code before the actual entry file.
          }
      }
  }
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

}