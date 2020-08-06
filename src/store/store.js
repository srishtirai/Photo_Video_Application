import {createStore, applyMiddleware,combineReducers} from 'redux';
import listReducer from '../reducers/listReducers';
import thunkMiddleware from 'redux-thunk';

const rootReducer = combineReducers(listReducer);

export default function configureStore (initialState) {
	const store = createStore(
		rootReducer,
		initialState,
		applyMiddleware(thunkMiddleware) // lets us dispatch functions
	);
	return store;
}