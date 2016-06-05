import { Meteor } from "meteor/meteor";
import React, { Component, PropTypes } from "react";
import { render } from 'react-dom';
import { createContainer } from "meteor/react-meteor-data";

class UserDetails extends Component {
	constructor(props) {
		super(props);

		this.state = {email: this.props.user.emails[0].address, password: ""}
	}

	handleEmailChange() {
		this.setState({email: this.refs.emailField.value});
	}

	handleEmailChangeSubmit() {
		console.log("TODO - handle change email");
	}

	handlePasswordChange() {
		this.setState({password: this.refs.password.value});
	}

	handlePasswordChangeSubmit() {
		console.log("TODO - handle change password");
	}

	getEmailButtonClasses() {
		let classes = "ui blue button";

		console.log(this.refs);

		if(this.refs.emailField === undefined || this.refs.emailField.value === "" || this.refs.emailField.value === this.props.user.emails[0].address) {
			classes = classes + " disabled";
		}

		return classes;
	}

	getPasswordButtonClasses() {
		let classes = "ui button blue";

		if(this.refs.password === undefined || this.refs.password.value === "") {
			classes = classes + " disabled";
		}

		return classes;
	}

	render() {
		return(
			<div id="user-details">
				<h4 className="ui horizontal divider header">
					<i className="tag icon"></i>
					Change email
				</h4>
				<form className="ui form" onSubmit={this.handleEmailChangeSubmit.bind(this)}>
					<div className="field">
						<input type="text" ref="emailField" value={this.state.email} onChange={this.handleEmailChange.bind(this)} />
					</div>
					<button className={this.getEmailButtonClasses()} type="submit">Change</button>
				</form>
				<h4 className="ui horizontal divider header">
					<i className="key icon"></i>
					Change password
				</h4>
				<form className="ui form" onSubmit={this.handlePasswordChangeSubmit.bind(this)}>
					<div className="field">
						<input type="password" ref="password" placeholder="Password" value={this.state.password} onChange={this.handlePasswordChange.bind(this)} />
					</div>
					<button className={this.getPasswordButtonClasses()} type="submit">Change</button>
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