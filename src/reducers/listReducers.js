import {types} from '../actions/actionTypes';

const initialstate = {
	devices: [],
	id: 0,
	currentDevice: []
}

const initialCurrentContentsState = {
	contentList: [],
	filterType: 'All',
	viewList: []
}

const deviceList = (state = initialstate, action) => {
	switch (action.type) {
		case types.GET_LIST_DEVICES: {
			let newState = [];
			if (action.TVList) {
				newState.devices = action.TVList;
			}
			else{
				newState.devices = action.devices;
			}
			return Object.assign({}, state, newState);
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


const listReducer = {
	deviceList,
	currentContentsInfo
}

export default listReducer;