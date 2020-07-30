import Button from '@enact/goldstone/Button';
import kind from '@enact/core/kind';
import {Panel, Header} from '@enact/goldstone/Panels';
import React from 'react';

const MainPanel = kind({
	name: 'MainPanel',

	render: (props) => (
		<Panel {...props}>
			<Header title="Hello world!" />
			<Button>Click me</Button>
		</Panel>
	)
});

export default MainPanel;
