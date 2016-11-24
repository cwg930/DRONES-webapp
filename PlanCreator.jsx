import React from 'react';
import update from 'react-addons-update';
import $ from 'jquery';
import {GoogleMapLoader, GoogleMap, Marker} from 'react-google-maps';
import CircularProgress from 'material-ui/CircularProgress';
import RaisedButton from 'material-ui/RaisedButton';
import TextField from 'material-ui/TextField';
import {Toolbar, ToolbarGroup, ToolbarTitle} from 'material-ui/Toolbar';
import ReactGridLayout from 'react-grid-layout';

class PlanCreator extends React.Component {
    constructor(props) {
	super(props);
	this.savePlan = this.savePlan.bind(this);
	this.handleMapClick = this.handleMapClick.bind(this);
	this.handleSubmit = this.handleSubmit.bind(this);
	this.state = {
	    token:'',
	    plan:{
		name:"",
	    },
	    points:[]
	}
    }
    savePlan(plan) {
	$.ajax({
	    url: this.props.url+"/flightplans",
	    beforeSend: (xhr) => {
		xhr.setRequestHeader("Authorization", "Bearer " + this.state.token);
		console.log(plan)
	    },
	    method:'POST',
	    dataType:'json',
	    data: JSON.stringify(plan),
	    success: (data) => {},
	    error: (xhr, status, error) => {
		console.error('', status, error.toString());
	    }
	});
    }
    handleSubmit(event) {
	event.preventDefault();
	var points = this.state.points;
	var plan = this.state.plan;
	plan.points = points;
	console.log(plan);
	this.savePlan(plan);
    }
    handleMapClick(event) {
	let {points} = this.state;
	points = update(points, {
	    $push: [
		{
		    lat:event.latLng.lat(),
		    lon:event.latLng.lng(),
		    alt:10,
		    picture:false,
		    key: Date.now()
		},
	    ],
	});
	this.setState({points:points});
	console.log(this.state.points)
    }
    setPosition(position) {
	this.setState({position:position})
	console.log(this.state.position.coords);
	console.log(typeof this.state.position.coords.latitude);
	console.log(typeof this.state.position.coords.longitude);
    }

    geocodeAddress(address) {
    }

    componentDidMount() {
	var token = this.props.token;
	this.setState({token:token});
	if(navigator.geolocation) {
	    navigator.geolocation.getCurrentPosition(this.setPosition)
	}
    }
    componentWillReceiveProps(nextProps) {
	this.setState({token:nextProps.token});
    }
    render() {
	return (
	    <div>
		<Toolbar>
		    <ToolbarGroup>
			<ToolbarTitle text="Flight Plan Editor"/>
		    </ToolbarGroup>
		</Toolbar>
		<ReactGridLayout cols={12} rowHeight={30} width={1200}>
		<div key="a" data-grid={{x:0, y:0, w:3, h:6, static:true}}>
		<TextField
		    hintText="Plan name"
		    value={this.state.plan.name}
		    onChange={ (event)=>{this.setState({plan:{name:event.target.value}})}}
			     />

		<RaisedButton 
		    label="Submit"
		    primary={true}
		    onClick={this.handleSubmit}
		/>
		</div>
		<div key="b" data-grid={{x:3, y:0, w:6, h:6, static:true}}>
	    <GoogleMapLoader
	    containerElement={
		<div
		style={{
		    height: '600px',
		    width: '600px'
		}}
		/>
	    }
	    googleMapElement={
		<GoogleMap
		ref={(map)=>(this._googleMapComponent = map)}
		defaultZoom={19}
		defaultCenter={{lat:28.6024, lng:-81.2001}}
		onClick={this.handleMapClick}
		>
		{this.state.points.map((marker, index) => {
		    return(
			<Marker
			position={{lat:marker.lat, lng:marker.lon}}
			key={index}
			/>
		    );
		})}
		</GoogleMap>
	    }
	    />
		</div>
	    </ReactGridLayout>
	    </div>
	);
    }
}

export default PlanCreator;
