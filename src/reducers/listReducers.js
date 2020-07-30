import {types} from '../actions/actionTypes';


const deviceList = (state = {}, action) => {
	switch (action.type) {
		case types.GET_LIST_DEVICES: {
            let deviceListData = action.devices;
			const newState = {devices: deviceListData, deviceIndex: void 0};
			return Object.assign({}, state, newState);
        }
    }
}

const listReducer = {
    deviceList
}

export default listReducer;