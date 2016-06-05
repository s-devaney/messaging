import React, { Component, PropTypes } from "react";
import { createContainer } from "meteor/react-meteor-data";
import { Meteor } from "meteor/meteor";

import AuthenticatedNavigation from "../components/AuthenticatedNavigation.jsx"
import PublicNavigation from "../components/PublicNavigation.jsx"

class Sidebar extends Component {
	getRootClasses() {
		console.log("get sidebar classes");
		if(!this.props.visible) {
			return "hidden";
		} else {
			return "";
		}
	}

	render() {
		return(
			<div id="side-container" className={this.getRootClasses()}>
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

Sidebar.propTypes = {
	visible: PropTypes.bool.isRequired
}

export default createContainer(() => {
	return {
		hasUser: !!Meteor.user(),
	}
}, Sidebar);