import {types} from './actionTypes';
import LS2Request from '@enact/webos/LS2Request';
import listDevicesData from '../../Assets/mock/listDevices.json';
import listFolderContentsData from '../../Assets/mock/listFolderContents.json';

export const getDevicesListAction = (devices, mobileTVPlusList) => {
	console.log(devices, mobileTVPlusList)
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
			path: data.path,
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
		}
	});
};

export const setCurrentDevice = (device) => {
	return{
		type: types.SET_CURRENT_DEVICE,
		device
	}
};

export const setFilterType = (filterType) => {
	return {
		type: types.SET_FILTER_TYPE,
		filterType:filterType
	};
};
