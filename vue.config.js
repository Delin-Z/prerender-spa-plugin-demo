const PrerenderSPAPlugin = require('prerender-spa-plugin');
const Renderer = PrerenderSPAPlugin.PuppeteerRenderer;
const path = require('path');

function resolve(dir) {
  return path.join(__dirname, dir)
}

const productionPlugins = [
  new PrerenderSPAPlugin({
    staticDir: path.join(__dirname, './dist'),
    indexPath: path.join(__dirname, './dist/pc', 'index.html'),
    routes: ['/pc/index', '/pc/home'],
    postProcess(renderedRoute) {
      renderedRoute.html = renderedRoute.html
        .replace(/<script (.*?)>/g, `<script $1 defer>`)
        .replace(`id="app"`, `id="app" data-server-rendered="true"`)

      return renderedRoute
    },
    server: {
      port: 8080
    },
    renderer: new Renderer({
      inject: {foo: 'bar'},
      headless: false,
      renderAfterDocumentEvent: 'render-event',
      renderAfterElementExists: '#app'
    })
  })
]

module.exports = {
  publicPath: '/pc',
  outputDir: 'dist/pc/',
  chainWebpack: (config) => {
    config.resolve.alias.set('@', resolve('src'))
    config.plugins.delete('prefetch') // 去掉预加载
  },
  configureWebpack: () => {
    if (process.env.NODE_ENV !== 'production') return;
    return {
      plugins: productionPlugins
    }
  }
  // configureWebpack: () => {
  //   if (process.env.NODE_ENV !== 'production') return;
  //   return {
  //     plugins: [
  //       new PrerenderSPAPlugin({
  //         // 生成文件的路径，也可以与webpakc打包的一致。
  //         // 下面这句话非常重要！！！
  //         // 这个目录只能有一级，如果目录层次大于一级，在生成的时候不会有任何错误提示，在预渲染的时候只会卡着不动。
  //         staticDir: path.join(__dirname, 'dist'),
  //         // 对应自己的路由文件，比如a有参数，就需要写成 /a/param1。
  //         routes: ['/index', '/home'],
  //         // 这个很重要，如果没有配置这段，也不会进行预编译
  //         renderer: new Renderer({
  //           inject: {
  //             foo: 'bar'
  //           },
  //           headless: true,
  //           // 在 main.js 中 document.dispatchEvent(new Event('render-event'))，两者的事件名称要对应上。
  //           renderAfterDocumentEvent: 'render-event'
  //           // renderAfterDocumentEvent: 'custom-render-trigger'
  //         })
  //       })
  //     ]
  //   }
  // }
}
