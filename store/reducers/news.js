// Custom
import * as newsActions from '../actions/news';

const initialState = {
    news: {}
};

const newsReducer = (state = initialState, action) => {
    if (action.type === newsActions.FETCH_NEWS) {
        return {
            ...state,
            news: action.news
        };
    } else {
        return state;
    }
};

export default newsReducer;
