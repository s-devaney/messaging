import { Meteor } from "meteor/meteor";
import React, { Component, PropTypes } from "react";
import { createContainer } from "meteor/react-meteor-data";

import { Messages as MessagesCollection } from "../../api/messages/messages.js";

class MessagingStats extends Component {
	handleDeleteMessages() {
		console.log("TODO - handle delete messages");
	}

	render() {
		return(
			<div id="messaging-stats" className="card">
				<div className="content admin-fix">
					<div className="header">Messaging stats</div>
				</div>
				<div className="content">
					<h1 className="ui center aligned header">
						{this.props.messages.length}
					</h1>
					<h2 className="ui center aligned header">
						Sent messages
					</h2>
				</div>
				<div className="extra content">
					<button className="ui button blue" onClick={this.handleDeleteMessages}>Delete all messages</button>
				</div>
			</div>
		);
	}
}

MessagingStats.propTypes = {

};

export default createContainer((props) => {
	Meteor.subscribe("messages");

	return {
		messages: MessagesCollection.find().fetch()
	}
}, MessagingStats);