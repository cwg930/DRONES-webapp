import React from 'react';
import {Router, Route, Link, IndexRoute, hashHistory, browserHistory} from 'react-router';
import Login from './Login.jsx';
import MuiThemeProvider from 'material-ui/styles/MuiThemeProvider';

class App extends React.Component {
    constructor(props) {
	super(props);
	this.handleLoginResponse = this.handleLoginResponse.bind(this)
    }
    handleLoginResponse(data) {
	console.log("logged in");
	browserHistory.push('/success');
    }
    render() {
	return (
	    <MuiThemeProvider>
	    <Router history={browserHistory}>
		<Route path='/' component={Container}>
		    <IndexRoute component={Login} handleResponse={this.handleLoginResponse}/>
		    <Route path='/success' component={Success} />
		    <Route path='*' component={NotFound} />
		</Route>
	    </Router>
	    </MuiThemeProvider>
	)
    }
}

const Success = () => <h1>Logged In</h1>
const NotFound = () => <h1>404 Not Found</h1>
const Container = (props) => (
    <div>
	{props.children}
    </div>
)
export default App
