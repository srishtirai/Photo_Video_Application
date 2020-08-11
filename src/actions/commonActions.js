import LS2Request from '@enact/webos/LS2Request';

export const closeApp = (params) => () => {
	
	if (typeof window === 'object' && !window.PalmSystem) {
		window.close();
		return;
	}
	return new LS2Request().send({
		service: 'luna://com.webos.applicationManager',
		method: 'closeByAppId',
		parameters: params
	});
};
