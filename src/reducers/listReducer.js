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
				sortType = action.sortType;

			let folders = contentList.filter((content) => content.itemType === "folder");
			if(sortType === "Alphabetical"){
				folders.sort((a, b) =>
					a.itemName.toLowerCase() > b.itemName.toLowerCase() ? 1 : -1
				);
			}

			let otherItems = [];
			contentList.map((content) => {
				let itemType = content.itemType;
				switch(itemType){
					case "image":
						if(filterType === "All" || filterType === "Photo" || filterType === "Photo & Video"){
							otherItems.push(content);
						}
						break;
					case "video":
						if(filterType === "All" || filterType === "Video" || filterType === "Photo & Video"){
							otherItems.push(content);
						}
						break;
					case "audio":
						if(filterType === "All" || filterType === "Music"){
							otherItems.push(content);
						}
						break;
				}
			});

			if(sortType === "Alphabetical"){
			otherItems.sort((a, b) =>
				a.itemName.toLowerCase() > b.itemName.toLowerCase() ? 1 : -1
			);}

			let items = [...folders, ...otherItems];
			return Object.assign({}, state, {filterType: action.filterType, filteredList: items});
		}

		default:
			return state
	}
};
