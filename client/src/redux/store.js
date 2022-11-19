import { createStore, applyMiddleware } from 'redux';
import thunk from 'redux-thunk';
import rootReducer from '../redux/reducers/rootReducer';
//import { createLogger } from 'redux-logger';
import logger from 'redux-logger';
import { composeWithDevTools } from 'redux-devtools-extension';

const middlewares = [thunk, logger];

const initialState = {};

const store = createStore(
    rootReducer, 
    initialState,
    composeWithDevTools(applyMiddleware(...middlewares))
);



export default store;