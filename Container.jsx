import React from 'react';
import injectTapEventPlugin from 'react-tap-event-plugin';
import {Router, Route, Link, IndexRoute, withRouter, browserHistory} from 'react-router';
import MuiThemeProvider from 'material-ui/styles/MuiThemeProvider';
import Paper from 'material-ui/Paper';
import App from './App.jsx';
import Login from './Login.jsx';
import Home from './Home.jsx';
import MainMenu from './MainMenu.jsx';
import MapContainer from './MapContainer.jsx';
import PlanCreator from './PlanCreator.jsx';
import PlanList from './PlanList.jsx';
import ReportContainer from './Reports.jsx';
import ReportViewer from './ReportViewer.jsx';

const containerStyle = {
    width: 1200,
    height: '100%',
    margin: 'auto',
    paddingBottom: 0,
}

class Container extends React.Component {
    constructor(props) {
	super(props);
	injectTapEventPlugin();
	this.routes = (
	    <Route path='/' component={App}>
		<IndexRoute component={Login} />
		<Route path='/home' component={Home}>
		    <IndexRoute component={MainMenu}/>
		    <Route path='plans' component={PlanList}>
			<Route path=':planId' component={MapContainer} />
		    </Route>
		    <Route path='createplan' component={PlanCreator} />
		    <Route path='reports' component={ReportContainer}>
			<Route path=':reportId' component={ReportViewer} />
		    </Route>
		</Route>
	    </Route>
	);
    }
    render() {
	return (
	    <MuiThemeProvider>
		<Paper className="mainContainer" zDepth={2}>
		    <Router history={browserHistory}>
			{this.routes}
		    </Router>
		</Paper>
	    </MuiThemeProvider>
	)
    }
}

export default Container;
