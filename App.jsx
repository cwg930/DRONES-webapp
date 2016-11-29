import React from 'react';
import {withRouter} from 'react-router';
import AppBar from 'material-ui/AppBar';
import MenuItem from 'material-ui/Menu';
import FlatButton from 'material-ui/FlatButton';

const URL = "http://10.171.204.143:8080"
//const URL = "http://localhost:8080"

class App extends React.Component {
    constructor(props) {
	super(props);
	this.handleLoginResponse = this.handleLoginResponse.bind(this);
	this.handleHomeClick = this.handleHomeClick.bind(this);
	this.state = {token: '', logged:false};
    }
    handleLoginResponse(data) {
	this.setState({token:data.token, logged:true});
	this.props.router.push('/home');
    }
    handleHomeClick() {
	if (this.state.logged == true){
	    this.props.router.push('/home');
	}
    }
    render() {
	return (
	    <div>
		<AppBar title="DRONES App" 
iconElementRight={this.state.logged ? <FlatButton label="Home" onClick={this.handleHomeClick} /> : null}
		/>
		{this.props.children && React.cloneElement(this.props.children, {handleResponse:this.handleLoginResponse, token: this.state.token, url:URL})}
	    </div>
	)
    }
}

export default withRouter(App);
