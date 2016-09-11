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
		coords:{
		    latitude:28.6024,
		    longitude:-81.2001
		}
	    },
	    plan: {
		points:[]
	    }
	}
    }
    loadPoints() {
	$.ajax({
	    url: 'http://localhost:8080/flightplans/1',
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
    setPosition(position) {
	this.setState({position:position})
	console.log(this.state.position.coords);
	console.log(typeof this.state.position.coords.latitude);
	console.log(typeof this.state.position.coords.longitude);
    }
    componentDidMount() {
	var token = this.props.token;
	console.log("token: " + token);
	this.setState({token:token})
	if(navigator.geolocation) {
	    navigator.geolocation.getCurrentPosition(this.setPosition)
	}
    }
    componentWillReceiveProps(nextProps) {
	this.setState({token: nextProps.token})
	console.log("recv props: " + this.state.token);
	this.loadPoints();
    }
    render() {
	console.log("map render state: ")
	console.log(this.state.plan)
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
		center={{lat:this.state.position.coords.latitude, lng:this.state.position.coords.longitude}} 
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
