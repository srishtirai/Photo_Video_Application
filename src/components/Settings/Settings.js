import React, {useReducer} from 'react';
import settingsReducer from '../../reducers/settingsReducer';

import Menu from './Menu';

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

const Settings = ({setViewType, setSortType}) => {

	const [state, dispatch] = useReducer(settingsReducer, initialState);
	const handleNavigate = (value) => {
		dispatch({type: 'navigate', payload: value});
	};

	const handleSelect = (e) => {
		dispatch({type: 'selected', payload: e.selected});
		if(e.data==='List View'||e.data==='Thumbnail View'){
			setViewType(e.data);
		}
		else if(e.data==='Alphabetical'||e.data==='Newly Added'){
			setSortType(e.data);
		}
	};

	const handleClick = () =>{

	}

	return (!state.disable &&
		<Menu
			heading={state.level !== '' ? state.items[state.level].children.heading : state.heading}
			list={state.level !== '' ? state.items[state.level].children.items : state.items}
			handleNavigate={handleNavigate}
			handleSelect={handleSelect}
			handleClick={handleClick}
			type={state.level !== '' ? state.items[state.level].children.type : state.type}
			radioIndex={state.level !== '' && state.items[state.level].children.index}
		/>
	);
};

export default Settings;
