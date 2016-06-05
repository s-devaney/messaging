import React, { Component } from "react";
import { createContainer } from "meteor/react-meteor-data";
import { Meteor } from "meteor/meteor";

import AuthenticatedNavigation from "../components/AuthenticatedNavigation.jsx"
import PublicNavigation from "../components/PublicNavigation.jsx"

class Sidebar extends Component {
	render() {
		return(
			<div id="side-container">
				<div id="menu-header" className="ui secondary menu inverted blue one item">
					<div className="header item">
						Messaging
					</div>
				</div>
				<div id="menu" className="ui vertical pointing inverted menu left fixed">
					{this.props.hasUser ? <AuthenticatedNavigation /> : <PublicNavigation />}
				</div>
			</div>
		);
	}
}

export default createContainer(() => {
	return {
		hasUser: !!Meteor.user(),
	}
}, Sidebar);