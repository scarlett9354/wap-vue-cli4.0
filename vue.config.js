const path = require('path')
const FileManagerPlugin = require('filemanager-webpack-plugin')
const fs = require('fs')
const metaTmpl = fs.readFileSync(path.join(__dirname, './public/templates/meta.html'))
const headTmpl = fs.readFileSync(path.join(__dirname, './public/templates/head.html'))
// 处理入口
const pages = {
  index: {
    entry: 'src/entries/main.js'
  },
  user: {
    entry: 'src/entries/user.js'
  }
}
Object.keys(pages).forEach((key) => {
  pages[key].metaTmpl = metaTmpl
  pages[key].headTmpl = headTmpl
})

// 单独排除开发环境FileManagerPlugin的使用
const plugins = []
if(process.env.NODE_ENV !== 'development') {
  const fileManager = new FileManagerPlugin({ // 初始化 filemanager-webpack-plugin 插件实例
    onEnd: {
      delete: [ // 首先需要删除项目根目录下的dist.zip
        './dist.zip'
      ],
      archive: [ // 然后我们选择dist文件夹将之打包成dist.zip并放在根目录
        { source: './dist', destination: './dist.zip' }
      ]
    }
  })
  plugins.push(fileManager)
}

module.exports = {
  publicPath: process.env.PUBLIC_URL,
  assetsDir: process.env.ASSETS_URL,
  pages,
  devServer: {
    proxy: {
      '/api/*': { target: process.env.VUE_APP_BASE_URL }
    }
  },
  configureWebpack: {},
  chainWebpack: config => {
    const types = ['vue-modules', 'vue', 'normal-modules', 'normal']
    types.forEach(type => addStyleResource(config.module.rule('scss').oneOf(type)))
  }
}

function addStyleResource (rule) {
  rule.use('style-resource')
    .loader('style-resources-loader')
    .options({
      patterns: [
        path.resolve(__dirname, './src/scss/utilities/_variables.scss'),
        path.resolve(__dirname, './src/scss/utilities/_reset.scss'),
        path.resolve(__dirname, './src/scss/utilities/_mixins.scss'),
        path.resolve(__dirname, './src/scss/utilities/_functions.scss'),
        path.resolve(__dirname, './src/scss/utilities/_animations.scss'),
        path.resolve(__dirname, './src/scss/utilities/_base.scss')
      ]
    })
}
