import React, {useEffect, useReducer} from 'react';
import {connect} from 'react-redux';
import IconButton from '@enact/goldstone/IconButton';
import {Panel, Header} from '@enact/goldstone/Panels';

import {appId} from '../data/appConfig';
import {closeApp} from '../actions/commonActions';
import {listDevices, listDevicePhotoList} from '../actions/deviceListActions';
import DeviceTabLayout from '../components/DeviceTabLayout/DeviceTabLayout';
import Settings from '../components/Settings/Settings';
import {settingsReducer} from '../reducers/settingsReducer';
import FilterSelection from '../components/Filter/FilterSelection';
import SelectContentType from '../components/SelectMode/SelectContentType';

require.context('../../Assets/Thumbnails/', false, /\.png$/);
require.context('../../Assets/samplePhoto_fhd/', false, /\.jpg$/);

const initialState = {
	settings: {
		isOpen: false
	},
	selectPlayPopup: {
		isOpen: false
	}
}

const MainPanel = ({currentDevice, freeSpace, getDevicesList, onCloseApp, getListDevicePhotoList, totalSpace, ...rest}) => {
	const [state, dispatch] = useReducer(settingsReducer, initialState);
	const onClose = () => onCloseApp(appId);
	const optionPopup = () => dispatch({type: 'toggle', payload: 'settings'});
	const selectPlay = () => dispatch({type: 'toggle', payload: 'selectPlayPopup'});

	useEffect(() => {
		getDevicesList();
		getListDevicePhotoList();
	})

	return (
		<Panel {...rest}>
			<Header
				slots='title'
				title='Media discovery'
				type='compact'
				subtitle={currentDevice.deviceName + " : " + freeSpace + " Free / " + totalSpace}
				marqueeOn='render'
				noCloseButton
				slotAfter={
					<div>
						<IconButton size={'small'}>search</IconButton>
						<IconButton size={'small'} onClick={optionPopup}>verticalellipsis</IconButton>
						<IconButton size={'small'} onClick={onClose}>closex</IconButton>
					</div>
				}
			/>
			{
				state.settings.isOpen &&
				<Settings popup={selectPlay} optionPopup={optionPopup} />
			}
			{
				state.selectPlayPopup.isOpen &&
				<SelectContentType />
			}

			<FilterSelection />
			<DeviceTabLayout />

		</Panel>
	)
}

const mapStateToProps = state => (
	{
		currentDevice: state.devices.currentDevice,
		freeSpace: state.devices.freeSpace,
		totalSpace: state.devices.totalSpace
	}
)

const Main = connect(
	mapStateToProps,
	{
		getDevicesList: listDevices,
		onCloseApp: closeApp,
		getListDevicePhotoList: listDevicePhotoList
	}
)(MainPanel);

export default Main;
export {MainPanel, Main};
