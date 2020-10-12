import React from 'react';
import {connect} from 'react-redux';
import {TabLayout, Tab} from '@enact/goldstone/TabLayout';
import {getDeviceProperties, setCurrentDevice} from '../../actions/deviceListActions';
import FileGridList from '../FileGridList/FileGridList'
import css from './DeviceTabLayout.module.less';
import {listFolderContents} from '../../actions/deviceListActions'
import FilterSelection from '../Filter/FilterSelection';

const DeviceTabs = ({devices, deviceProperties, getlistFolderContents, setCurrentDevice}) => {

    const onSelectDevice = ({index}) => {
        const selectedDevice = devices[index];
        setCurrentDevice(selectedDevice);
        deviceProperties(selectedDevice);
        getlistFolderContents(selectedDevice)
    }

    return (
        <>
        <FilterSelection />
        <TabLayout
            onSelect={onSelectDevice}
        >
            {devices.map((device, index) =>
                <Tab className={css.tab} key={index} title={device.deviceName} icon='usb'>
                    <FileGridList device={device} />
                </Tab>
            )}
        </TabLayout>
        </>
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
        deviceProperties: getDeviceProperties
    }
)(DeviceTabs);

export default DeviceTabLayout;
