import React, { useEffect, useState } from 'react';
import {connect} from 'react-redux';
import IconButton from '@enact/goldstone/IconButton';
import {Panel, Header} from '@enact/goldstone/Panels';
import ThemeDecorator from '@enact/goldstone/ThemeDecorator';
import { ImageItem as UiImageItem } from '@enact/ui/ImageItem';
import { VirtualGridList } from '@enact/ui/VirtualList';
import ri from '@enact/ui/resolution';
import {TabLayout, Tab} from '@enact/sandstone/TabLayout';
import Dropdown from '@enact/sandstone/Dropdown';

import {listDevices, setCurrentDevice, setFilterType, listFolderContents, getUpdatedList} from '../actions/listActions';
import {closeApp} from '../actions/commonActions';
import USB_img from '../../Assets/mock/USB.png';
import css from './MainPanel.module.less';

const items = [];
const defaultDataSize = 1000;
const longContent = 'Lorem ipsum dolor sit amet';

require.context('../../Assets/mock/', false, /\.jpg$/);
require.context('../../Assets/mock/', false, /\.png$/);

const MainPanel = (props) =>
{
	const [collapse,setCollapse] = useState(false);
	const { closeApp, saveCurrentDevice, getUpdatedList,setFilterType, listDevices, getListContents, filterType, devices, currentDevice, currentList }= props;
	const dropList=['Photos', 'Videos', 'All'];

	const onCloseApp = () => {
		closeApp({id: "com.webos.app.photovideo"});
	}

	const deviceTabs = (name, index) => {
		return <Tab key={index} title={name.trim()} icon={USB_img} />
	}

	const onSelectDevice = (ev) => {
		if(!collapse)
		saveCurrentDevice(devices[ev.index].deviceName);
		(!collapse?setCollapse(true):setCollapse(false));
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

	const shouldAddLongContent = ({ index, modIndex }) => (
		index % modIndex === 0 ? ` ${longContent}` : ''
	);

	const updateDataSize = (dataSize) => {
		const	itemNumberDigits = dataSize > 0 ? ((dataSize - 1) + '').length : 0,
			    headingZeros = Array(itemNumberDigits).join('0');
					items.length = 0;

		for (let i = 0; i < dataSize; i++) {
			const
				count = (headingZeros + i).slice(-itemNumberDigits),
				text = `Item ${count}${shouldAddLongContent({ index: i, modIndex: 2 })}`,
				color = Math.floor((Math.random() * (0x1000000 - 0x101010)) + 0x101010).toString(16),
				source = currentList[i].itemPath;

			items.push({ text, source });
		}
		return dataSize;
	};

	useEffect(()=>{
		if (devices && devices.length === 0) {
			listDevices();
		}
	})
	getListContents(currentDevice);
	updateDataSize(currentList.length);
	
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
				defaultSelected={2}
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
