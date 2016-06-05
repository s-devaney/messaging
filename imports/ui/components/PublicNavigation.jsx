import React, { Component } from "react";
import { createContainer } from "meteor/react-meteor-data";
import { Meteor } from "meteor/meteor";
import FlowHelpers from "../../lib/FlowHelpers.js";
import { FlowRouter } from "meteor/kadira:flow-router";

class PublicNavigation extends Component {
	isActive(route) {
		return (route === this.props.activeRoute) ? "active " : "";
	}

	render() {
		return(
			<div id="public-navigation">
				<a href={FlowHelpers.pathFor("home")} className={this.isActive("home") + "item"}>
					<i className="LEFT home icon"></i>
					Home
				</a>
				<a href={FlowHelpers.pathFor("login")} className={this.isActive("login") + "item"}>
					<i className="LEFT home icon"></i>
					Login
				</a>
				<a href={FlowHelpers.pathFor("register")} className={this.isActive("register") + "item"}>
					<i className="LEFT male icon"></i>
					Register
				</a>
			</div>
		);
	}
}

export default createContainer(() => {
	return {
		activeRoute: FlowRouter.getRouteName()
	}
}, PublicNavigation);