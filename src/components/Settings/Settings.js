import React, {useReducer} from 'react';
import settingsReducer from '../../reducers/settingsReducer';
import Menu from '@enact/goldstone/VideoPlayer/Menu';

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
		audioTrack: {
			name: 'Audio Track',
			type: 'subMenu',
			disabled: false,
			children: {
				heading: 'Audio Track',
				type: 'radio',
				index: 0,
				items: [
					{
						type: 'radio',
						name: '1 English VP8',
						value: 'english'
					},
					{
						type: 'radio',
						name: '2 Spanish MPEG-4',
						value: 'Spanish'
					},
					{
						type: 'radio',
						name: '3 French MPEG-4',
						value: 'French'
					}
				]
			}
		},
		dualMonoSetting: {
			name: 'Dual Mono Setting',
			type: 'subMenu',
			disabled: false,
			children: {
				heading: 'Dual Mono Setting',
				type: 'radio',
				index: 0,
				items: [
					{
						type: 'radio',
						name: 'Main',
						value: 'main'
					},
					{
						type: 'radio',
						name: 'Sub',
						value: 'sub'
					},
					{
						type: 'radio',
						name: 'Main + Sub',
						value: 'main'
					}
				]
			}
		}
	}
};

const Settings = () => {

	const [state, dispatch] = useReducer(settingsReducer, initialState);
	const handleNavigate = (value) => {
		dispatch({type: 'navigate', payload: value});
	};

	const handleSelect = (e) => {
		dispatch({type: 'selected', payload: e.selected});
	};

	return (!state.disable &&
		<Menu
			heading={state.level !== '' ? state.items[state.level].children.heading : state.heading}
			subHeading={state.level !== '' ? state.items[state.level].children.subHeading : ''}
			list={state.level !== '' ? state.items[state.level].children.items : state.items}
			handleNavigate={handleNavigate}
			handleSelect={handleSelect}
			type={state.level !== '' ? state.items[state.level].children.type : state.type}
			radioIndex={state.level !== '' && state.items[state.level].children.index}
		/>
	);
};

export default Settings;
