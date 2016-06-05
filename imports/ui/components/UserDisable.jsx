import { Meteor } from "meteor/meteor";
import React, { Component, PropTypes } from "react";
import { createContainer } from "meteor/react-meteor-data";

class UserDisable extends Component {
	handleDelete() {
		console.log("TODO - delete account");
	}

	render() {
		return(
			<div id="user-disable">
				<h4 className="ui horizontal divider header">
					<i className="ban icon"></i>
					Delete account
				</h4>
				<p>If you want to delete your account please press the button below. Please note this is irreversable and you will lose all of your messages.</p>
				<button className="ui button blue" onClick={this.handleDelete}>Delete account</button>
			</div>
		);
	}
}

UserDisable.propTypes = {
};

export default createContainer((props) => {
	return {
		user: Meteor.userId(),
		roles: Roles.getAllRoles().fetch()
	}
}, UserDisable);