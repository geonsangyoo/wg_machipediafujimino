// Custom
import * as newsActions from '../actions/news';

const initialState = {
    news: {}
};

const newsReducer = (state = initialState, action) => {
    switch (action.type) {
        case newsActions.FETCH_NEWS:
            return {
                ...state,
                news: action.news
            };
        default:
            return state;
    }
};

export default newsReducer;
