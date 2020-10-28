import React from 'react';
import {connect} from 'react-redux';
import {TabLayout, Tab} from '@enact/goldstone/TabLayout';
import {getDeviceProperties, setCurrentDevice, setFilterType} from '../../actions/deviceListActions';
import FileGridList from '../FileGridList/FileGridList'
import css from './DeviceTabLayout.module.less';
import {listFolderContents} from '../../actions/deviceListActions'
import {setSortType, setViewType} from '../../actions/settingsActions';

const DeviceTabs = ({devices, deviceProperties, getlistFolderContents, setSelectedDevice, setFilter, setSort, sortType, setView}) => {

    const onSelectDevice = ({index}) => {
        const selectedDevice = devices[index];
        setSelectedDevice(selectedDevice);
        deviceProperties(selectedDevice);
        getlistFolderContents(selectedDevice);
        setView("Thumbnail");
        setSort("Alphabetical");
        setFilter("All", sortType);
        setSort
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

const mapStateToProps = ({devices, options}) => ({
    devices: devices.devices,
    sortType: options.sortType
})

const DeviceTabLayout = connect(
    mapStateToProps,
    {
        getlistFolderContents: listFolderContents,
        setSelectedDevice: setCurrentDevice,
        deviceProperties: getDeviceProperties,
        setFilter: setFilterType,
        setSort: setSortType,
        setView: setViewType
    }
)(DeviceTabs);

export default DeviceTabLayout;
