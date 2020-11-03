import React, {useEffect, useReducer} from 'react';
import {connect} from 'react-redux';
import IconButton from '@enact/goldstone/IconButton';
import {Panel, Header} from '@enact/goldstone/Panels';

import {appId} from '../data/appConfig';
import {closeApp} from '../actions/commonActions';
import {listDevices, listDevicePhotoList} from '../actions/deviceListActions';
import {setViewType, setSortType} from '../actions/settingsActions';
import DeviceTabLayout from '../components/DeviceTabLayout/DeviceTabLayout';
import Settings from '../components/Settings/Settings';
import {settingsReducer} from '../reducers/settingsReducer';
import FilterSelection from '../components/Filter/FilterSelection';

require.context('../../Assets/Thumbnails/', false, /\.png$/);
require.context('../../Assets/samplePhoto_fhd/', false, /\.jpg$/);

const initialState = {
	settings: {
		isOpen: false
	}
};

const MainPanel = ({currentDevice, title, freeSpace, getDevicesList, onCloseApp, setSort, getListDevicePhotoList, setView, totalSpace, ...rest}) => {
	const [state, dispatch] = useReducer(settingsReducer, initialState);
	const onClose = () => onCloseApp(appId);
	const optionPopup = () => dispatch({type: 'toggle', payload: 'settings'});

	useEffect(() => {
		getDevicesList();
		getListDevicePhotoList();
	}, [])

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
				<Settings setViewType={setView} setSortType={setSort} />
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
		setView: setViewType,
		setSort: setSortType,
		getListDevicePhotoList: listDevicePhotoList
	}
)(MainPanel);

export default Main;
export {MainPanel, Main};
