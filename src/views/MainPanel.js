import React, { useEffect, useState } from 'react';
import {connect} from 'react-redux';
import Button from '@enact/goldstone/Button';
import {Panel, Header} from '@enact/goldstone/Panels';
import ThemeDecorator from '@enact/goldstone/ThemeDecorator';
import Dropdown from '@enact/sandstone/Dropdown';
import SvgGridList from '@enact/goldstone/SVGGridList/components/GridList/GridList';
import ItemImageBase from '@enact/goldstone/SVGGridList/components/ItemImage/ItemImage';
import ri from '@enact/ui/resolution';
import {TabLayout, Tab} from '@enact/sandstone/TabLayout';

import {listDevices, setCurrentDevice, setFilterType, listFolderContents} from '../actions/listActions';
import {closeApp} from '../actions/commonActions';
import css from './MainPanel.module.less';
import folder from '../../Assets/mock/folder.png';

require.context('../../Assets/mock/', false, /\.png$/);

const MainPanel = (props) =>
{
	const items = [];
	const [collapse, setCollapse] = useState(false);
	const { closeApp, saveCurrentDevice, setFilterType, listDevices, getListContents, filterType, devices, currentDevice, currentList }= props;
	const dropList=['Photos', 'Videos', 'Music', 'All'];

	const onCloseApp = () => {
		closeApp({id: "com.webos.app.photovideo"});
	}

	const deviceTabs = (name, index) => {
		return <Tab key={index} title={name.trim()} icon="usb" />
	}

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
		setFilterType(ev.data);
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

	useEffect(()=>{
		if (devices && devices.length === 0) {
			listDevices();
		}

		if (currentList.length === 0) {
			getListContents(currentDevice);
		}
		updateDataSize(currentList.length);
	});

	return (
		<Panel>
			<Header
				slots='title'
				title='Media discovery'
				type='compact'
				subtitle={currentDevice.deviceName}
				marqueeOn='render'
				noCloseButton='true'
				slotAfter={
					<div>
						<Button size='small' backgroundOpacity='transparent' icon='search' iconOnly />
						<Button backgroundOpacity='transparent' icon='verticalellipsis' iconOnly />
						<Button size='small' onClick={onCloseApp} backgroundOpacity='transparent' icon='closex' iconOnly />
					</div>
				}
			/>

			<Dropdown
				className={css.drop}
				defaultSelected={filterType !== 'All' ? filterType === 'Photos' ? 0 : filterType === 'Video' ? 1 : 2 : 3}
				onSelect={onFilter}
				orientation='vertical'
			>
				{dropList}
			</Dropdown>

			<TabLayout
				className={css.tab}
				onSelect={onSelectDevice}
				dimensions={{tabs: {collapsed: 20, normal: 1000}, content: {expanded: null, normal: null}}}
				collapsed={collapse}
			>
				{devices.map((item,index) =>
					deviceTabs(item.deviceName,index)
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

const mapStateToProps = ({deviceList,currentContentsInfo}) => ({
		devices: deviceList.devices,
		currentDevice: deviceList.currentDevice,
		filterType: currentContentsInfo.filterType,
		currentList: currentContentsInfo.contentList
});

const mapDispatchToProps = (dispatch) => ({
		listDevices: () => dispatch(listDevices()),
		saveCurrentDevice: (device) => dispatch(setCurrentDevice(device)),
		setFilterType: (filterType)=> dispatch(setFilterType(filterType)),
		getListContents: (data) => dispatch(listFolderContents(data)),
		closeApp: (params) => dispatch(closeApp(params))
});

const Main = connect(mapStateToProps, mapDispatchToProps)(MainPanel);
export default ThemeDecorator(Main);
export {MainPanel, Main};
