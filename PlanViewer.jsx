import React from 'react';
import $ from 'jquery';
import {Toolbar, ToolbarGroup, ToolbarTitle} from 'material-ui/Toolbar';
import Drawer from 'material-ui/Drawer';
import ReactGridLayout from 'react-grid-layout';
import PlanList from './PlanList.jsx'

class PlanViewer extends React.Component {
    constructor(props){
	super(props);
	this.state = {
	    data: []
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
	this.loadPlans();
    }
    render() {
	return (
	    <div>
		<Toolbar>
		    <ToolbarGroup>
			<ToolbarTitle text="Your Flight Plans"/>
		    </ToolbarGroup>
		</Toolbar>
	    <ReactGridLayout className="layout" cols={12} rowHeight={30} width={1200}>
	    <div key="a" data-grid={{x:3,y:0,w:6,h:6, static:true}}>
		{this.props.children && React.cloneElement(this.props.children, {token:this.props.token, url:this.props.url})}
	    </div>
	    <div key="b" data-grid={{x:0, y:0, w: 3, h: 6, static:true}}>
		<PlanList data={this.state.data} />
	    </div>
	    </ReactGridLayout>
	    </div>
	);
    }
}

export default PlanViewer;
