import LS2Request from '@enact/webos/LS2Request';
import AppLog from '../components/AppLog/AppLog';

export const closeApp = (params) => () => {
	if (typeof window === 'object' && !window.PalmSystem) {
		return;
	}
	return new LS2Request().send({
		service: 'luna://com.webos.applicationManager',
		method: 'closeByAppId',
		parameters: params,
		onSuccess: (res) => {
			AppLog(res);
		},
		onFailure: (res) => {
			AppLog(res);
		}
	});
};
