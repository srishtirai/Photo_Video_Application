import React from 'react';
import {render} from 'react-dom';
import {Provider} from 'react-redux';
import App from './App';
import configureStore from './store/store';

const store = configureStore();

let appElement = (
	<Provider store={store}>
		<App highContrast />
	</Provider>
);

if (typeof window === 'object') {
	window.store = store;

	render(
		appElement,
		document.getElementById('root')
	);

	appElement = null;
}

export default appElement;

