import {types} from '../actions/actionTypes';

const initialstate = {
	devices: [],
	id: 0
}

const deviceList = (state = initialstate, action) => {
	switch (action.type) {
		case types.GET_LIST_DEVICES: {
			let returnObject = action.devices;
			const newState = {devices: returnObject, deviceIndex: 0};
			return Object.assign({}, state, newState);
		}

		case types.SET_LAST_DEVICE: {
			return Object.assign({}, state, {lastDevice: action.name});
		}

		default: 
      		return state
	}
};

const listReducer = {
    deviceList
}

export default listReducer;