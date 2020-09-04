import {types} from './actionTypes';
import LS2Request from '@enact/webos/LS2Request';
import listDevicesData from '../../Assets/mock/listDevices.json';
import listFolderContentsData from '../../Assets/mock/listFolderContents.json';

export const getListDevicesAction = (devices, mobileTVPlusList) => {
	return {
		type: types.GET_LIST_DEVICES,
		devices: devices,
		mobileTVPlusList: mobileTVPlusList
	};
};

export const listDevices = () => (dispatch) => {
	if (typeof window === 'object' && !window.PalmSystem) {
		dispatch(getListDevicesAction(listDevicesData.devices));
		return;
	}
	return new LS2Request().send({
		service: 'luna://com.webos.service.attachedstoragemanager/',
		method: 'listDevices',
		parameters: {
			subscribe: true
		},
		onSuccess: (res) => {
			console.table(res.devices);
			let  mobileTVPlusList = res.devices;
			dispatch(getListDevicesAction(mobileTVPlusList));
		}
	});
};

export const getListContentsAction = (res, totalCount) => {
	return {
		type: types.GET_LIST_CONTENTS,
		contents: res,
		totalCount
	};
};

export const listFolderContents = (data) => (dispatch) => {
	if (typeof window === 'object' && (!window.PalmSystem || window.PalmSystem.isTestMode) ){
		let contents = listFolderContentsData.contents;
		dispatch(getListContentsAction(contents, contents.length));
		return;
	}
	let opt = {
			path: data.path,
			deviceId: data.deviceId,
			offset: data.offset,
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
			dispatch(getListContentsAction(returnObject, res.totalCount));
		}
	});
};

export const setLastDevice = (name) => {
	return{
		type: types.SET_LAST_DEVICE,
		name
	}
};

export const setFilterType = (filterType) => {
	return {
		type: types.SET_FILTER_TYPE,
		filterType
	};
};
