import { Meteor } from "meteor/meteor";
import React, { Component, PropTypes } from "react";
import { createContainer } from "meteor/react-meteor-data";

class UserStats extends Component {
	render() {
		return(
			<div id="user-stats" className="card">
				<div className="content admin-fix">
					<div className="header">User stats</div>
				</div>
				<div className="content">
					<h1 className="ui center aligned header">
						{this.props.users.length}
					</h1>
					<h2 className="ui center aligned header">
						Registered users
					</h2>
				</div>
				<div className="extra content">
					<p>Extra information</p>
				</div>
			</div>
		);
	}
}

UserStats.propTypes = {

};

export default createContainer((props) => {
	Meteor.subscribe("users");

	return {
		users: Meteor.users.find().fetch()
	}
}, UserStats);