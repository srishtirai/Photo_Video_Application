import React from 'react';
import {connect} from 'react-redux';
import {TabLayout, Tab} from '@enact/goldstone/TabLayout';
import {getDeviceProperties, setCurrentDevice, setFilterType} from '../../actions/deviceListActions';
import FileGridList from '../FileGridList/FileGridList'
import css from './DeviceTabLayout.module.less';
import {listFolderContents} from '../../actions/deviceListActions'

const DeviceTabs = ({devices, deviceProperties, getlistFolderContents, setCurrentDevice, setFilterType}) => {

    const onSelectDevice = ({index}) => {
        const selectedDevice = devices[index];
        setCurrentDevice(selectedDevice);
        deviceProperties(selectedDevice);
        getlistFolderContents(selectedDevice);
        setFilterType("All");
    }

    return (
        <TabLayout
            onSelect={onSelectDevice}
        >
            {devices.map((device, index) =>
                <Tab className={css.tab} key={index} title={device.deviceName} icon='usb'>
                    <FileGridList device={device} />
                </Tab>
            )}
        </TabLayout>
    );
};

const mapStateToProps = ({devices}) => ({
    devices: devices.devices,
})

const DeviceTabLayout = connect(
    mapStateToProps,
    {
        getlistFolderContents: listFolderContents,
        setCurrentDevice,
        deviceProperties: getDeviceProperties,
        setFilterType
    }
)(DeviceTabs);

export default DeviceTabLayout;
