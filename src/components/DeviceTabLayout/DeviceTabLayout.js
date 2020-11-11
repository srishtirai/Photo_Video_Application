import React, {useEffect} from 'react';
import {connect} from 'react-redux';
import {TabLayout, Tab} from '@enact/goldstone/TabLayout';
import FileGridList from '../FileGridList/FileGridList';
import {getDeviceProperties, setCurrentDevice, setFilterType} from '../../actions/deviceListActions';
import {listFolderContents} from '../../actions/deviceListActions';
import css from './DeviceTabLayout.module.less';

const DeviceTabs = ({collapsed, devices, deviceProperties, deviceContentList, getlistFolderContents, selectMode, setSelectedDevice, setFilter, sortType}) => {
	useEffect(() => {
		if (devices && devices[0] && selectMode !== 'Select Play') {
			getlistFolderContents(devices[0]);
			setFilter("All", sortType);
		}
	}, [devices])

	const onSelectDevice = ({index}) => {
		const selectedDevice = devices[index];
		setSelectedDevice(selectedDevice);
		deviceProperties(selectedDevice);
		getlistFolderContents(selectedDevice);
		setFilter("All", sortType);
	}

	return (
		<TabLayout
			onSelect={onSelectDevice}
			collapsed={collapsed}
		>
			{devices.map((device, index) => {
				const deviceUri = device.subDevices ? device.subDevices[0].deviceUri : device.deviceUri
				return (
					<Tab className={css.tab} key={index} title={device.deviceName} icon='usb'>
						<FileGridList device={device} deviceFileList={deviceContentList} deviceUri={deviceUri} />
					</Tab>
				)
			}
			)}
		</TabLayout>
	);
};

const mapStateToProps = ({currentDeviceFileList, devices, options, path}) => ({
	devices: devices.devices,
	deviceContentList: currentDeviceFileList.deviceContentList,
	path,
	sortType: options.sortType,
	selectMode: options.selectMode
})

const DeviceTabLayout = connect(
	mapStateToProps,
	{
		getlistFolderContents: listFolderContents,
		setSelectedDevice: setCurrentDevice,
		deviceProperties: getDeviceProperties,
		setFilter: setFilterType
	}
)(DeviceTabs);

export default DeviceTabLayout;
