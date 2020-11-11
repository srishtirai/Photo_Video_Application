import {types} from './actionTypes';

export const setViewType = (viewType) => {
	return {
		type: types.SET_VIEW_TYPE,
		viewType:viewType
	};
};

export const setSortType = (sortType) => {
	return {
		type: types.SET_SORT_TYPE,
		sortType:sortType
	};
};

export const setSelectMode = (selectMode) =>{
	return {
		type: types.SET_SELECT_MODE,
		selectMode:selectMode
	};
}