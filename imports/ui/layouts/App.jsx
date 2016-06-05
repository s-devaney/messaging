import React, { Component } from "react";
import { createContainer } from "meteor/react-meteor-data";

import Sidebar from "./Sidebar.jsx";
import Toolbar from "./Toolbar.jsx";

import Login from "../pages/Login.jsx";

class App extends Component {
	constructor(props) {
		super(props);

		this.state = {sidebar: true, mql: null, docked: false};
	}

	componentWillMount() {
		const mql = window.matchMedia('(min-width: 800px)');
		mql.addListener(this.mediaQueryChanged.bind(this));
		this.setState({sidebar: mql.matches, mql: mql});
	}

	componentWillUnmount() {
		this.state.mql.removeListener(this.mediaQueryChanged);
	}

	mediaQueryChanged() {
		this.setState({sidebar: this.state.mql.matches, docked: this.state.mql.matches});
	}

	loading() {
		return(
			<div className="loading">Loading, please wait...</div>
		);
	}

	getContent() {
		return this.props.canView() ? this.props.yield : <Login />;
	}

	toggleSidebar() {
		console.log("toggle2");
		this.setState({sidebar: !this.state.sidebar});
	}

	getContentClasses() {
		if(!this.state.docked) {
			return "undocked";
		} else {
			return "";
		}
	}

	render() {
		return (
			<div id="container">
				<div id="side">
					<Sidebar visible={this.state.sidebar} />
				</div>
				<div id="content" className={this.getContentClasses()}>
					<div id="content-wrapper">
						<Toolbar toggleSidebar={this.toggleSidebar.bind(this)} />
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