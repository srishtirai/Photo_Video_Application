import IconButton from '@enact/goldstone/IconButton';
import {Panel,Header} from '@enact/goldstone/Panels';
import ThemeDecorator from '@enact/goldstone/ThemeDecorator';
import React from 'react';
import {TabLayout,Tab} from '@enact/sandstone/TabLayout'
import {connect} from 'react-redux'
import {listDevices} from '../actions/listActions';
import css from './MainPanel.module.less';
import {setLastDevice} from '../actions/listActions';

const onAppClose=()=>{

}

const onLaunchSearchApp=() => {
	
}

const deviceTabs=(name)=>{
	 return <Tab title={name.trim()} className={css.tab}></Tab>
 }

class MainPanel extends React.Component 
{
	
	constructor (props) {
		super(props);
	}
	
	onSelectDevice=(ev)=>{
		this.props.saveLastDevice(this.props.devices[ev.index].deviceName);
	}

	componentDidMount () {
		if (this.props.devices && this.props.devices.length === 0) {
			this.props.listDevices();
		}
	}

	render(){
	return(
		<Panel>
			{/* <Header slots={'title'} title={"Media discovery"} type={'compact'}
				subtitle={this.props.lastDevice} 
				slotAfter={
					<div>
						<IconButton onClick={onLaunchSearchApp} size={'tiny'}>search</IconButton>
						<IconButton size={'tiny'}>verticalellipsis</IconButton>
						<IconButton onClick={onAppClose} size={'tiny'}>closex</IconButton>
					</div>
				} 
			/> */}
			 
			<TabLayout anchorTo={'start'} onSelect={this.onSelectDevice} dimensions={{tabs: {collapsed: null, normal: 1000}, content: {expanded: 50, normal: 50}}} css={css}>
				{this.props.devices.map((item)=>
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
	saveLastDevice: (name) => dispatch(setLastDevice(name))
});

const Main = connect(mapStateToProps, mapDispatchToProps)(MainPanel);
export default ThemeDecorator(Main);
export {MainPanel,Main};