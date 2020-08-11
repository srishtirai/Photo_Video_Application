import IconButton from '@enact/goldstone/IconButton';
import {Panel, Header} from '@enact/goldstone/Panels';
import ThemeDecorator from '@enact/goldstone/ThemeDecorator';

import {TabLayout, Tab} from '@enact/sandstone/TabLayout';
import {listDevices, setLastDevice} from '../actions/listActions';
import {closeApp} from '../actions/commonActions';

import React from 'react';
import {connect} from 'react-redux';

const deviceTabs = (name) => {
	 return <Tab title={name.trim()} ></Tab>
}

class MainPanel extends React.Component
{
	constructor (props) {
		super(props);
	}

	onSelectDevice = (ev) => {
		this.props.saveLastDevice(this.props.devices[ev.index].deviceName);
	}

	onCloseApp = () => {
		this.props.closeApp({id: "com.webos.app.photovideo"})
	}

	componentDidMount () {
		if (this.props.devices && this.props.devices.length === 0) {
			this.props.listDevices();
		}
	}

	render () {
	return (
		<Panel>
			<Header slots={'title'} title={"Media discovery"} type={'compact'}
				subtitle={this.props.lastDevice} marqueeOn={'render'}
				slotAfter={
					<div>
						<IconButton size={'tiny'}>search</IconButton>
						<IconButton size={'tiny'}>verticalellipsis</IconButton>
						<IconButton size={'tiny'} onClick={this.onCloseApp}>closex</IconButton>
					</div>
				}
				/>
	
				<TabLayout anchorTo={'start'} onSelect={this.onSelectDevice} dimensions={{tabs: {collapsed: null, normal: 1000}, content: {expanded: 50, normal: 50}}}>
					{this.props.devices.map((item) =>
						deviceTabs(item.deviceName)
					)}
				</TabLayout>
	
			</Panel>	

	)}
}

const mapStateToProps = ({deviceList}) => ({
	devices: deviceList.devices,
	lastDevice: deviceList.lastDevice
});

const mapDispatchToProps = (dispatch) => ({
	listDevices: () => dispatch(listDevices()),
	saveLastDevice: (name) => dispatch(setLastDevice(name)),
	closeApp: (params) => dispatch(closeApp(params))
});

const Main = connect(mapStateToProps, mapDispatchToProps)(MainPanel);
export default ThemeDecorator(Main);
export {MainPanel,Main};