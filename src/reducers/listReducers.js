import {types} from '../actions/actionTypes';

const initialCurrentContentsState = {
	contentList: [],
	filterType: 'All'
}
const initialstate = {
	devices: [],
	currentDevice: {}
}

const deviceListReducer = (state = initialstate, action) => {
	switch (action.type) {
		case types.GET_DEVICES_LIST: {
			const newDeviceList = (action.devices.length > 0) ? {devices: action.devices, currentDevice: action.devices[0]} : state
			if (action.mobileTVPlusList) {
				newDeviceList.mobileTVPlusList = action.mobileTVPlusList;
			}
			return {...state, ...newDeviceList};
		}

		case types.SET_CURRENT_DEVICE: {
			return Object.assign({}, state, {currentDevice: action.device});
		}

		default:
			return state
	}
};

const currentContentsInfo = (state = initialCurrentContentsState, action) => {
	switch (action.type) {
		case types.GET_LIST_CONTENTS: {
			let
				newContents = action.contents
			return Object.assign({}, state, { contentList: newContents });

		}

		case types.SET_FILTER_TYPE: {
			if (state.filterType === action.filterType) {
				return state;
			}
			else {
				return Object.assign({}, state, {filterType: action.filterType});
			}
		}

		default:
			return state
	}
};

const listReducer={
	deviceListReducer,
	currentContentsInfo
}
export default listReducer;