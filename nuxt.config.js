export default {
    // Global page headers: https://go.nuxtjs.dev/config-head
    head: {
        title: 'news',
        htmlAttrs: {
            lang: 'en'
        },
        meta: [
            { charset: 'utf-8' },
            { name: 'viewport', content: 'width=device-width, initial-scale=1' },
            { hid: 'description', name: 'description', content: '' }
        ],
        link: [
            { rel: 'icon', type: 'image/x-icon', href: '/favicon.ico' }
        ]
    },

    // Global CSS: https://go.nuxtjs.dev/config-css
    css: [
        '@/node_modules/bootstrap/dist/css/bootstrap.min.css'
    ],

    // Plugins to run before rendering page: https://go.nuxtjs.dev/config-plugins
    plugins: [
    ],

    // Auto import components: https://go.nuxtjs.dev/config-components
    components: true,

    // Modules for dev and build (recommended): https://go.nuxtjs.dev/config-modules
    buildModules: [
    ],

    // Modules: https://go.nuxtjs.dev/config-modules
    modules: [
        '@nuxtjs/axios',
        '@nuxtjs/proxy'
    ],

    axios: {
        proxy: true
    },

    proxy: {
        '/api/': { target: 'http://static.feed.rbc.ru/rbc/logical/footer/news.rss', pathRewrite: {'^/api/': ''} }
    },

    // Build Configuration: https://go.nuxtjs.dev/config-build
    build: {
        /*
        ** You can extend webpack config here
        */
        extend (config, { isDev, isClient }) {
            if (isClient) {
                config.node = {
                    fs: 'empty',
                    child_process: 'empty',
                    net:"empty",
                    tls:"empty",
                }
            }
        }
    },
}
