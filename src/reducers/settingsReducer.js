const initialState = {
	current: 0,
	settings: {
		isOpen: false
	}
};

const settingsReducer = (state = initialState, action) => {
	switch (action.type) {
		case 'toggle': {
			return {
				...state,
				settings: {
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
		default:
			return state;
	}
};

export default settingsReducer;
