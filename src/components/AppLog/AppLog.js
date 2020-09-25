import * as pmLog from '@enact/webos/pmloglib';

export const AppLog = (msg, arg) => {
  if (typeof console !== 'undefined') {
    if (!arg) {
      console.log(msg);	// eslint-disable-line no-console
    } else {
      console.log(msg, arg);	// eslint-disable-line no-console
    }
  }
};

export const printPmLog = (key, msg, object = {}) => {
  pmLog.info(key, object, msg);
};

export default AppLog;
