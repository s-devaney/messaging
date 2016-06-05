import { Meteor } from 'meteor/meteor';
import React, { Component, PropTypes } from "react";
import { createContainer } from "meteor/react-meteor-data";

import UserDetails from "../components/UserDetails.jsx";
import UserRole from "../components/UserRole.jsx";
import UserDisable from "../components/UserDisable.jsx";

class SettingsLayout extends Component {
	render() {
		return(
			<div id="settings-layout" className="ui three stackable cards">
				<UserDetails />
				<UserRole />
				<UserDisable />
			</div>
		);
	}
}

SettingsLayout.propTypes = {
};

export default createContainer(() => {

	return {
	}
}, SettingsLayout);