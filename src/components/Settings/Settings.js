import React, {useReducer} from 'react';
import {connect} from 'react-redux';
import {settingsReducer} from '../../reducers/settingsReducer';
import {setFilterType} from '../../actions/deviceListActions';
import Menu from './Menu';
import { setSortType, setViewType, setSelectMode } from '../../actions/settingsActions';
import {navigate} from '../../actions/deviceListActions';

const initialState = {
	heading: 'Options',
	type: 'subMenu',
	level: '',
	disable: false,
	items: {
		viewType: {
			name: 'View Type',
			type: 'subMenu',
			disabled: false,
			children: {
				heading: 'View Type',
				type: 'radio',
				index: 0,
				items: [
					{
						type: 'radio',
						name: 'Thumbnail View',
						value: 'Thumbnail View'
					},
					{
						type: 'radio',
						name: 'List View',
						value: 'List View'
					}
				]
			}
		},
		sort: {
			name: 'Sort',
			type: 'subMenu',
			disabled: false,
			children: {
				heading: 'Sort',
				type: 'radio',
				index: 0,
				items: [
					{
						type: 'radio',
						name: 'Alphabetical',
						value: 'Alphabetical'
					},
					{
						type: 'radio',
						name: 'Newly Added',
						value: 'Newly added'
					}
				]
			}
		},
		selectPlay: {
			name: 'Select Play',
			type: 'button',
			value: 'Select Play'
		},
		delete: {
			name: 'Delete',
			type: 'button',
			value: 'Delete'
		},
		copy: {
			name: 'Copy',
			type: 'button',
			value: 'Copy'
		},
		userSettings: {
			name: 'User Guide',
			type: 'button',
			value: 'User Guide'
		}
	}
};

const SettingsOption = ({filterType, onNavigate, optionPopup, popup, setFilter, setMode, setSort, setView, sortType, viewType}) => {

	const [state, dispatch] = useReducer(settingsReducer, initialState);
	const handleNavigate = (value) => {
		dispatch({type: 'navigate', payload: value});
	};

	const handleSelect = (e) => {
		dispatch({type: 'selected', payload: e.selected});
		optionPopup();
		if(e.data==='List View'||e.data==='Thumbnail View'){
			setView(e.data);
		}
		else if(e.data==='Alphabetical'||e.data==='Newly Added'){
			setSort(e.data);
			setFilter(filterType,e.data);
		}
	};

	const handleClick = (e) =>{
		if(e!='User Guide'){
			setMode(e);
			e === 'Select Play' ? popup() : onNavigate('selectMode');
		}
	}

	return (!state.disable &&
		<Menu
			heading={state.level !== '' ? state.items[state.level].children.heading : state.heading}
			list={state.level !== '' ? state.items[state.level].children.items : state.items}
			handleNavigate={handleNavigate}
			handleSelect={handleSelect}
			handleClick={handleClick}
			type={state.level !== '' ? state.items[state.level].children.type : state.type}
			radioIndex={state.level !== '' && state.items[state.level].children.heading === 'Sort'? sortType === 'Alphabetical' ? 0 : 1 : viewType === 'Thumbnail View' ? 0 : 1 }
		/>
	);
};

const mapStateToProps = ({currentDeviceFileList, options}) => ({
	filterType: currentDeviceFileList.filterType,
	sortType: options.sortType,
	viewType: options.viewType,
	selectMode: options.selectMode
})

const Settings = connect(
    mapStateToProps,
    {
		setFilter: setFilterType,
		setSort: setSortType,
		setView: setViewType,
		setMode: setSelectMode,
		onNavigate: navigate
    }
)(SettingsOption);

export default Settings;
