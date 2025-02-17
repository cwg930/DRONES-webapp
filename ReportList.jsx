import React from 'react';
import {List, ListItem, MakeSelectable} from 'material-ui/List';
import {withRouter} from 'react-router';
let SelectableList = MakeSelectable(List)

class ReportList extends React.Component {
    constructor(props) {
	super(props);
	this.onListItemSelected = this.onListItemSelected.bind(this);
    }
    onListItemSelected(event, index) {

	console.log("Item selected: ")
	console.log(index.arrayVal)
	this.props.router.push('/home/reports/' + index.arrayVal);
    }
    render() {
	var i = 0;
	var listNodes = this.props.data.map((report) => {
	    report.arrayVal = i;
	    i++;
	    return (
		<ListItem primaryText={report.name} key={report.id} value={report} />
	    );
	});
	return (
	    <SelectableList onChange={this.onListItemSelected} className="captainPlanet">
	    {listNodes}
	    </SelectableList>
	);
    }
}

export default withRouter(ReportList);
