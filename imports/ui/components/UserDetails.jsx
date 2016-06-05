import { Meteor } from "meteor/meteor";
import React, { Component, PropTypes } from "react";
import { createContainer } from "meteor/react-meteor-data";

class UserDetails extends Component {
	handleChangeEmail() {
		console.log("TODO - handle change email");
	}

	handleChangePassword() {
		console.log("TODO - handle change password");
	}

	render() {
		return(
			<div id="user-details">
				<h4 className="ui horizontal divider header">
					<i className="tag icon"></i>
					Change email
				</h4>
				<form className="ui form" onSubmit={this.handleChangeEmail.bind(this)}>
					<div className="field">
						<input type="text" ref="email" defaultValue={this.props.user.emails[0].address} />
					</div>
					<button className="ui blue button" type="submit">Change</button>
				</form>
				<h4 className="ui horizontal divider header">
					<i className="key icon"></i>
					Change password
				</h4>
				<form className="ui form" onSubmit={this.handleChangePassword.bind(this)}>
					<div className="field">
						<input type="password" ref="password" placeholder="Password" />
					</div>
					<button className="ui blue button" type="submit">Change</button>
				</form>
				<br />
			</div>
		);
	}
}

UserDetails.propTypes = {
};

export default createContainer((props) => {
	return {
		user: Meteor.user()
	}
}, UserDetails);