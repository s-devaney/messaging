import { Meteor } from "meteor/meteor";
import React, { Component, PropTypes } from "react";
import { render } from 'react-dom';
import { createContainer } from "meteor/react-meteor-data";

import SelectUser from "./SelectUser.jsx";

class UserRoles extends Component {
	constructor(props) {
		super(props);

		this.state = {selected: "none", selectedRole: ""};
	}

	onSelectChanged(newValue) {
		console.log("setting user state: " + newValue);
		const roleState = (newValue === "none") ? "" : Meteor.users.findOne(newValue).roles[0];
		console.log("setting role statE: " + roleState);
		this.setState({selected: newValue, selectedRole: roleState});
	}

	getButtonClasses() {
		let classes = "ui button blue"

		if(this.state.selected === "none" || this.state.selectedRole === Meteor.users.findOne(this.state.selected).roles[0]) {
			classes = classes + " disabled";
		}

		return classes;
	}

	getRoleContent() {
		if(this.state.selected === "none") {
			return(
				<div></div>
			);
		} else {
			return(
				<select value={this.state.selectedRole} ref="selectRole" onChange={this.onSelectedRoleChanged.bind(this)}>{this.getRoleOptions()}</select>
			);
		}
	}

	onSelectedRoleChanged() {
		this.setState({selectedRole: this.refs.selectRole.value});
	}

	getRoleOptions() {
		return this.props.roles.map((role) => {
			return(
				<option key={role._id} value={role.name}>{role.name}</option>
			);
		});
	}

	changeRole() {
		console.log(this.state.selected);
		console.log(this.state.selectedRole);
		Meteor.call("changeRole", this.state.selected, this.state.selectedRole);
	}

	render() {
		return(
			<div id="user-roles" className="card">
				<div className="content admin-fix">
					<div className="header">User roles</div>
				</div>
				<div className="content">                                                                                                                                                        
					<SelectUser selected={this.state.selected} handleChange={this.onSelectChanged.bind(this)} />
					<br />
					{this.getRoleContent()}
				</div>
				<div className="extra content">
					<button className={this.getButtonClasses()} onClick={this.changeRole.bind(this)}>Change role</button>
				</div>
			</div>
		);
	}
}

UserRoles.propTypes = {

};

export default createContainer((props) => {
	Meteor.subscribe("roles");
	Meteor.subscribe("users");

	return {
		roles: Roles.getAllRoles().fetch(),
		users: Meteor.users.find().fetch()
	}
}, UserRoles);