import React from 'react';
import $ from 'jquery';
import {Toolbar, ToolbarGroup, ToolbarTitle} from 'material-ui/Toolbar';
import {List, ListItem} from 'material-ui/List';
import Paper from 'material-ui/Paper';
import {Tabs, Tab} from 'material-ui/Tabs';
import Map from './Map.jsx';

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
    loadFileInfo() {
	$.ajax({
	    url: 'http://localhost:8080/flightplans',
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
	this.loadFileInfo();
    }
    componentWillReceiveProps(nextProps) {
	this.setState({token: nextProps.token})
    }
    render() {
	console.log("In Home render, token: " + this.state.token);
	return (
	    <Paper>
		<Tabs>
		    <Tab label="Your Files">
			<div>
			    <FileList data={this.state.data} />
			</div>
		    </Tab>
		    <Tab label="Add File">
			<div>
			    <Map token={this.state.token} planid={this.state.data.id} />
			</div>
		    </Tab>
		</Tabs>
	    </Paper>
	);
    }
}


class FileList extends React.Component {
    render() {
	var listNodes = this.props.data.map((fileInfo) => {
	    return (
		<ListItem primaryText={fileInfo.name} key={fileInfo.id}/>
	    );
	});
	return (
	    <List>
	    {listNodes}
	    </List>
	);
    }
}

export default Home;
