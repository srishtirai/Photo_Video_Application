import React from 'react';
import ThemeDecorator from '@enact/goldstone/ThemeDecorator';
import Panels from '@enact/goldstone/Panels';
import MainPanel from '../views/MainPanel';

const App = (props) => {
	return (
		<Panels {...props}>
			<MainPanel />
		</Panels>
	)
};

export default ThemeDecorator(App);
