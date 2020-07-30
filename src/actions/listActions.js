import {types} from './actionTypes';

import listDevicesData from '../../Assets/mock/listDevices.json';

export const getListDevicesAction=(devices)=>{
    return {
		type: types.GET_LIST_DEVICES,
        devices: devices
    }
}

export const listDevices = () => () => {
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
            AppLog(res);
        }
    })
}