export const FETCH_NEWS = "FETCH_NEWS";
export const fetchNews = () => {
    return async dispatch => {
        /**
         * To-Do (Scraping)
         */
        dispatch({
            type: FETCH_NEWS,
            news: {}
        });
    }
};
