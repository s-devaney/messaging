import React, { Component, PropTypes } from "react";
import { createContainer } from "meteor/react-meteor-data";
import { Meteor } from "meteor/meteor";

import FlowHelpers from "../../lib/FlowHelpers.js";

class Toolbar extends Component {
	handleToggleSidebar() {
		console.log("toggle");
		this.props.toggleSidebar();
	}

	render() {
		return(
			<div id="toolbar">
				<div className="ui secondary menu inverted blue">
					<a className="item" onClick={this.handleToggleSidebar.bind(this)}>
						<i className="sidebar icon"></i>
					</a>
					<div className="right menu">
						<a href={FlowHelpers.pathFor("logout")} className="item">
							<i className="sign out icon"></i>
						</a>
					</div>
				</div>
			</div>
		);
	}
}

Toolbar.propTypes = {
	toggleSidebar: PropTypes.func.isRequired
}

export default createContainer(() => {
	return {
		hasUser: !!Meteor.user(),
	}
}, Toolbar);