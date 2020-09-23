import listReducer from '../reducers/listReducers';
import settingsReducer from '../reducers/settingsReducer';

import {createStore, applyMiddleware,combineReducers} from 'redux';
import thunkMiddleware from 'redux-thunk';

const rootReducer = combineReducers(listReducer,settingsReducer);

export default function configureStore (initialState) {
	const store = createStore(
		rootReducer,
		initialState,
		applyMiddleware(thunkMiddleware)
	);
	return store;
}