import React from 'react';
import {withRouter} from 'react-router';

class App extends React.Component {
    constructor(props) {
	super(props);
	this.handleLoginResponse = this.handleLoginResponse.bind(this);
	this.state = {token: ''};
    }
    handleLoginResponse(data) {
	this.setState({token:data.token});
	this.props.router.push('/home');
    }
    render() {
	return (
	    <div>
		{this.props.children && React.cloneElement(this.props.children, {handleResponse:this.handleLoginResponse, token: this.state.token})}
	    </div>
	)
    }
}

export default withRouter(App);
