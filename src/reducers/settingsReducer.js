import {types} from '../actions/actionTypes';

const initialstate = {
	viewType: 'Thumbnail View',
	sortType: 'Alphabetical',
	selectMode: ''
}

export const settingsReducer = (state = initialstate, action) => {
	switch (action.type) {
		case 'toggle': {
			return {
				...state,
				settings: {
					isOpen: false
				},
				selectPlayPopup: { 
					isOpen: false
				},
				[action.payload]: {
					isOpen: !state[action.payload].isOpen
				}
			};
		};
		case 'navigate':
			return {
				...state,
				level: action.payload
			};
		case 'selected':
			return {
				...state,
				level: '',
				items: {
					...state.items,
					[state.level]: {
						...state.items[state.level],
						children: {
							...state.items[state.level].children,
							index: action.payload
						}
					}
				}
			};
		case types.SET_VIEW_TYPE:{
			if (state.viewType === action.viewType) {
				return state;
			}
			else {
				return Object.assign({}, state, {viewType: action.viewType});
			}
		}
		case types.SET_SORT_TYPE:{
			if (state.sortType === action.sortType) {
				return state;
			}
			else {
				return Object.assign({}, state, {sortType: action.sortType});
			}
		}
		case types.SET_SELECT_MODE: {
			if (state.selectMode === action.selectMode) {
				return state;
			}
			else {
				return Object.assign({}, state, {selectMode: action.selectMode});
			}
		}
		default:
			return state;
	}
};
