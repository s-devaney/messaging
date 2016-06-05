import { Meteor } from "meteor/meteor";
import React, { Component, PropTypes } from "react";
import { createContainer } from "meteor/react-meteor-data";

class UserRole extends Component {
	renderRoles() {
		if(this.props.roles.length === 0) {
			return(
				<p>You do not have permission to perform this action</p>
			)
		}

		return this.props.roles.map((role) => {
			return (
				<div className="field" key={role._id}>
					<div className="ui radio checkbox">
						<input type="radio" name="role" defaultChecked={(Roles.userIsInRole(this.props.user, role.name)) ? "checked" : ""} />
						<label>{role.name}</label>
					</div>
				</div>
			)
		});
	}

	handleChangeRole() {
		console.log("TODO - handle role change");
	}

	render() {
		console.log(this.props.user);
		return(
			<div id="user-roles">
				<h4 className="ui horizontal divider header">
					<i className="spy icon"></i>
					User role
				</h4>
				<p>Your role is {Roles.getRolesForUser(this.props.user)[0]}</p><br />
			</div>
		);
	}

	test() {
		return(
			<form className="ui form" onSubmit={this.handleChangeRole.bind(this)}>
				{this.renderRoles()}
				<button className="ui blue button" type="submit">Change</button>
			</form>
		)
	}
}

UserRole.propTypes = {
	user: PropTypes.object.isRequired,
	roles: PropTypes.array.isRequired
};

export default createContainer((props) => {
	Meteor.subscribe("roles");

	return {
		user: Meteor.user(),
		roles: Roles.getAllRoles().fetch()
	}
}, UserRole);