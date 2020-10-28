import {types} from '../actions/actionTypes';

// Selected device image list.

const initialState = {
	images: []
}

export const imageListReducer = (state = initialState, action) => {

	switch (action.type) {
		case types.GET_IMAGES_LIST: {
			return Object.assign({}, state, {images: action.images});
        }
        default:
			return state
    }
}
