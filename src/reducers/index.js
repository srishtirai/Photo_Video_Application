import {combineReducers} from 'redux';
import {deviceListReducer, currentDeviceFileListReducer} from './listReducer';
import {imageListReducer} from './photosReducer';
import {settingsReducer} from './settingsReducer';

export default combineReducers({
  currentDeviceFileList: currentDeviceFileListReducer,
  devices: deviceListReducer,
  imagesList: imageListReducer,
  options: settingsReducer
})
