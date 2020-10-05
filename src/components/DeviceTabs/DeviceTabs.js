import React, {useState} from 'react';
import {TabLayout, Tab} from '@enact/goldstone/TabLayout';
import css from './DeviceTabs.module.less';

const DeviceTabs = ({devices, setDevice, space}) => {
    const [collapse, setCollapse] = useState(false);

    const onSelectDevice = (ev) => {
		if(!collapse)
		{
			setDevice(devices[ev.index]);
			space(devices[ev.index]);
			setCollapse(true);
		}
		else{
			setCollapse(false);
        }
    }

    return(
        <TabLayout
            className={css.tabLayout}
            onSelect={onSelectDevice}
            dimensions={{tabs: {collapsed: 20, normal: 1000}, content: {expanded: null, normal: null}}}
            collapsed={collapse}
        >
            {devices.map((item, index) =>
                <Tab className={css.tab} key={index} title={item.deviceName} icon='usb'/>
            )}
        </TabLayout>
	);
};

export default DeviceTabs;