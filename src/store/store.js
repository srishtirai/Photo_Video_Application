import {createStore} from 'redux'

import listReducer from '../reducers/listReducers';

const store=createStore(listReducer)

export default store