import {combineReducers} from 'redux';
import {deviceListReducer, currentDeviceFileListReducer} from './listReducer';

export default combineReducers({
  devices: deviceListReducer,
  currentDeviceFileList: currentDeviceFileListReducer
})
