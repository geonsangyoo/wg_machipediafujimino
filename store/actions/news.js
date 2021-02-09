// Custom
import ScrapingHelpers from '../../helpers/ScrapingHelpers';

export const FETCH_NEWS = "FETCH_NEWS";
export const fetchNews = () => {

    const fujimishiNewsPrefix = "https://www.city.fujimi.saitama.jp";
    const newsFetchURLs = {
        fujimishiNews: "https://www.city.fujimi.saitama.jp/shisei/allNewsList.html",
    };

    return async dispatch => {
        /**
         * To-Do (Scraping)
         */
        try {
            let html, news, newsListStartIndex, newsItem;
            let newsList = {
                fujimishiNews: [],
            };
            await fetch(newsFetchURLs.fujimishiNews)
                .then((res) => {
                    return res.text();
                }, (err) => {
                    console.log("Webpage fetch error", error);
                })
                .then((res) => {
                    html = res;
                    newsListStartIndex = html.indexOf("<div class=\"allNewsList-wp\">");
                    news = String(html.slice(newsListStartIndex, html.indexOf("</span></li></ul></div>", newsListStartIndex)));

                    /**
                     * Fujimi-shi News Parsing
                     */
                    let start = 0;
                    let key = 0;
                    while (news.indexOf("<li>", start) !== -1) {
                        let valueObj = {};
                        news = news.slice(start);
                        newsItem = {};
                        newsItem["date"] = ScrapingHelpers.getTagValue(news, "span", "", "date");
                        newsItem["newsURL"] = fujimishiNewsPrefix.concat(ScrapingHelpers.getTagAttribute(news, "a", "href"));
                        
                        valueObj = ScrapingHelpers.getTagValueWithoutClass(news, "a");
                        
                        newsItem["title"] = valueObj.string;
                        newsItem["key"] = ++key;
                        newsList.fujimishiNews.push(newsItem);

                        start = valueObj.endIndex;
                    }

                    dispatch({
                        type: FETCH_NEWS,
                        news: newsList
                    });

                }, (err) => {
                    console.log("HTML fetch error", error);
                });
        } catch (err) {
            console.error(err);
        }
    }
};
