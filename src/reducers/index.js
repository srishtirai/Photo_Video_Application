import {combineReducers} from 'redux';
import listReducer from './listReducers';

export default combineReducers({
  devices: listReducer.deviceListReducer,
  contentList: listReducer.currentContentsInfo
})