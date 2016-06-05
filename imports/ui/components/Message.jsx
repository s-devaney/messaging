import { Meteor } from "meteor/meteor";
import React, { Component, PropTypes } from "react";
import { createContainer } from "meteor/react-meteor-data";

class Message extends Component {
	render() {
		if(this.props.user.length === 0) return null;

		return(
			<tr>
				<td>{this.props.user[0].emails[0].address}</td>
				<td>{this.props.message.subject}</td>
				<td>{this.props.message.message}</td>
			</tr>
		);
	}
}

Message.propTypes = {
	message: PropTypes.object.isRequired,
	user: PropTypes.array.isRequired
};

export default createContainer((props) => {
	//Meteor.subscribe("messages");

	return {
		user: Meteor.users.find({_id: props.message.from}, {limit: 1}).fetch()
	}
}, Message);