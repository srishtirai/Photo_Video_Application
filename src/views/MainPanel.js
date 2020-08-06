import IconButton from '@enact/goldstone/IconButton';
import {Panel,Header} from '@enact/goldstone/Panels';
import ThemeDecorator from '@enact/goldstone/ThemeDecorator';
import React from 'react';
import ReactDOM from 'react-dom';
import {TabLayout,Tab} from '@enact/sandstone/TabLayout'
import Item from '@enact/sandstone/Item'
import {connect} from 'react-redux'
import {listDevices} from '../actions/listActions';
// import DeviceTabs from '../components/DeviceTabs'

const onAppClose=()=>{

}

const onLaunchSearchApp=() => {
	
}



class MainPanel extends React.Component 
{
	constructor (props) {
		super(props);
	}
	DeviceTabs=(devices)=>{
		{devices.map((item, i) => {
			console.log(item.deviceName)
		  })}
	}
	
	render(){
		this.props.listDevices();
		const deviceList= this.props.devices
		console.table(deviceList)
	return(
		<Panel>
			<Header slots={'title'} title={"Media discovery"} type={'compact'}
				subtitle={'Tab Name'} 
				slotAfter={
					<div>
						<IconButton onClick={onLaunchSearchApp} size={'tiny'}>search</IconButton>
						<IconButton size={'tiny'}>verticalellipsis</IconButton>
						<IconButton onClick={onAppClose} size={'tiny'}>closex</IconButton>
					</div>
				} 
			/>
			<TabLayout dimensions={{tabs: {collapsed: null, normal: 500}, content: {expanded: null, normal: null}}}>
			
			{deviceList.map((item)=>{
                <button>{item.deviceName}</button>
             })}
			</TabLayout>
			
		</Panel>

	)}
}

const mapStateToProps = ({deviceList}) => ({
	devices: deviceList.devices
});

const mapDispatchToProps = (dispatch) => ({
	listDevices: () => dispatch(listDevices())
});

const Main = connect(mapStateToProps, mapDispatchToProps)(MainPanel);
export default ThemeDecorator(Main);
export {MainPanel,Main};