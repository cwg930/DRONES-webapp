import React from 'react';
import injectTapEventPlugin from 'react-tap-event-plugin';
import {Router, Route, Link, IndexRoute, withRouter, browserHistory} from 'react-router';
import MuiThemeProvider from 'material-ui/styles/MuiThemeProvider';
import App from './App.jsx';
import Login from './Login.jsx';
import Home from './Home.jsx';
import Map from './Map.jsx';

class Container extends React.Component {
    constructor(props) {
	super(props);
	injectTapEventPlugin();
	this.routes = (
	    <Route path='/' component={App}>
		<IndexRoute component={Login} />
		<Route path='/home' component={Home}  />
	    </Route>
	);
    }
    render() {
	return (
	    <MuiThemeProvider>
	    <Router history={browserHistory}>
		{this.routes}
	    </Router>
	    </MuiThemeProvider>
	)
    }
}

export default Container;
