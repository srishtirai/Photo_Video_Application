import React from 'react';
import {connect} from 'react-redux';
import CheckboxItem from '../../../node_modules/@enact/sandstone/CheckboxItem'
import Button from '@enact/goldstone/Button';
import {Panel, Header} from '@enact/goldstone/Panels';
import DeviceTabLayout from '../DeviceTabLayout/DeviceTabLayout';
import {navigate} from '../../actions/deviceListActions';
import css from './SelectContentType.module.less';
import { setSelectMode } from '../../actions/settingsActions';

const SelectModes = ({filterType,onNavigate, setMode, selectMode, ...rest}) => {

	const onModeSelect = () =>{
		if(selectMode === 'Select Play'){
			if(filterType === 'Photo'){
				onNavigate('photoPlayer');
			} 
			else if(filterType === 'Video'){
				onNavigate('videoPlayer');
			}
		}
	}
	const returnHome = () => {
		setMode('');
		onNavigate("home");
	}
	const onSelectAll = () =>{

	}

	return (
		<Panel {...rest}>
			<Header
				slots='title'
				title={selectMode}
				type='compact'
				subtitle='{N} Files Selected'
				marqueeOn='render'
				noCloseButton
				slotAfter={
					<div>
						<Button size={'small'} onClick={returnHome}>Cancel</Button>
						<Button size={'small'} onClick={onModeSelect}>{selectMode === 'Select Play' ? 'Play' : selectMode}</Button>
					</div>
				}
			/>
			<CheckboxItem
				className={css.checkBox}
				onToggle={onSelectAll}
			>
				Select All
			</CheckboxItem>

			<DeviceTabLayout collapsed='true' selectMode={'SelectPlay'}/>
		</Panel>
	)
}

const mapStateToProps = ({currentDeviceFileList,devices,options}) => (
	{
		currentDevice: devices.currentDevice,
		filterType: currentDeviceFileList.filterType,
		selectMode: options.selectMode
	}
)

const SelectMode = connect(
	mapStateToProps,
	{
		onNavigate: navigate,
		setMode: setSelectMode
	}
)(SelectModes);

export default SelectMode;
export {SelectMode, SelectModes};
