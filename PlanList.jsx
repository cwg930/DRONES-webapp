import React from 'react';
import {withRouter} from 'react-router';
import {List, ListItem, MakeSelectable} from 'material-ui/List';
import {Toolbar, ToolbarGroup, ToolbarTitle} from 'material-ui/Toolbar';
import Drawer from 'material-ui/Drawer';
import ReactGridLayout from 'react-grid-layout';
import Paper from 'material-ui/Paper';
import Infinite from 'react-infinite';
let SelectableList = MakeSelectable(List)


class PlanList extends React.Component {
    constructor(props){
	super(props);
	this.onListItemSelected = this.onListItemSelected.bind(this)
    }
    onListItemSelected(event, index) {
	this.props.router.push('/home/plans/'+index.id);
    }
    render() {
	var listNodes = this.props.data.map((fileInfo) => {
	    return (
		<ListItem primaryText={fileInfo.name} key={fileInfo.id} value={fileInfo}/>
	    );
	});
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
	    <Paper>
	    <SelectableList onChange={this.onListItemSelected} className="captainPlanet">
		{listNodes}
	    </SelectableList>
	    </Paper>
	    </div>
	    </ReactGridLayout>
	    </div>
	);
    }
}

export default withRouter(PlanList);
