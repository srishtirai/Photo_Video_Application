import {combineReducers} from 'redux';
import {deviceListReducer, currentContentsInfo} from './listReducer';

export default combineReducers({
  devices: deviceListReducer,
  contentList: currentContentsInfo
})