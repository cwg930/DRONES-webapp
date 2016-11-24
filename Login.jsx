import React from 'react';
import $ from 'jquery';
import {browserHistory} from 'react-router';
//import MuiThemeProvider from 'material-ui/styles/MuiThemeProvider';
import TextField from 'material-ui/TextField';
import Paper from 'material-ui/Paper';
import Divider from 'material-ui/Divider';
import {Toolbar, ToolbarGroup, ToolbarTitle} from 'material-ui/Toolbar';
import RaisedButton from 'material-ui/RaisedButton';

const boxStyle = {
    height: 'auto',
    width: 350,
    margin: 'auto',
    marginTop: 30,
    marginBottom: 30,
    textAlign: 'center',
    display: 'block',
};

class Login extends React.Component {
    constructor(props) {
	super(props);
	
	this.handleLogin = this.handleLogin.bind(this)
    }
    
    handleLogin(user) {
	$.ajax({
	    url: this.props.url+"/login",
	    dataType: 'json',
	    type: 'POST',
	    data: user,
	    success: (data) => { this.props.handleResponse(data) },
	    error: function(xhr, status, error) {
		console.error(this.props.url, status, error.toString());
	    }.bind(this)
	});
    }
    
    render() {
	return (
	    <div>
		<LoginBox onLoginSubmit={this.handleLogin}/>
	    </div>
	);
    }
}

class LoginBox extends React.Component {
    constructor(props) {
	super(props);
	
	this.handleClick = this.handleClick.bind(this)
	this.handleKeypress = this.handleKeypress.bind(this)
	this.state = {
	    username: '',
	    password: '',
	    errorTextUser: '',
	    errorTextPass: ''
	}
	
    }

    handleClick(event) {
	event.preventDefault();
	var username = this.state.username.trim();
	var password = this.state.password.trim();
	if(!username){
	    this.setState({errorTextUser: 'Required Field'});
	    return;
	}
	if(!password){
	    this.setState({errorTextPass: 'Required Field'});
	    return;
	}
	this.props.onLoginSubmit({username: username, password: password});
	this.setState({username:'',password:'',errorTextUser:'',errorTextPass:''});
    }

    handleKeypress(event) {
	if(event.charCode == 13){
	    var username = this.state.username.trim();
	    var password = this.state.password.trim();
	    if(!username){
		this.setState({errorTextUser: 'Required Field'});

		return;
	    }
	    if(!password){
		this.setState({errorTextPass: 'Required Field'});
		return;
	    }
	    this.props.onLoginSubmit({username: username, password: password});
	    this.setState({username:'',password:'',errorTextUser:'',errorTextPass:''});
	}
    }
    render() {
	return (
	    <Paper style={boxStyle} zDepth={2}>
		<Toolbar>
		    <ToolbarGroup style={{
			float: 'none',
			marginLeft: 'auto',
			marginRight: 'auto'
		    }}>
			<ToolbarTitle text="Login" />
		    </ToolbarGroup>
		</Toolbar>
		<TextField
		    hintText="Username"
		    errorText={this.state.errorTextUser}
		    value={this.state.username}
		    onChange={(event) => {this.setState({username: event.target.value});}}
		    style={{ marginTop:5}}
		/>
		<TextField
		    hintText="Password"
		    errorText={this.state.errorTextPass}
		    value={this.state.password}
		    onChange={(event) => {this.setState({password: event.target.value});}}
		    onKeyPress={this.handleKeypress}
		    type="password"
		/>
		<br />
		<RaisedButton 
		    label="Sign In" 
		    primary={true} 
		    onClick={this.handleClick}
		    style={{
			marginBottom:10
		    }}/>
	    </Paper>
	)
    }
}


export default Login;
