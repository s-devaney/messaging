import { Meteor } from "meteor/meteor";
import React, { Component, PropTypes } from "react";
import { createContainer } from "meteor/react-meteor-data";

class UserList extends Component {
	constructor(props) {
		super(props);

		this.state = {checked: this.createCheckedMap(props)};
	}

	componentWillReceiveProps(props) {
		console.log("received new props");
		console.log(this.props.users);
		console.log(props);
		this.setState({checked: this.createCheckedMap(props)});
	}

	createCheckedMap(props) {
		const users = props.users.reduce(function(users,item){
			users[item._id] = {checked: false, _id: item._id};
			return users;
		},{});

		return users;
	}

	onUserSelected(user, event) {
		let checked = this.state.checked;
		checked[user._id].checked = !checked[user._id].checked;

		this.setState({checked: checked});
	}

	deleteUser(event) {
		event.preventDefault();

		const checkedUsers = _.pluck(_.where(this.state.checked, {checked: true}), "_id");

		console.log(checkedUsers);

		Meteor.call("users.remove", checkedUsers);
	}

	getCheckedValue(checked) {
		return (checked) ? "checked" : "";
	}

	getDisabledValue() {
		return (_.findWhere(this.state.checked, {checked: true}) === undefined) ? "disabled " : "";
	}

	getDeleteValue() {
		const selected = _.where(this.state.checked, {checked: true});

		if(selected.length > 1) {
			return "Delete " + selected.length + " users";
		} else if(selected.length === 1) {
			return "Delete 1 user";
		} else {
			return "Delete user";
		}
	}

	renderUsers() {
		return this.props.users.map((user) => {
			return(
				<li key={user._id}>
					<div className="ui checkbox">
						<input type="checkbox" onChange={this.onUserSelected.bind(this, user)} checked={this.getCheckedValue(this.state.checked[user._id].checked)} />
						<label>{user.emails[0].address}</label>
					</div>
				</li>
			);
		});
	}

	render() {
		return(
			<div id="user-list" className="card">
				<div className="content admin-fix">
					<div className="header">User list</div>
				</div>
				<div className="content">
					<ul>
						{this.renderUsers()}
					</ul>
				</div>
				<div className="extra content">
					<button className={this.getDisabledValue() + "ui button blue"} onClick={this.deleteUser.bind(this)}>{this.getDeleteValue()}</button>
				</div>
			</div>
		);
	}
}

UserList.propTypes = {
	users: PropTypes.array.isRequired
};

export default createContainer((props) => {
	Meteor.subscribe("users");

	return {
		users: Meteor.users.find({_id: { $ne: Meteor.userId() }}).fetch()
	}
}, UserList);