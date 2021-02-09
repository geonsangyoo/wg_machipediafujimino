// Custom
import * as weatherActions from '../actions/weather';

const initialState = {
    weather: {}
};

const weatherReducer = (state = initialState, action) => {
    if (action.type === weatherActions.FETCH_WEATHER) {
        return {
            ...state,
            weather: action.weather
        };
    } else {
        return state;
    }
};

export default weatherReducer;
