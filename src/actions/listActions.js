import {types} from './actionTypes';
import LS2Request from '@enact/webos/LS2Request';
import listDevicesData from '../../Assets/mock/listDevices.json';

export const getListDevicesAction=(devices)=>{
    return {
		type: types.GET_LIST_DEVICES,
        devices: devices
    }
}

export const listDevices = (dispatch) => {
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
        }
    })
}