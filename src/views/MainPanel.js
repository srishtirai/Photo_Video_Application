import React from 'react';
import {connect} from 'react-redux';
import IconButton from '@enact/goldstone/IconButton';
import {Panel, Header} from '@enact/goldstone/Panels';
import ThemeDecorator from '@enact/goldstone/ThemeDecorator';
import { ImageItem as UiImageItem } from '@enact/ui/ImageItem';
import { VirtualGridList } from '@enact/ui/VirtualList';
import ri from '@enact/ui/resolution';
import {TabLayout, Tab} from '@enact/sandstone/TabLayout';
import Dropdown from '@enact/sandstone/Dropdown';

import {listDevices, setLastDevice, setFilterType} from '../actions/listActions';
import {closeApp} from '../actions/commonActions';
import USB_img from '../../Assets/mock/USB.png';
import css from './MainPanel.module.less';

const items = [];
const defaultDataSize = 1000;
const longContent = 'Lorem ipsum dolor sit amet';

class MainPanel extends React.Component
{
	constructor (props) {
		super(props);
		this.state={
			collapse:false
		}
	}

	onCloseApp = () => {
		this.props.closeApp({id: "com.webos.app.photovideo"});
	}

	deviceTabs = (name) => {
		return <Tab title={name.trim()} icon={USB_img} />
	}

	onSelectDevice = (ev) => {
		this.props.saveLastDevice(this.props.devices[ev.index].deviceName);
		this.setState({collapse:true});
	}

	onFilter = (ev) =>{
		this.props.setFilterType([ev.index]);
	}

	uiRenderItem = ({ index, ...rest }) => {
		const { source } = items[index];

		return (
			<UiImageItem
				{...rest}
				src={source}
				style={{ width: '100%' }}
			/>
		);
	};

	shouldAddLongContent = ({ index, modIndex }) => (
		index % modIndex === 0 ? ` ${longContent}` : ''
	);

	updateDataSize = (dataSize) => {
		const	itemNumberDigits = dataSize > 0 ? ((dataSize - 1) + '').length : 0,
			    headingZeros = Array(itemNumberDigits).join('0');
					items.length = 0;

		for (let i = 0; i < dataSize; i++) {
			const
				count = (headingZeros + i).slice(-itemNumberDigits),
				text = `Item ${count}${this.shouldAddLongContent({ index: i, modIndex: 2 })}`,
				color = Math.floor((Math.random() * (0x1000000 - 0x101010)) + 0x101010).toString(16),
				source = `http://placehold.it/300x300/${color}/ffffff&text=Image ${i}`;

			items.push({ text, source });
		}
		return dataSize;
	};

	componentDidMount () {
		if (this.props.devices && this.props.devices.length === 0) {
			this.props.listDevices();
		}
	}

	render(){
	this.updateDataSize(defaultDataSize);
	return (
		<Panel>
			<Header
				slots={'title'}
				title={"Media discovery"}
				type={'compact'}
				subtitle={this.props.lastDevice}
				marqueeOn={'render'}
				slotAfter={
					<div>
						<IconButton size={'small'}>search</IconButton>
						<IconButton size={'small'}>verticalellipsis</IconButton>
						<IconButton size={'small'} onClick={this.onCloseApp}>closex</IconButton>
					</div>
				}
			/>

			<Dropdown
				className={css.drop}
				defaultSelected={this.props.filterType}
				onSelect={this.onFilter}
			>
				{['Photos', 'Videos', 'Music', 'All']}
			</Dropdown>

			<TabLayout
				className={css.tab}
				anchorTo={'start'}
				onSelect={this.onSelectDevice}
				dimensions={{tabs: {collapsed: 20, normal: 700}, content: {expanded: 50, normal: 50}}}
				collapsed={this.state.collapse}
			>
				{this.props.devices.map((item) =>
					this.deviceTabs(item.deviceName)
				)}
			</TabLayout>

			<VirtualGridList
				className={css.grid}
				dataSize={this.updateDataSize(defaultDataSize)}
				direction='vertical'
				itemRenderer={this.uiRenderItem}
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
}

const mapStateToProps = ({deviceList,currentContentsInfo}) => ({
	devices: deviceList.devices,
	lastDevice: deviceList.lastDevice,
	filterType: currentContentsInfo.filterType
});

const mapDispatchToProps = (dispatch) => ({
	listDevices: () => dispatch(listDevices()),
	saveLastDevice: (name) => dispatch(setLastDevice(name)),
	setFilterType:(filterType)=> dispatch(setFilterType(filterType)),
	closeApp: (params) => dispatch(closeApp(params))
});

const Main = connect(mapStateToProps, mapDispatchToProps)(MainPanel);
export default ThemeDecorator(Main);
export {MainPanel, Main};
