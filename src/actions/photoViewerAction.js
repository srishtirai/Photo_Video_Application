import {types} from './actionTypes';
import listPhotosData from '../../Assets/mock/listPhotos.json';

// Action to get list of images.
export const getImagesListAction = (res) => {
	return {
		type: types.GET_IMAGES_LIST,
		images: res
	};
};

export const listPhotos = () => (dispatch) => {
	if (typeof window === 'object' && !window.PalmSystem) {
		dispatch(getImagesListAction(listPhotosData.results));
		return ;
	}
};
