import React, { Component } from "react";
import { createContainer } from "meteor/react-meteor-data";
import { Meteor } from "meteor/meteor";
import FlowHelpers from "../../lib/FlowHelpers.js";
import { FlowRouter } from "meteor/kadira:flow-router";

import { Messages } from "../../api/messages/messages.js";

class AuthenticatedNavigation extends Component {
	isActive(route) {
		return (route === this.props.activeRoute) ? "active " : "";
	}

	renderRoleSpecificMenu() {
		if(Roles.userIsInRole(this.props.user, "admin")) {
			return(
				<a href={FlowHelpers.pathFor("admin")} className={this.isActive("admin") + "item"}>
					<i className="LEFT users icon"></i>
					Admin
				</a>
			)
		}
	}

	render() {
		return(
			<div id="authenticated-navigation">
				<a href={FlowHelpers.pathFor("home")} className={this.isActive("home") + "item"}>
					<i className="LEFT home icon"></i>
					Home
				</a>
				<a href={FlowHelpers.pathFor("messages")} className={this.isActive("messages") + this.isActive("newMessage") + "item"}>
					<i className="LEFT mail icon"></i>
					Messages
					<div className="ui small label blue">{this.props.messages.length}</div>
				</a>
				<a href={FlowHelpers.pathFor("settings")} className={this.isActive("settings") + "item"}>
					<i className="LEFT configure icon"></i>
					Settings
				</a>
				{this.renderRoleSpecificMenu()}
			</div>
		);
	}
}

export default createContainer(() => {
	Meteor.subscribe("messages");

	return {
		user: Meteor.user(),
		messages: Messages.find({}).fetch(),
		activeRoute: FlowRouter.getRouteName()
	}
}, AuthenticatedNavigation);