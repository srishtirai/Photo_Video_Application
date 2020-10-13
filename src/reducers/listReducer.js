import {types} from '../actions/actionTypes';

const initialstate = {
	devices: [],
	currentDevice: {},
	freeSpace: 0,
	totalSpace: 0
}

export const deviceListReducer = (state = initialstate, action) => {
	const devices = action.devices
	switch (action.type) {
		case types.GET_DEVICES_LIST: {
			const newDeviceList = (devices.length > 0) ? {devices: devices, currentDevice: devices[0]} : state
			if (action.mobileTVPlusList) {
				newDeviceList.mobileTVPlusList = action.mobileTVPlusList;
			}
			return {...state, ...newDeviceList};
		}

		case types.SET_CURRENT_DEVICE: {
			return Object.assign({}, state, {currentDevice: action.device});
		}

		case types.GET_DEVICE_PROPERTIES: {
			return Object.assign({}, state, {freeSpace: action.freeSpace, totalSpace: action.totalSpace});
		}

		default:
			return state
	}
};

// Selected device file list & filtered list.
const initialCurrentContentsState = {
	contentList: [],
	filterType: 'All',
	filteredList: []
}

export const currentDeviceFileListReducer = (state = initialCurrentContentsState, action) => {
	console.log('action.contents')
	console.log(action)
	switch (action.type) {
		case types.GET_LIST_CONTENTS: {
			return {...state, contentList: action.contents, filteredList: action.contents};
		}

		case types.SET_FILTER_TYPE: {
			const
				contentList= state.contentList,
				filterType = action.filterType,
				items = [] ;

			for (let i = 0; i < contentList.length ; i++) {
				if(contentList[i].itemType === "folder"){
					;
					items.push(contentList[i]);
				}
			}
			for (let i = 0; i < contentList.length ; i++) {
				let itemType = contentList[i].itemType;
				switch(filterType){
					case "All":
						if(itemType !== "folder"){
							items.push(contentList[i]);
						}
						break;
					case "Photo":
						if(itemType === "image"){
							items.push(contentList[i]);
						}
						break;
					case "Photo & Video":
						if(itemType === "image"||itemType === "video"){
							items.push(contentList[i]);
						}
						break;
					case "Video":
						if(itemType === "video"){
							items.push(contentList[i]);
						}
						break;
					case "Music":
						if(itemType === "audio"){
							items.push(contentList[i]);
						}
						break;
				}
			}

			return Object.assign({}, state, {filterType: action.filterType, filteredList: items});
		}

		default:
			return state
	}
};
