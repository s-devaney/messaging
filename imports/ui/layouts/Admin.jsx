import { Meteor } from 'meteor/meteor';
import React, { Component, PropTypes } from "react";
import { createContainer } from "meteor/react-meteor-data";

import UserList from "../components/UserList.jsx";
import UserStats from "../components/UserStats.jsx";
import MessagingStats from "../components/MessagingStats.jsx";
import UserRoles from "../components/UserRoles.jsx";

class AdminLayout extends Component {
	render() {
		return(
			<div id="admin-layout">
				<div className="ui three stackable cards">
					<UserList />
					<UserStats />
					<MessagingStats />
				</div>
				<div className="ui three stackable cards">
					<UserRoles />
				</div>
			</div>
		);
	}
}

AdminLayout.propTypes = {
};

export default createContainer(() => {

	return {
	}
}, AdminLayout);