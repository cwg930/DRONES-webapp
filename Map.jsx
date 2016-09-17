import React from 'react';
import $ from 'jquery';
import {GoogleMapLoader, GoogleMap, Marker} from 'react-google-maps';
import CircularProgress from 'material-ui/CircularProgress';

const version = Math.ceil(Math.random() *22);

class Map extends React.Component {
    constructor(props) {
	super(props);
	this.loadPoints = this.loadPoints.bind(this);
	this.setPosition = this.setPosition.bind(this);
	this.state = {
	    token:'',
	    position:{
		    latitude:28.6024,
		    longitude:-81.2001
	    },
	    plan: {
		points:[]
	    }
	}
    }
    loadPoints() {
	$.ajax({
	    url: this.props.url+'/flightplans/' + this.props.params.planId,
	    beforeSend: (xhr) => {
		xhr.setRequestHeader("Authorization","Bearer " + this.state.token);
	    },
	    method:'GET',
	    cache:false,
	    success: (data) => {
		this.setState({plan:data})
		console.log(this.state.plan)
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
	this.setState({position:position})
    }
	
    componentDidMount() {
	var token = this.props.token;
	console.log("token: " + token);
	this.setState({token:token})
    }
    componentWillReceiveProps(nextProps) {
	this.setState({token: nextProps.token})
	console.log("recv props: " + this.state.token);
	this.loadPoints();
	this.setPosition();
    }
    render() {
	console.log("map render state: ")
	console.log(this.state.plan)
	console.log(this.props.params.planId);
	return (
	    <GoogleMapLoader
	    containerElement={
		<div
		style={{
		    height: '500px',
		    width: '500px'
		}}
		/>
	    }
	    googleMapElement={
		<GoogleMap
		ref={(map)=>(this._googleMapComponent = map) && console.log(map.getZoom())}
		defaultZoom={19}
		defaultCenter={{lat:28.6024, lng:-81.2001}}
		center={{lat:this.state.position.latitude, lng:this.state.position.longitude}} 
		>
		{this.state.plan.points.map((marker, index) => {
		    return (
			<Marker 
			position={{lat:marker.lat, lng:marker.lon}}
key={index}
			/>
		    );
		})}
	    </GoogleMap>	
	    }
	    />
	);
    }
}

export default Map;
