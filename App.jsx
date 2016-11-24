import React from 'react';
import {withRouter} from 'react-router';
import AppBar from 'material-ui/AppBar';
import MenuItem from 'material-ui/Menu';

//const URL = "http://10.171.204.143:8080"
const URL = "http://localhost:8080"

class App extends React.Component {
    constructor(props) {
	super(props);
	this.handleLoginResponse = this.handleLoginResponse.bind(this);
	this.state = {token: '', logged:false};
    }
    handleLoginResponse(data) {
	this.setState({token:data.token, logged:true});
	this.props.router.push('/home');
    }
    render() {
	return (
	    <div>
		<AppBar title="DRONES App"
		/>
		{this.props.children && React.cloneElement(this.props.children, {handleResponse:this.handleLoginResponse, token: this.state.token, url:URL})}
	    </div>
	)
    }
}

export default withRouter(App);
