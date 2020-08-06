import {types} from '../actions/actionTypes';

const initialstate={
devices:[]
}

const deviceList = (state =initialstate, action) => {
	switch (action.type) {
		case types.GET_LIST_DEVICES: {
			let returnObject = action.devices;
			const newState = {devices: returnObject, deviceIndex: void 0};
			return Object.assign({}, state, newState);
		}
		default: 
      		return state
	}
};

const listReducer = {
    deviceList
}

export default listReducer;