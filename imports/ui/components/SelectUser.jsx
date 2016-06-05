import { Meteor } from "meteor/meteor";
import React, { Component, PropTypes } from "react";
import { render } from 'react-dom';
import { createContainer } from "meteor/react-meteor-data";

class SelectUser extends Component {
	renderUsers() {
		return this.props.users.map((user) => {
			return(
				<option key={user._id} value={user._id}>{user.emails[0].address}</option>
			);
		});
	}

	shouldSelect(userId) {
		return (this.props.selected === userId) ? "selected" : "";
	}

	handleChange() {
		this.props.handleChange(this.refs.selectUser.value);
	}

	render() {
		console.log("selected: " + this.props.selected);
		return(
			<select ref="selectUser" value={this.props.selected} onChange={this.handleChange.bind(this)}>
				<option value="none"></option>
				{this.renderUsers()}
			</select>
		);
	}
}

SelectUser.propTypes = {
	users: PropTypes.array.isRequired
};

export default createContainer((props) => {
	Meteor.subscribe("users");

	return {
		users: Meteor.users.find().fetch()
	}
}, SelectUser);