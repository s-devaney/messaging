import React, { Component } from "react";
import ReactDOM from "react-dom";
import { Meteor } from "meteor/meteor";

import { FlowRouter } from "meteor/kadira:flow-router";

export default class Login extends Component {
	handleSubmit(event) {
		event.preventDefault();

		const formData = {
			email: ReactDOM.findDOMNode(this.refs.email).value.trim(),
			password: ReactDOM.findDOMNode(this.refs.password).value
		}

		Meteor.loginWithPassword({email: formData.email}, formData.password, function(error) {
			if(error) {
				console.log("error with login");
				console.log(error);
			} else {
				console.log("login successful");
				FlowRouter.go("/messages");
			}
		});
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
					<input type="password" ref="password" placeholder="Password" />
				</div>
				<button className="ui blue button" type="submit">Login</button>
			</form>
		);
	}
}