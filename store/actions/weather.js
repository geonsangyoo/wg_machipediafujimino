// Custom
import ScrapingHelpers from '../../helpers/ScrapingHelpers';

export const FETCH_WEATHER = "FETCH_WEATHER";
export const fetchWeather = () => {

    const weatherFetchURL = "https://tenki.jp/forecast/3/14/4310/11235/";

    return async dispatch => {
        /**
         * To-Do (Page Scraping)
         */
        try {
            let html, today, tomorrow;
            let todayStartIndex, tomorrowStartIndex;
            let weather = {
                today: {
                    imgUrl: "",
                    title: "",
                    highTmp: 0,
                    lowTmp: 0,
                },
                tomorrow: {
                    imgUrl: "",
                    title: "",
                    highTmp: 0,
                    lowTmp: 0,
                }
            };
            await fetch(weatherFetchURL)
                .then((res) => {
                    return res.text();
                }, (err) => {
                    console.log("Webpage fetch error", error);
                })
                .then((res) => {
                    /**
                     * Parse HTML
                     */
                    html = res;
                    todayStartIndex = html.indexOf("<section class=\"today-weather\"");
                    tomorrowStartIndex = html.indexOf("<section class=\"tomorrow-weather\">");
                    today = String(html.slice(todayStartIndex, html.indexOf("</section>", todayStartIndex) + 10));
                    tomorrow = String(html.slice(tomorrowStartIndex, html.indexOf("</section>", tomorrowStartIndex) + 10));
                    
                    /**
                     * today
                     */
                    weather.today.imgUrl = ScrapingHelpers.getTagAttribute(today, "img", "src");
                    weather.today.title = ScrapingHelpers.getTagAttribute(today, "img", "title");
                    weather.today.highTmp = ScrapingHelpers.getTagValue(today, "span", "high-temp", "value");
                    weather.today.lowTmp = ScrapingHelpers.getTagValue(today, "span", "low-temp", "value");

                    /**
                     * tomorrow
                     */
                    weather.tomorrow.imgUrl = ScrapingHelpers.getTagAttribute(tomorrow, "img", "src");
                    weather.tomorrow.title = ScrapingHelpers.getTagAttribute(tomorrow, "img", "title");
                    weather.tomorrow.highTmp = ScrapingHelpers.getTagValue(tomorrow, "span", "high-temp", "value");
                    weather.tomorrow.lowTmp = ScrapingHelpers.getTagValue(tomorrow, "span", "low-temp", "value");
                    
                }, (err) => {
                    console.log("HTML fetch error", error);
                });
            dispatch({
                type: FETCH_WEATHER,
                weather: weather
            });
        } catch (err) {
            console.error(err);
        }
    };
};
