import React from 'react';
import $ from 'jquery';
import {Toolbar, ToolbarGroup, ToolbarTitle} from 'material-ui/Toolbar';
import Paper from 'material-ui/Paper';
import {Tabs, Tab} from 'material-ui/Tabs';
import Map from './Map.jsx';
import PlanCreator from './PlanCreator.jsx';
import PlanList from './PlanList.jsx';
import RaisedButton from 'material-ui/RaisedButton';
import {withRouter} from 'react-router';


const styles = {
    headline: {
	fontSize: 24,
	paddingTop: 16,
	marginBottom: 12,
	fontWeight: 400,
    },
};

class Home extends React.Component {
    constructor(props) {
	super(props);
	this.state = {
	    token:'',
	    data:[]
	}
    }
    loadPlans() {
	$.ajax({
	    url: this.props.url+'/flightplans',
	    beforeSend: (xhr) => {
		xhr.setRequestHeader("Authorization","Bearer " + this.props.token);
	    },
	    method:'GET',
	    cache: false,
	    success: (data) => {this.setState({data: data})},
	    error: (xhr, status, error) => {
		console.error("",status,error.toString());
	    }
	});
    }
    componentDidMount() {
	var token=this.props.token;
	this.setState({token:token});
	this.loadPlans();
    }
    componentWillReceiveProps(nextProps) {
	this.setState({token: nextProps.token})
    }
    render() {
	return (
	    <div>
	    {this.props.children && React.cloneElement(this.props.children, {token:this.state.token, url:this.props.url, data:this.state.data})}

	    </div>
	);
    }
}


export default Home;
/*
<Tabs>
<Tab label="Your Plans">
<div>
<PlanList data={this.state.data} url={this.props.url} />
</div>
</Tab>
<Tab label="Create Plan">
<div>
<PlanCreator token={this.state.token} url={this.props.url} />
</div>
</Tab>
</Tabs>
*/
