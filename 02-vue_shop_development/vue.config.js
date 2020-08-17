module.exports = {
    // 修改打包的入口
    chainWebpack: config => {
        // 生产环境
        const cdn = {
            css: [
                '//cdn.staticfile.org/nprogress/0.2.0/nprogress.min.css',
                '//cdn.staticfile.org/quill/1.3.7/quill.core.min.css',
                '//cdn.staticfile.org/quill/1.3.7/quill.snow.min.css',
                '//cdn.staticfile.org/quill/1.3.7/quill.bubble.min.css',
                '//cdn.staticfile.org/element-ui/2.13.2/theme-chalk/index.css'
            ],
            js: [
                '//cdn.staticfile.org/vue/2.6.11/vue.min.js',
                '//cdn.staticfile.org/vue-router/3.2.0/vue-router.min.js',
                '//cdn.staticfile.org/axios/0.19.2/axios.min.js',
                '//cdn.staticfile.org/lodash.js/4.17.19/lodash.min.js',
                '//cdn.staticfile.org/echarts/4.8.0/echarts.min.js',
                '//cdn.staticfile.org/nprogress/0.2.0/nprogress.min.js',
                '//cdn.staticfile.org/quill/1.3.7/quill.min.js',
                '//cdn.jsdelivr.net/npm/vue-quill-editor@3.0.6/dist/vue-quill-editor.js',
                '//cdn.staticfile.org/element-ui/2.13.2/index.js'

            ]
        }
        config.when(process.env.NODE_ENV === 'production', config => {
            config.entry('app').clear().add('./src/main-prod.js')
            config.set('externals', {
                vue: 'Vue',
                'vue-router': 'VueRouter',
                axios: 'axios',
                lodash: '_',
                echarts: 'echarts',
                nprogress: 'NProgress',
                'vue-quill-editor': 'VueQuillEditor'
            })

            config.plugin('html').tap(args => {
                args[0].isPord = true
                args[0].cdn = cdn
                return args
            })
        })

        // 开发环境
        config.when(process.env.NODE_ENV === 'development', config => {
            config.entry('app').clear().add('./src/main-dev.js')
            config.plugin('html').tap(args => {
                args[0].isPord = false
                return args
            })
        })
    }
}