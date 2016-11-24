import React from 'react';
import $ from 'jquery';
import Map from './Map.jsx';

class MapContainer extends React.Component {
    constructor(props) {
	super(props);
	this.loadPoints = this.loadPoints.bind(this);
	this.setPosition = this.setPosition.bind(this);
	this.state = {
//	    planId:-1,
	    position:{
		latitude:28.6024,
		longitude:-81.2001
	    },
	    plan: {
		points:[]
	    }
	}
    }
    
    loadPoints(planId) {
	$.ajax({
	    url: this.props.url+'/flightplans/' + planId,
	    beforeSend: (xhr) => {
		xhr.setRequestHeader("Authorization", "Bearer " + this.props.token);
	    },
	    method:'GET',
	    cache:false,
	    success: (data) => {
		this.setState({plan:data});
		this.setPosition();
	    },
	    error: (xhr, status, error) => {
		console.error("", status, error.toString());
	    }
	});
    }
    setPosition() {
	var lat = this.state.plan.points[0].lat;
	var lon = this.state.plan.points[0].lon;
	var position = {latitude:lat, longitude:lon};
	this.setState({position:position});
    }
    componentDidMount() {
	console.log("MapContainer:\n  token: " + this.props.token);
	console.log("  planId: " + this.props.params.planId);
	//this.setState({planId:this.props.params.planId});
	this.loadPoints(this.props.params.planId);
    }
    componentWillReceiveProps(nextProps) {
	console.log("MapContainer:\n  token: " + this.props.token);
	console.log("  planId: " + this.props.params.planId);
	//this.setState({planId:nextProps.params.planId});
	this.loadPoints(nextProps.params.planId);
    }	
    render() {
	return(
	    <div>
		<Map plan={this.state.plan} position={this.state.position}  />
	    </div>
	)
    }
}

export default MapContainer;
