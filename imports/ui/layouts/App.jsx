import React, { Component } from "react";
import { createContainer } from "meteor/react-meteor-data";

import Sidebar from "./Sidebar.jsx";
import Toolbar from "./Toolbar.jsx";

import Login from "../pages/Login.jsx";

class App extends Component {
	loading() {
		return(
			<div className="loading">Loading, please wait...</div>
		);
	}

	getContent() {
		return this.props.canView() ? this.props.yield : <Login />;
	}

	render() {
		return (
			<div id="container">
				<div id="side">
					<Sidebar />
				</div>
				<div id="content">
					<div id="content-wrapper">
						<Toolbar />
						<div id="main-content">
							{this.props.loggingIn ? this.loading() : this.getContent()}
						</div>
					</div>
				</div>
			</div>
		);
	}
}

export default createContainer(() => {
	return {
		loggingIn: Meteor.loggingIn(),
		hasUser: !!Meteor.user(),
		canView() {
			if(FlowRouter.current().route.group.name === "public") return true;
			if(FlowRouter.current().route.group.name === "authenticated" && !!Meteor.user()) return true;
			if(FlowRouter.current().route.group.name === "admin" && !!Meteor.user() && Roles.userIsInRole(Meteor.userId(), "admin")) return true;
			return false;
		}
	}
}, App);