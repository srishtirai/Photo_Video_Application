import React from 'react';
import {connect} from 'react-redux';
import ThemeDecorator from '@enact/goldstone/ThemeDecorator';
import {Panels, Routable, Route} from '@enact/goldstone/Panels';
import PhotoPlayer from '@enact/goldstone/PhotoPlayer';
import MainPanel from '../views/MainPanel';
import SelectMode from '../components/SelectMode/SelectMode'
import {navigate} from '../actions/deviceListActions';

const RoutablePanels = Routable({navigate: 'onBack'}, Panels);

const MainApp = ({onNavigate, path, panels, photoResults, ...rest}) => {
	return (
		<RoutablePanels {...rest} path={path}>
			<Route path="home" component={MainPanel} title="Home Page" />
			<Route path="photoPlayer" component={PhotoPlayer} slides={photoResults} title="Photo player" />
			<Route path="selectMode" component={SelectMode} title="Select Mode" />
		</RoutablePanels>
	)
};

const mapStateToProps = ({currentDeviceFileList, panels, path}) => (
	{
		photoResults: currentDeviceFileList.photoUrls,
		path,
		panels
	}
);

const App = connect(
	mapStateToProps,
	{
		onNavigate: navigate
	}
)(MainApp);

export default ThemeDecorator(App);
