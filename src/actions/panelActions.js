import * as pmLog from '@enact/webos/pmloglib';
import {types} from './actionTypes';

// Panel management
const pushPanel = (folderInfo) => (dispatch) => {
  if (folderInfo && !folderInfo.isItem) {	// isItem: false means storage item
    let deviceType;
    switch (folderInfo.deviceType) {
      case 'usb':
        deviceType = 'USB';
        break;
      case 'dms':
        deviceType = 'DLNA';
        break;
      default: // It means internal storage type
        deviceType = 'internal';
        break;
    }
    pmLog.info('NL_MENU_CLICK', {'storage_type': deviceType, 'menu_name': folderInfo.deviceType}, '');
  }
  dispatch({type: types.PUSH_PANEL, folderInfo});
};

const popPanel = () => (dispatch, getState) => {
  const panelDepth = getState().panels.length;
  dispatch({type: types.POP_PANEL});
};

const popPanelByIndex = (index) => ({type: types.POP_PANEL_BY_INDEX, index});

export {
  pushPanel,
  popPanel,
  popPanelByIndex
};
