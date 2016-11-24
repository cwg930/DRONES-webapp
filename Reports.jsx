import React from 'react';
import {Toolbar, ToolbarGroup, ToolbarTitle} from 'material-ui/Toolbar';
import Paper from 'material-ui/Paper';
import Drawer from 'material-ui/Drawer';
import $ from 'jquery';
import ReactGridLayout from 'react-grid-layout';
import ReportList from './ReportList.jsx';

class ReportContainer extends React.Component {
    constructor(props) {
	super(props);
	this.state = {
	    data:[]
	}
    }
    loadReports(planID) {
	$.ajax({
	    url: this.props.url+'/reports',
	    beforeSend: (xhr) => {
		xhr.setRequestHeader("Authorization","Bearer " + this.props.token);
	    },
	    method:'GET',
	    cache: false,
	    success: (data) => {console.log(data);this.setState({data:data});},
	    error: (xhr, status, error) => {
		console.error("", status,error.toString());
	    }
	});
    }
    componentDidMount() {
	this.loadReports();
    }
    render() {
	return (
	    <ReactGridLayout cols={12} rowHeight={30} width={1200}>
		<div key="a" data-grid={{x:0,y:0, w:3,h:6, static:true}}>
		    <ReportList data={this.state.data} />
		</div>
		<div key="b" data-grid={{x:3,y:0, w:6,h:6, static:true}}>
		    {this.props.children && React.cloneElement(this.props.children, {token:this.props.token, url:this.props.url, data:this.state.data})}
		</div>
	    </ReactGridLayout>
	);
    }
}

export default ReportContainer;
