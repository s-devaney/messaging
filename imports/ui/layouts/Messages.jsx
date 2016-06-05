import { Meteor } from 'meteor/meteor';
import React, { Component, PropTypes } from "react";
import { createContainer } from "meteor/react-meteor-data";
import { FlowRouter } from "meteor/kadira:flow-router";

import { Messages as MessagesCollection } from "../../api/messages/messages.js";
import Message from "../components/Message.jsx";

class MessagesLayout extends Component {
	renderMessages() {
		console.log(this.props.messages);

		if(this.props.messages.length === 0) {
			return (
				<tr>
					<td>There are no messages</td>
				</tr>
			);
		}

		return this.props.messages.map((message) => {
			return (
				<Message key={message._id} message={message} />
			);
		});
	}

	handleDeleteAll(event) {
		event.preventDefault();

		Meteor.call("messages.removeAll");
	}

	render() {
		return(
			<div id="messages-layout">
				<button className="ui button" onClick={(event)=>this.handleDeleteAll(event)}>Delete all</button>
				<button className="ui blue button" onClick={()=>FlowRouter.go("newMessage")}>New</button>
				<table className="ui celled table">
					<thead>
						<tr>
							<th>From</th>
							<th>Subject</th>
							<th>Message</th>
						</tr>
					</thead>
					<tbody>
						{this.renderMessages()}
					</tbody>
				</table>
			</div>
		);
	}
}

MessagesLayout.propTypes = {
	messages: PropTypes.array.isRequired
};

export default createContainer(() => {
	Meteor.subscribe("messages");

	return {
		messages: MessagesCollection.find({}).fetch(),
	}
}, MessagesLayout);