import React from 'react';
import RaisedButton from 'material-ui/RaisedButton';
import {withRouter} from 'react-router';
import Divider from 'material-ui/Divider';
import ReactGridLayout from 'react-grid-layout';

class MainMenu extends React.Component {
    render() {
	return (
	    <ReactGridLayout cols={12} rowHeight={30} width={1200}>
		<div key="a" data-grid={{x:4, y:1, w:4, h:1, static:true}}>
		    <RaisedButton label="View Reports" onClick={()=>{this.props.router.push("/home/reports")}} primary={true} fullWidth={true} />
		</div>
		<div key="b" data-grid={{x:4, y:3, w:4, h:1, static:true}}>
		    <RaisedButton label="View Plans" onClick={()=>{this.props.router.push("/home/plans")}} primary={true} fullWidth={true} />
		</div>
		<div key="c" data-grid={{x:4, y:5, w:4, h:1, static:true}}>
		    <RaisedButton label="Create Plan" onClick={()=>{this.props.router.push("/home/createplan")}} primary={true} fullWidth={true}/>
		</div>
	    </ReactGridLayout>
	);
    }
}

export default withRouter(MainMenu);
