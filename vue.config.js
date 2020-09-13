/* eslint-disable*/
const path = require('path');

function resolve(dir) {
    return path.join(__dirname, dir);
}
const IS_PROD = ['production', 'prod'].includes(process.env.NODE_ENV);
const cdn = {
    css: [
        // element-ui css
        'https://cdn.bootcdn.net/ajax/libs/element-ui/2.12.0/theme-chalk/index.css',
    ],
    js: [
        // vue
        'https://cdn.bootcdn.net/ajax/libs/vue/2.6.10/vue.min.js',
        // vue-router
        'https://cdn.bootcdn.net/ajax/libs/vue-router/3.1.3/vue-router.min.js',
        // vuex
        'https://cdn.bootcdn.net/ajax/libs/vuex/3.1.2/vuex.min.js',
        // axios
        'https://cdn.bootcdn.net/ajax/libs/axios/0.18.0/axios.min.js',
        // element-ui js
        'https://cdn.bootcdn.net/ajax/libs/element-ui/2.12.0/index.js',
    ],
};

module.exports = {
    // 生产环境关闭sourceMap
    productionSourceMap: false,
    pluginOptions: {
        lintStyleOnBuild: true,
        stylelint: {
            fix: true, // boolean (default: true)
            // files: '', // string | [string] (default: ['src/**/*.{vue,htm,html,css,sss,less,scss}'])
        },
    },
    chainWebpack: (config) => {
    // 设置 public 目录别名
        config.resolve.alias.set('#', resolve('public'));
        // 解决 vue-layer 使用时报错问题
        config.resolve.alias.set('vue$', 'vue/dist/vue.js');
        // 首屏加载优化 分包处理 CDN 引入依赖
        // 开启gzip压缩
        if (IS_PROD) {
            // 依赖分包
            config.optimization.splitChunks({
                chunks: 'all',
                cacheGroups: {
                    libs: {
                        name: 'chunk-libs',
                        test: /[\\/]node_modules[\\/]/,
                        priority: 10,
                        chunks: 'initial', // 只打包初始时依赖的第三方
                    },
                    elementUI: {
                        name: 'chunk-elementUI', // 单独将 elementUI 拆包
                        priority: 20, // 权重要大于 libs 和 app 不然会被打包进 libs 或者 app
                        test: /[\\/]node_modules[\\/]_?element-ui(.*)/,
                    },
                },
            });
            // 开启gzip压缩
            config
                .plugin('gzip-plugin')
                .use('compression-webpack-plugin', [{
                    filename: '[path].gz[query]',
                    algorithm: 'gzip',
                    test: /\.js$|\.json$|\.css$|\.ttf$/,
                    threshold: 0, // 只有大小大于该值的资源会被处理
                    minRatio: 0.8, // 只有压缩率小于这个值的资源才会被处理
                    // deleteOriginalAssets: true, // 删除原文件
                }])
                .end();
            // CDN 引入依赖
            // 通过 html-webpack-plugin 将 cdn 注入到 index.html 之中
            config.plugin('html')
                .tap((args) => {
                    args[0].cdn = cdn;
                    return args;
                });
                config.externals({
                    vue: 'Vue',
                    axios: 'axios',
                    'element-ui': 'ELEMENT',
                    'vue-router': 'VueRouter',
                    vuex: 'Vuex'
                })
        }
    },
    // configureWebpack: (config) => {
    //     if (IS_PROD) {
    //         // eslint-disable-next-line no-param-reassign

    //     }
    // },
    css: {
        loaderOptions: {
            sass: {
                // 新版sass-loader data-->prependData
            // 全局scss文件
                prependData: `
                @import "@/plugins/gloable.scss";
            `,
            },
        },
    },
    // devServer: {
    //     proxy: {
    //         '/public/images': { // 这里最好有一个 /
    //             target: 'http://localhost:8888/', // 后台接口域名
    //             changeOrigin: true, // 是否跨域
    //         },
    //     },
    // },
};
