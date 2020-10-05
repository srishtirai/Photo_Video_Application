import React, { useEffect, useReducer } from 'react';
import {connect} from 'react-redux';
import Dropdown from '@enact/sandstone/Dropdown';
import IconButton from '@enact/goldstone/IconButton';
import {Panel, Header} from '@enact/goldstone/Panels';
import ThemeDecorator from '@enact/goldstone/ThemeDecorator';

import {appId} from '../data/appConfig';
import {closeApp} from '../actions/commonActions';
import {getDeviceProperties, listDevices, listFolderContents, setCurrentDevice, setFilterType} from '../actions/deviceListActions';
import {setViewType, setSortType} from '../actions/settingsActions';
import DeviceTabs from '../components/DeviceTabs/DeviceTabs';
import GridList from '../components/GridList/GridList';
import Settings from '../components/Settings/Settings';
import settingsReducer from '../reducers/settingsReducer';
import css from './MainPanel.module.less';

require.context('../../Assets/Thumbnails/', false, /\.png$/);

const initialState = {
	settings: {
		isOpen: false
	}
};

const MainPanel = ({currentDevice, currentList, deviceProperties, devices, filterType, freeSpace, getDevicesList, getListContents,  onCloseApp, saveCurrentDevice, setFilter, setSort, setView, totalSpace}) =>
{
	const dropList=['All', 'Photo & Video', 'Photo', 'Video', 'Music'];
	const [state, dispatch] = useReducer(settingsReducer,initialState);

	getListContents(currentDevice);
	deviceProperties(currentDevice);

	useEffect(() => {
		getDevicesList();
	}, [getDevicesList])

	return (
		<Panel>
			<Header
				slots='title'
				title='Media discovery'
				type='compact'
				subtitle={currentDevice.deviceName+" : "+freeSpace+" Free / "+totalSpace}
				marqueeOn='render'
				noCloseButton
				slotAfter={
					<div>
						<IconButton size={'small'}>search</IconButton>
						<IconButton size={'small'} onClick={() => dispatch({type: 'toggle', payload: 'settings'})}>verticalellipsis</IconButton>
						<IconButton size={'small'} onClick={() => onCloseApp(appId)}>closex</IconButton>
					</div>
				}
			/>
			{
				state.settings.isOpen &&
				<Settings setViewType={setView} setSortType={setSort} />
			}

			<Dropdown
				className={css.drop}
				defaultSelected={filterType !== 'All' ? filterType === 'Photo & Video' ? 1 : filterType === 'Photo' ? 2 : filterType === 'Video' ? 3 : 4 : 0}
				onSelect={(ev) => setFilter(ev.data)}
				orientation='vertical'
			>
				{dropList}
			</Dropdown>

			<DeviceTabs
				devices={devices} setDevice={saveCurrentDevice} space={deviceProperties}
			/>

			<GridList currentList={currentList} filterType={filterType}/>

		</Panel>
	)
}

const mapStateToProps = state => (
	{
		devices: state.devices.devices,
		currentDevice: state.devices.currentDevice,
		currentList: state.contentList.contentList,
		filterType: state.contentList.filterType,
		freeSpace: state.devices.freeSpace,
		totalSpace: state.devices.totalSpace
	}
)

const Main = connect(
	mapStateToProps,
	{
		getDevicesList: listDevices,
		onCloseApp: closeApp,
		getListContents: listFolderContents,
		saveCurrentDevice: setCurrentDevice,
		setFilter: setFilterType,
		setView: setViewType,
		setSort: setSortType,
		deviceProperties: getDeviceProperties
	}
)(MainPanel);

export default ThemeDecorator(Main);
export {MainPanel, Main};
