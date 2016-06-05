import { Meteor } from "meteor/meteor";
import React, { Component, PropTypes } from "react";
import ReactDOM from "react-dom";
import { FlowRouter } from "meteor/kadira:flow-router";
import { createContainer } from "meteor/react-meteor-data";

import { Messages } from "../../api/messages/messages.js";

class NewMessage extends Component {
	constructor(props) {
		super(props);
		this.state = {error: false};
	}

	handleCancel(event) {
		event.preventDefault();

		FlowRouter.go("messages");
	}

	handleSubmit(event) {
		event.preventDefault();

		const to = this.props.users.findOne({ emails: { $elemMatch: { address: ReactDOM.findDOMNode(this.refs.to).value.trim() } } });

		if(to === undefined) {
			return this.setState({error: "That user does not exist"});
		}

		const formData = {
			to: to._id,
			subject: ReactDOM.findDOMNode(this.refs.subject).value.trim(),
			message: ReactDOM.findDOMNode(this.refs.message).value
		}

		Meteor.call("messages.insert", formData.to, formData.subject, formData.message);

		FlowRouter.go("messages");
	}

	render() {
		return(
			<form className={!this.state.error ? "ui form" : "warning ui form"} onSubmit={(event)=>this.handleSubmit(event)}>
				<div className="ui warning message">
					<div className="header">Could you check something?</div>
					<p>{this.state.error}</p>
				</div>
				<div className="field">
					<label>From: {this.props.user.emails[0].address}</label>
				</div>
				<div className="field">
					<label>To</label>
					<input type="text" ref="to" placeholder="Username" />
				</div>
				<div className="field">
					<label>Subject</label>
					<input type="text" ref="subject" placeholder="Subject" />
				</div>
				<div className="field">
					<label>Message</label>
					<textarea ref="message"></textarea>
				</div>
				<button className="ui button" type="submit" onClick={(event)=>this.handleCancel(event)}>Cancel</button>
				<button className="ui blue button" type="submit">Send</button>
			</form>
		);
	}
}

NewMessage.propTypes = {
	user: PropTypes.object.isRequired
}

export default createContainer(() => {
	Meteor.subscribe("users");

	return {
		user: Meteor.user(),
		users: Meteor.users
	}
}, NewMessage);