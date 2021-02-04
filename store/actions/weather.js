// Standard
import DOMParser from 'react-native-html-parser';

export const FETCH_WEATHER = "FETCH_WEATHER";
export const fetchWeather = () => {
    const weatherFetchURL = "https://tenki.jp/forecast/3/14/4310/11235/";
    return async dispatch => {
        /**
         * To-Do (Page Scraping)
         */
        try {
            await fetch(weatherFetchURL)
                .then((res) => {
                    return res.text();
                }, (err) => {
                    console.log("Webpage fetch error", error);
                })
                .then((res) => {
                    console.log("html", JSON.stringify(res));
                    /**
                     * Parse HTML
                     */
                }, (err) => {
                    console.log("HTML fetch error", error);
                });

            dispatch({
                type: FETCH_WEATHER,
                weather: {}
            });
        } catch (err) {
            console.error(err);
        }
    };
};
