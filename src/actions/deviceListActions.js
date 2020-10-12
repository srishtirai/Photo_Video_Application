import {types} from './actionTypes';
import LS2Request from '@enact/webos/LS2Request';
import listDevicesData from '../../Assets/mock/listDevices.json';
import listFolderContentsData from '../../Assets/mock/listFolderContents.json';
import listProperties from '../../Assets/mock/listProperties.json';
import AppLog from '../components/AppLog/AppLog';

// Action to get list of available storage devices list.

export const getDevicesListAction = (devices, mobileTVPlusList) => {
	return {
		type: types.GET_DEVICES_LIST,
		devices: devices,
		mobileTVPlusList: mobileTVPlusList
	};
};

export const listDevices = () => (dispatch) => {
	if (typeof window === 'object' && !window.PalmSystem) {
		dispatch(getDevicesListAction(listDevicesData.devices));
		return {};
	}
	return new LS2Request().send({
		service: 'luna://com.webos.service.attachedstoragemanager/',
		method: 'listDevices',
		parameters: {
			subscribe: true
		},
		onSuccess: (res) => {
			console.table(res.devices);
			dispatch(getDevicesListAction(res.devices));
		}
	});
};

// Action to get selected storage device contents.

export const getListContents = (res, totalCount) => {
	return {
		type: types.GET_LIST_CONTENTS,
		contents: res,
		totalCount
	};
};

export const listFolderContents = (data) => (dispatch) => {
	if (typeof window === 'object' && !window.PalmSystem) {
		let contents = listFolderContentsData.contents;
		dispatch(getListContents(contents, contents.length));
		return;
	}
	let opt = {
		path: data.deviceUri,
		deviceId: data.deviceId,
		offset: 0,
		limit: 100,
		dataScope: 'full',
		requestType: 'byItemType',
		itemType: ['all'],
		sortType: 'modifiedTime'
	};

	return new LS2Request().send({
		service: 'luna://com.webos.service.attachedstoragemanager/',
		method: 'listFolderContents',
		parameters: opt,
		onSuccess: (res) => {
			let returnObject = res.contents;
			dispatch(getListContents(returnObject, res.totalCount));
			return res;
		},
		onFailure: (res) => {
			AppLog(res);
		}
	});
};

// Action to set the selected device as the current device.

export const setCurrentDevice = (device) => {
	return {
		type: types.SET_CURRENT_DEVICE,
		device
	}
};

// Action to set filter type and obtain filtered items.

export const setFilterType = (filterType) => {
	return {
		type: types.SET_FILTER_TYPE,
		filterType: filterType
	};
};


// Action to get selected storage devices properties.

export const getDevicePropertiesAction = (freeSpace, totalSpace) => {
	return {
		type: types.GET_DEVICE_PROPERTIES,
		freeSpace,
		totalSpace
	};
};

const getSpaceInfoFormat = (inFree) => {
	let result = {},
		unit = ['MB', 'GB', 'TB'],
		unitIndex = 0;
	while (inFree > 1024) {
		inFree = (inFree / 1024);
		unitIndex++;
	}
	if (inFree < 10) {
		inFree = inFree.toFixed(2);
	} else if (inFree < 100) {
		inFree = inFree.toFixed(1);
	} else {
		inFree = inFree.toFixed(0);
	}
	result = inFree + unit[unitIndex];
	return result;
};

export const getDeviceProperties = (device) => (dispatch) => {
	if (typeof window === 'object' && !window.PalmSystem) {
		let freeSpace = getSpaceInfoFormat(listProperties.freeSpace);
		let totalSpace = getSpaceInfoFormat(listProperties.totalSpace);
		dispatch(getDevicePropertiesAction(freeSpace, totalSpace));
		return;
	}
	return new LS2Request().send({
		service: 'luna://com.webos.service.attachedstoragemanager/',
		method: 'getProperties',
		parameters: {
			deviceId: device.deviceId,
			subDeviceId: device.subDevices ? device.subDevices[0].deviceId : ''
		},
		onSuccess: (res) => {
			AppLog(res);
			let freeSpace = getSpaceInfoFormat(res.freeSpace || 0);
			let totalSpace = getSpaceInfoFormat(res.totalSpace || 0);
			dispatch(getDevicePropertiesAction(freeSpace, totalSpace));
		},
		onFailure: (res) => {
			AppLog(res);
		}
	});
};
