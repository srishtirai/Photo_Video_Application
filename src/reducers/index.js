import {combineReducers} from 'redux';
import {types} from '../actions/actionTypes';
import {deviceListReducer, currentDeviceFileListReducer} from './listReducer';
import {settingsReducer} from './settingsReducer';

function path (state = 'home', action) {
  switch (action.type) {
    case 'NAVIGATE':
      return action.path;
    default:
      return state;
  }
}

const panels = (state = [], action) => {
  switch (action.type) {
    case types.PUSH_PANEL:
      return [...state, action.folderInfo];
    case types.POP_PANEL:
      return [...state.slice(0, (state.length - 1))];
    case types.POP_PANEL_BY_INDEX:
      return [...state.slice(0, action.index)];
    default:
      return state;
  }
};

export default combineReducers({
  devices: deviceListReducer,
  currentDeviceFileList: currentDeviceFileListReducer,
  path,
  panels,
  options: settingsReducer
})
