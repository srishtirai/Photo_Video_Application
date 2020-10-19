import {combineReducers} from 'redux';
import {deviceListReducer, currentDeviceFileListReducer} from './listReducer';
import {imageListReducer} from './photosReducer';

export default combineReducers({
  devices: deviceListReducer,
  currentDeviceFileList: currentDeviceFileListReducer,
  imagesList: imageListReducer
})
