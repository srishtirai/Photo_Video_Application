import {types} from './actionTypes';
import LS2Request from '@enact/webos/LS2Request';
import AppLog from '../components/AppLog/AppLog';
import listDevicesData from '../../Assets/mock/listDevices.json';
import listFolderContentsData from '../../Assets/mock/listFolderContents.json';
import listProperties from '../../Assets/mock/listProperties.json';
import photoListProperties from '../../Assets/mock/listPhotos.json';

// Action to get list of available storage devices list.

// need to delete
export const navigate = (path) => {
	return {
		type: 'NAVIGATE',
		path
	};
};

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
			let devices = res.devices.map(device => ({...device, rootContentList: []}))
			console.table(devices)
			dispatch(getDevicesListAction(devices));
		}
	});
};

// Action to get selected storage device contents.
export const getListContents = (deviceId, deviceUri, res, totalCount) => {
	return {
		type: types.GET_LIST_CONTENTS,
		contents: res,
		deviceId,
		deviceUri,
		totalCount
	};
};

export const listFolderContents = (deviceInfo, subFolderpath) => (dispatch, getState) => {
	const getDeviceContentList = getState().currentDeviceFileList.deviceContentList;
	const path = getState().path;
	let deviceUri;

	if (subFolderpath) {
		deviceUri = subFolderpath
	} else {
		deviceUri = deviceInfo.subDevices ? deviceInfo.subDevices[0].deviceUri : deviceInfo.deviceUri
	}

	if (typeof window === 'object' && !window.PalmSystem) {
		let contents = listFolderContentsData.contents;
		dispatch(getListContents(deviceInfo.deviceId, deviceUri, contents, contents.length));
		return;
	}
	let subDeviceId = deviceInfo.subDevices ? deviceInfo.subDevices[0].deviceId : ''


	let opt;
	if (deviceInfo && deviceInfo.deviceType === 'internal capture tv') {
		opt = {
			deviceId: deviceInfo.deviceId,
			subDeviceId: subDeviceId,
			path: deviceUri,
			offset: 0,
			limit: 100,
			dataScope: 'full',
			requestType: 'byItemType',
			itemType: ['folder', 'image', 'video'],
			sortType: 'modifiedTime'
		};
	} else {
		opt = {
			path: deviceUri,
			deviceId: deviceInfo.deviceId,
			subDeviceId: subDeviceId,
			offset: 0,
			limit: 100,
			dataScope: 'full',
			requestType: 'byItemType',
			itemType: (deviceInfo && deviceInfo.deviceType === 'dms') ? ['all'] : ['folder', 'image', 'video', 'audio'] // all (exclude music)
		};
	}

	if (Object.keys(getDeviceContentList).includes(deviceInfo.deviceId) && path === "home") {
		return {}
	}

	return new LS2Request().send({
		service: 'luna://com.webos.service.attachedstoragemanager/',
		method: 'listFolderContents',
		parameters: opt,
		onSuccess: (res) => {
			let returnObject = res.contents;
			dispatch(getListContents(deviceInfo.deviceId, deviceUri, returnObject, res.totalCount));
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
export const setFilterType = (filterType, sortType) => {
	return {
		type: types.SET_FILTER_TYPE,
		filterType: filterType,
		sortType: sortType
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

// Get photo list
export const setPhotoUrl = (photoUrls) => {
	return {
		type: 'SET_PHOTO_URL',
		photoUrls
	};
};

export const listDevicePhotoList = () => (dispatch) => {
	if (typeof window === 'object' && !window.PalmSystem) {
		dispatch(setPhotoUrl(photoListProperties.results));
		return {};
	}
	return new LS2Request().send({
		service: 'luna://com.webos.mediadb/',
		method: 'search',
		parameters: {
			query: {
				from: "com.webos.service.cbox.image:1",
				where: [{
					op: "=",
					prop: "udn",
					val: "INTERNAL_STORAGE_SAMPLE_PHOTO"
				}],
				limit: 200,
				orderBy: "fileName"
			},
			count: true,
			subscribe: true
		},
		onSuccess: (res) => {
			const photoUrls = res.results.map((result) => {
				let encodedPath = encodeURIComponent(result.thumbnails);
				if (result.thumbnails && result.thumbnails.substring(0, 1) === '/') {
					encodedPath = 'file:///' + encodedPath;
				}
				result.thumbnails = encodedPath
				return result
			})

			dispatch(setPhotoUrl(photoUrls));
		}
	});
};
