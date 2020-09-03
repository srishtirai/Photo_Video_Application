import {types} from '../actions/actionTypes';

const initialstate = {
	devices: [],
	id: 0,
	contents: []
}

const deviceList = (state = initialstate, action) => {
	switch (action.type) {
		case types.GET_LIST_DEVICES: {
			let returnObject = action.devices;
			const newState = {devices: returnObject, deviceIndex: 0};
			if (action.mobileTVPlusList) {
				newState.mobileTVPlusList = action.mobileTVPlusList;
			}
			return Object.assign({}, state, newState);
		}

		case types.SET_LAST_DEVICE: {
			return Object.assign({}, state, {lastDevice: action.name});
		}

		default: 
      		return state
	}
};

const currentContentsInfo = (state = initialstate, action) => {
	switch (action.type) {
		case types.GET_LIST_CONTENTS: {
			let newContents = action.contents;
			const newState = {contentList: newContents};
			return Object.assign({}, state, newState);
		}

		default: 
			return state
	}
};


const listReducer = {
	deviceList,
	currentContentsInfo
}

export default listReducer;