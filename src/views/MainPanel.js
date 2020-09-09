import React, { useEffect, useState } from 'react';
import {connect} from 'react-redux';
import IconButton from '@enact/goldstone/IconButton';
import {Panel, Header} from '@enact/goldstone/Panels';
import ThemeDecorator from '@enact/goldstone/ThemeDecorator';
import { VirtualGridList } from '@enact/ui/VirtualList';
import ri from '@enact/ui/resolution';
import { ImageItem as UiImageItem } from '@enact/ui/ImageItem';
import {TabLayout, Tab} from '@enact/sandstone/TabLayout';
import Dropdown from '@enact/sandstone/Dropdown';

import {listDevices, setCurrentDevice, setFilterType, listFolderContents, getUpdatedContents} from '../actions/listActions';
import {closeApp} from '../actions/commonActions';
import USB_img from '../../Assets/mock/USB.png';
import css from './MainPanel.module.less';

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
		return <Tab key={index} title={name.trim()} icon={USB_img} />
	}

	const onSelectDevice = (ev) => {
		if(!collapse)
		{
			saveCurrentDevice(devices[ev.index].deviceName);
			setCollapse(true);
		}
		else{
			setCollapse(false);
		}
	}

	const onFilter = (ev) =>{
		setFilterType(ev.data);
	}

	const uiRenderItem = ({ index, ...rest }) => {
		const { source } = items[index];
			return (
				<UiImageItem
					{...rest}
					src={source}
					style={{ width: '100%' }}
				/>
			);
	};

	const updateDataSize = (dataSize) => {
		let count = 0;
		for (let i = 0; i < dataSize; i++) {
			let source = "";
			if(filterType === "Photos" || filterType === "All"){
				if(currentList[i].itemType === "image"){
					source = currentList[i].itemPath;
					items.push({ source });
					count++;
				}
			}
			if(filterType == "Videos" || filterType === "All"){
				if(currentList[i].itemType === "video"){
					source = currentList[i].thumbnailUri;
					items.push({ source });
					count++;
				}
			}
			if(filterType == "Music" || filterType === "All"){
				if(currentList[i].itemType === "audio"){
					source = currentList[i].thumbnailUri;
					items.push({ source });
					count++;
				}
			}
			if(currentList[i].itemType === "folder"){
				source = currentList[i].thumbnailUri;
				items.push({ source });
				count++;
			}
			
		}
		return count;
	};

	useEffect(()=>{
		if (devices && devices.length === 0) {
			listDevices();
		}
		
		if (currentList.length === 0) {
			getListContents(currentDevice);
		}
	})

	return (
		<Panel>
			<Header
				slots={'title'}
				title={"Media discovery"}
				type={'compact'}
				subtitle={currentDevice}
				marqueeOn={'render'}
				slotAfter={
					<div>
						<IconButton size={'small'}>search</IconButton>
						<IconButton size={'small'}>verticalellipsis</IconButton>
						<IconButton size={'small'} onClick={onCloseApp}>closex</IconButton>
					</div>
				}
			/>

			<Dropdown
				className={css.drop}
				defaultSelected={filterType !== 'All' ? filterType === 'Photos' ? 0 : filterType === 'Video' ? 1 : 2 : 3}
				onSelect={onFilter}
			>
				{dropList}
			</Dropdown>

			<TabLayout
				className={css.tab}
				anchorTo={'start'}
				onSelect={onSelectDevice}
				dimensions={{tabs: {collapsed: 20, normal: 700}, content: {expanded: 50, normal: 50}}}
				collapsed={collapse}
			>
				{devices.map((item,index) =>
					deviceTabs(item.deviceName,index)
				)}
			</TabLayout>

			<VirtualGridList
				className={css.grid}
				dataSize={updateDataSize(currentList.length)}
				direction='vertical'
				itemRenderer={uiRenderItem}
				itemSize={{
					minWidth: ri.scale(180),
					minHeight: ri.scale(270)
				}}
				scrollMode='native'
				spacing={ri.scale(20)}
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
		saveCurrentDevice: (name) => dispatch(setCurrentDevice(name)),
		setFilterType: (filterType)=> dispatch(setFilterType(filterType)),
		getListContents: (data) => dispatch(listFolderContents(data)),
		closeApp: (params) => dispatch(closeApp(params))
});

const Main = connect(mapStateToProps, mapDispatchToProps)(MainPanel);
export default ThemeDecorator(Main);
export {MainPanel, Main};
