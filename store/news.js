const JSDOM = require("jsdom")

export const state = () => ({
    news: {}
})

export const mutations = {
    setNews(state,news){
        state.news = news
    }
}

export const actions = {
    async fetch({commit}){
        const dom = new JSDOM.JSDOM("")
        const DOMParser = dom.window.DOMParser;
        const parser = new DOMParser
        const newsXML = await this.$axios.$get('/api/')
        const document = parser.parseFromString(newsXML, "text/xml")
        let news = []
        for (let i = 0; i < document.getElementsByTagName("item").length; i++) {
            let enclosure = []
            let $item = document.getElementsByTagName("item")[i]
            for (let j = 0; j < $item.getElementsByTagName("enclosure").length; j++)
                enclosure.push($item.getElementsByTagName("enclosure")[j].getAttribute('url'))

            news.push(
                {
                    title: $item.getElementsByTagName("title")[0].textContent,
                    link: $item.getElementsByTagName("link")[0].textContent,
                    description: $item.getElementsByTagName("description")[0].textContent,
                    guid: $item.getElementsByTagName("guid")[0].textContent,
                    date: $item.getElementsByTagName("pubDate")[0].textContent,
                    author: $item.getElementsByTagName("author").length > 0 ? $item.getElementsByTagName("author")[0].textContent : false,
                    images: enclosure.length > 0 ? enclosure : false,

                }
            )
            enclosure = []
        }

        news.sort(function(a,b){
          return new Date(b.date) - new Date(a.date);
        });
        commit('setNews', news)
    }
}

export const getters = {
    news: s => s.news,
    getTodoByGuid: s => guid => {
        return s.news.find(article => article.guid == guid);
    }
}
