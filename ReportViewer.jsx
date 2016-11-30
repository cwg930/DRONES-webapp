import React from 'react';
import $ from 'jquery';
import {GridList, GridTile} from 'material-ui/GridList';
import Subheader from 'material-ui/Subheader';
import Dialog from 'material-ui/Dialog';
import FlatButton from 'material-ui/FlatButton';

class ReportViewer extends React.Component {
    constructor(props) {
	super(props);
	this.state = {
	    openDialog: false,
	    dialogImage: null,
	}
    }
    componentDidMount() {
	console.log("ReportViewer mounted")
    }
    _tileClick(id) {
	this.setState({openDialog: true, dialogImage: id})
    }
    render() {
	var files = this.props.data[this.props.params.reportId].files.map((file)=>{
	    return (
		<GridTile 
		    key={file.id}
		    title={file.point}
		    subtitle={file.filename}
		    onClick={this._tileClick.bind(this, file.id)}
		>
		    <GridImage type={"grid"} id={file.id} url={this.props.url} token={this.props.token} />
		</GridTile>
	    );
	});
	return (
	    <div>
	    <GridList cellHeight={180} style={{overflowY:'auto'}}>
		<Subheader>{this.props.data[this.props.params.reportId].name}</Subheader>
		{files}
	    </GridList>
	    <Dialog
		title={"Image"}
		actions={[<FlatButton label="Close" primary={true} onClick={()=>{this.setState({openDialog:false})}}/>]}
		open={this.state.openDialog}
		contentStyle={{position:'absolute', left:'50%', top:'50%', transform:'translate(-50%,-50%)'}}
	    >
		<div>
		    <GridImage type={"dialog"} id={this.state.dialogImage} url={this.props.url} token={this.props.token} />
		</div>
	    </Dialog>
	    </div>
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
	    $("#"+ this.props.type+ "-image-"+id).attr("src", "data:image/jpg;base64,"+base64data);
	});
    }
    
    componentDidMount() {
	this.loadImage(this.props.id)
    }
    render() {
	return (
	    <img id={this.props.type + "-image-"+this.props.id} src="" style={{width:'100%',height:'100%'}} />
	);
    }
}

export default ReportViewer;
