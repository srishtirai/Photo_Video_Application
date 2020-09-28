import React, { useEffect, useState, useReducer } from 'react';
import {connect} from 'react-redux';
import IconButton from '@enact/goldstone/IconButton';
import {Panel, Header} from '@enact/goldstone/Panels';
import ThemeDecorator from '@enact/goldstone/ThemeDecorator';
import Dropdown from '@enact/sandstone/Dropdown';
import SvgGridList from '@enact/goldstone/SVGGridList/components/GridList/GridList';
import ItemImageBase from '@enact/goldstone/SVGGridList/components/ItemImage/ItemImage';
import ri from '@enact/ui/resolution';
import {TabLayout, Tab} from '@enact/goldstone/TabLayout';

import {appId} from '../data/appConfig';
import {listDevices, setCurrentDevice, setFilterType, listFolderContents} from '../actions/deviceListActions';
import {closeApp} from '../actions/commonActions';
import {setViewType, setSortType} from '../actions/settingsActions';
import css from './MainPanel.module.less';
import folder from '../../Assets/mock/folder.png';
import Settings from '../components/Settings/Settings';
import settingsReducer from '../reducers/settingsReducer';

require.context('../../Assets/mock/', false, /\.png$/);

const initialState = {
	settings: {
		isOpen: false
	}
};

const MainPanel = ({currentDevice, currentList, devices, filterType, getDevicesList, getListContents, onCloseApp, saveCurrentDevice, setFilter, setSort, setView}) =>
{
	const items = [];
	const [collapse, setCollapse] = useState(false);
	const dropList=['Photos', 'Videos', 'Music', 'All'];
	const [state, dispatch] = useReducer(settingsReducer,initialState);

	const onSelectDevice = (ev) => {
		if(!collapse)
		{
			saveCurrentDevice(devices[ev.index]);
			setCollapse(true);
		}
		else{
			setCollapse(false);
		}
	}

	const onFilter = (ev) =>{
		setFilter(ev.data);
	}

	const updateDataSize = (dataLength) => {
		let count = 0;
		for (let i = 0; i < dataLength ; i++) {
			let source = "";
			if(filterType === "Photos" || filterType === "All"){
				if(currentList[i].itemType === "image"){
					source = currentList[i].itemPath;
					items.push({ source });
					count++;
				}
			}
			if(filterType === "Videos" || filterType === "All"){
				if(currentList[i].itemType === "video"){
					source = currentList[i].thumbnailUri;
					items.push({ source });
					count++;
				}
			}
			if(filterType === "Music" || filterType === "All"){
				if(currentList[i].itemType === "audio"){
					source = currentList[i].thumbnailUri;
					items.push({ source });
					count++;
				}
			}
			if(currentList[i].itemType === "folder"){
				if(currentList[i].thumbnailUri !== ""){
					source = currentList[i].thumbnailUri;
				}else{
					source = folder;
				}
				items.push({ source });
				count++;
			}
		}
		return count;
	};

	const renderItem = ({ index, ...rest }) => {
		const { source } = items[index];

		return (
			<ItemImageBase {...rest}  src={source}/>
		);
	};

	useEffect(() => {
		getDevicesList();
		getListContents(currentDevice);
	}, [getDevicesList, getListContents])

	return (
		<Panel>
			<Header
				slots='title'
				title='Media discovery'
				type='compact'
				subtitle={currentDevice.deviceName}
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
				defaultSelected={filterType !== 'All' ? filterType === 'Photos' ? 0 : filterType === 'Video' ? 1 : 2 : 3}
				onSelect={onFilter}
				orientation='vertical'
			>
				{dropList}
			</Dropdown>

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

			<SvgGridList
				className={css.grid}
				dataSize={updateDataSize(currentList.length)}
				direction='vertical'
				itemRenderer={renderItem}
				itemSize={{
					minWidth: ri.scale(280),
					minHeight: ri.scale(300)
				}}
				spacing={ri.scale(120)}
			/>
		</Panel>
	)
}

const mapStateToProps = state => (
	{
		devices: state.devices.devices,
		currentDevice: state.devices.currentDevice,
		currentList: state.contentList.contentList,
		filterType: state.contentList.filterType
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
		setSort: setSortType
	}
)(MainPanel);

export default ThemeDecorator(Main);
export {MainPanel, Main};
