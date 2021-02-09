// Custom
export const FETCH_WEATHER = "FETCH_WEATHER";
export const fetchWeather = () => {

    const weatherFetchURL = "https://tenki.jp/forecast/3/14/4310/11235/";

    const getTagAttribute = (html, tagName, attribute) => {
        let startIndex = html.indexOf(`<${tagName}`);
        let attributeStartIndex = html.indexOf(`${attribute}=`, startIndex) + String(attribute).length + 1;
        let attributeLastIndex = html.indexOf("\"", attributeStartIndex + 1);

        return html.slice(attributeStartIndex + 1, attributeLastIndex);
    };
    const getTagValue = (html, tagName, startClassName, className) => {
        let startIndex = html.indexOf(`<${tagName}`, html.indexOf(startClassName));
        let classStartIndex = html.indexOf(`class="${className}">`, startIndex) + String(className).length + 9;
        let classLastIndex = html.indexOf("<", classStartIndex + 1);

        return html.slice(classStartIndex, classLastIndex);
    };

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
                    weather.today.imgUrl = getTagAttribute(today, "img", "src");
                    weather.today.title = getTagAttribute(today, "img", "title");
                    weather.today.highTmp = getTagValue(today, "span", "high-temp", "value");
                    weather.today.lowTmp = getTagValue(today, "span", "low-temp", "value");

                    /**
                     * tomorrow
                     */
                    weather.tomorrow.imgUrl = getTagAttribute(tomorrow, "img", "src");
                    weather.tomorrow.title = getTagAttribute(tomorrow, "img", "title");
                    weather.tomorrow.highTmp = getTagValue(tomorrow, "span", "high-temp", "value");
                    weather.tomorrow.lowTmp = getTagValue(tomorrow, "span", "low-temp", "value");
                    
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
