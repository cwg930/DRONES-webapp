import React from 'react';
import $ from 'jquery';
import {GridList, GridTile} from 'material-ui/GridList';
import Subheader from 'material-ui/Subheader';

class ReportViewer extends React.Component {
    constructor(props) {
	super(props);
    }
    componentDidMount() {
	console.log("ReportViewer mounted")
    }
    render() {
	var files = this.props.data[this.props.params.reportId-1].files.map((file)=>{
	    return (
		<GridTile 
		    key={file.id}
		    title={file.point}
		    subtitle={file.filename}
		>
		    <GridImage id={file.id} url={this.props.url} token={this.props.token} />
		</GridTile>
	    );
	});
	return (
	    <GridList cellHeight={180} style={{overflowY:'auto'}}>
		<Subheader>{this.props.data[this.props.params.reportId-1].name}</Subheader>
		{files}
	    </GridList>
	);
    }
}

class GridImage extends React.Component {
    loadImage(id) {
	$.ajax({
	    url: this.props.url+'/files/'+id+'/base64',
	    beforeSend: (xhr) => {
		xhr.setRequestHeader("Authorization", "Bearer " + this.props.token);
	    },
	    method:'GET',
	    processData: false,
	}).always((base64data) => {
	    $("#image-"+id).attr("src", "data:image/jpg;base64,"+base64data);
	});
    }
    
    componentDidMount() {
	this.loadImage(this.props.id)
    }
    render() {
	return (
	    <img id={"image-"+this.props.id} src="" style={{width:'100%',height:'100%'}} />
	);
    }
}

export default ReportViewer;
