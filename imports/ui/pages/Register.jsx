import React, { Component } from "react";
import ReactDOM from "react-dom";
import { Accounts } from "meteor/accounts-base";

import { FlowRouter } from "meteor/kadira:flow-router";

export default class Register extends Component {
	handleSubmit(event) {
		event.preventDefault();

		const formData = {
			email: ReactDOM.findDOMNode(this.refs.email).value.trim(),
			password: ReactDOM.findDOMNode(this.refs.password).value
		}

		const id = Accounts.createUser({
			email: formData.email,
			password: formData.password
		}, function(error) {
			if(error) {
				console.log("register error");
				console.log(error);
			} else {
				console.log("register successful");
				FlowRouter.go("/messages");
			}
		});

		Roles.addUsersToRole(id, "default");
	}

	render() {
		return(
			<form className="ui form" onSubmit={(event)=>this.handleSubmit(event)}>
				<div className="field">
					<label>Email</label>
					<input type="text" ref="email" placeholder="Email" />
				</div>
				<div className="field">
					<label>Password</label>
					<input type="text" ref="password" placeholder="Password" />
				</div>
				<button className="ui blue button" type="submit">Register</button>
			</form>
		);
	}
}