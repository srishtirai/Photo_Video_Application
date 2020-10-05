import React, { useEffect, useState, useReducer } from 'react';
import {connect} from 'react-redux';
import IconButton from '@enact/goldstone/IconButton';
import {Panel, Header} from '@enact/goldstone/Panels';
import ThemeDecorator from '@enact/goldstone/ThemeDecorator';
import {TabLayout, Tab} from '@enact/goldstone/TabLayout';

import {appId} from '../data/appConfig';
import {getDeviceProperties, listDevices, listFolderContents, setCurrentDevice, setFilterType} from '../actions/deviceListActions';
import {closeApp} from '../actions/commonActions';
import {setViewType, setSortType} from '../actions/settingsActions';
import css from './MainPanel.module.less';
import Settings from '../components/Settings/Settings';
import Filter from '../components/Filter/Filter';
import GridList from '../components/GridList/GridList';
import settingsReducer from '../reducers/settingsReducer';

require.context('../../Assets/Thumbnails/', false, /\.png$/);

const initialState = {
	settings: {
		isOpen: false
	}
};

const MainPanel = ({currentDevice, currentList, deviceProperties, devices, filterType, freeSpace, getDevicesList, getListContents,  onCloseApp, saveCurrentDevice, setFilter, setSort, setView, totalSpace}) =>
{
	const [collapse, setCollapse] = useState(false);
	const [state, dispatch] = useReducer(settingsReducer,initialState);

	getListContents(currentDevice);
	deviceProperties(currentDevice);

	const onSelectDevice = (ev) => {
		if(!collapse)
		{
			saveCurrentDevice(devices[ev.index]);
			deviceProperties(devices[ev.index]);
			setCollapse(true);
		}
		else{
			setCollapse(false);
		}
	}

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

			<Filter filterType={filterType} setFilter={setFilter} />

			<TabLayout
				className={css.tabLayout}
				onSelect={onSelectDevice}
				dimensions={{tabs: {collapsed: 20, normal: 1000}, content: {expanded: null, normal: null}}}
				collapsed={collapse}
				onTabAnimationEnd
			>
				{devices.map((item, index) =>
					<Tab className={css.tab} key={index} title={item.deviceName} icon='usb'/>
				)}
			</TabLayout>

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
