import {applyMiddleware, compose, createStore} from 'redux';
import thunk from 'redux-thunk';
import logger from 'redux-logger';
import freeze from 'redux-freeze';

import rootReducer from '../reducers';

export const configureStore = (initialState) => {
	const middlewares = [thunk]
	if (process.env.NODE_ENV !== 'production') {
		middlewares.push(logger);
		middlewares.push(freeze);
	}

	const devToolEnhancers = window.__REDUX_DEVTOOLS_EXTENSION_COMPOSE__ || compose;
	const middlewareEnhancer = applyMiddleware(...middlewares)
	const store = createStore(
		rootReducer,
		initialState,
		devToolEnhancers(middlewareEnhancer)
	);
	return store;
};
