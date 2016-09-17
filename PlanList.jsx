import React from 'react';
import {withRouter} from 'react-router';
import {List, ListItem, MakeSelectable} from 'material-ui/List';

let SelectableList = MakeSelectable(List)

class PlanList extends React.Component {
    constructor(props){
	super(props);
	this.onListItemSelected = this.onListItemSelected.bind(this)
    }
    onListItemSelected(event, index) {
	this.props.router.push('/home/viewplan/'+index.id);
    }
    render() {
	var listNodes = this.props.data.map((fileInfo) => {
	    return (
		<ListItem primaryText={fileInfo.name} key={fileInfo.id} value={fileInfo}/>
	    );
	});
	return (
	    <SelectableList onChange={this.onListItemSelected}>
		{listNodes}
	    </SelectableList>
	);
    }
}

export default withRouter(PlanList);
