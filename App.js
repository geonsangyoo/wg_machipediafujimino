/**
 * ワナグロウ > MACHIPEDIA FUJIMINO App ver 1.0
 * https://github.com/geonsangyoo/wg_machipediafujimino.git
 *
 */

 // Standard
 import React from 'react';
 import { Provider } from 'react-redux';
 import { createStore, combineReducers, applyMiddleware } from 'redux';
 import ReduxThunk from 'redux-thunk';
 import { composeWithDevTools } from 'redux-devtools-extension/developmentOnly';

// Custom
import newsReducer from './store/reducers/news';
import HomeBottomTabNavigator from './navigation/MainNavigator';

// Redux
const rootReducer = combineReducers({
  news: newsReducer
});
const middlewareEnhancer = applyMiddleware(ReduxThunk);
const store = createStore(rootReducer, composeWithDevTools(middlewareEnhancer));

 export default function App() {
  return (
    <Provider store={ store }>
      <HomeBottomTabNavigator />
    </Provider>
  );
}
