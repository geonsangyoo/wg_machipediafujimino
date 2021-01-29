export const FETCH_NEWS = "FETCH_NEWS";
export const fetchNews = () => {
    return async dispatch => {
        dispatch({
            type: FETCH_NEWS,
            news: {}
        });
    }
};
