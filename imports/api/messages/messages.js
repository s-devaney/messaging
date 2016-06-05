import { Meteor } from 'meteor/meteor';
import { Mongo } from "meteor/mongo";
import { check } from 'meteor/check';

export const Messages = new Mongo.Collection("messages");

if(Meteor.isServer) {
	Meteor.publishComposite("messages", {
		find: function() {
			return Messages.find({
				to: this.userId
			});
		},

		children: [
			{
				find: function(message) {
					return Meteor.users.find({
						_id: message.from
					},
					{
						limit: 1,
						fields: {
							emails: 1
						}
					});
				}
			}
		]
	});

	Meteor.publish("users", function() {
		return Meteor.users.find({}, {fields: {emails: 1, roles: 1}});
	});

	Meteor.publish("roles", function() {
		if(Roles.userIsInRole(this.userId, "admin")) {
			return Roles.getAllRoles();
		} else {
			return null;
		}
	});

	Meteor.methods({
		"users.remove"(userId) {
			if(!Roles.userIsInRole(this.userId, "admin")) {
				throw new Meteor.Error("not-authorized");
			}

			check(userId, Array);
			Meteor.users.remove({
				"_id": {
					$in: userId
				}
			});
		},

		"users.changePassword"(newPassword) {
			check(newPassword, String);
			Accounts.setPassword(this.userId, newPassword, {logout: false});
		},

		"changeRole"(userId, role) {
			if(!Roles.userIsInRole(this.userId, "admin")) {
				throw new Meteor.Error("not-authorized");
			}

			console.log("check");
			console.log(userId);
			console.log(role);

			check(userId, String);
			check(role, String);

			console.log("passed");

			Roles.setUserRoles(userId, role);
		},

		"createRole"(name) {
			if(!Roles.userIsInRole(this.userId, "admin")) {
				throw new Meteor.Error("not-authorized");
			}

			Roles.createRole(name);
		},

		"deleteRole"(name) {
			if(!Roles.userIsInRole(this.userId, "admin")) {
				throw new Meteor.Error("not-authorized");
			}

			Roles.deleteRole(name);			
		}
	});
}

Meteor.methods({
	"messages.insert"(to, subject, message) {
		if(!this.userId) {
			throw new Meteor.Error("not-authorized");
		}

		check(to, String);
		check(subject, String);
		check(message, String);

		Messages.insert({
			from: this.userId,
			to: to,
			subject: subject,
			message: message
		});
	},

	"messages.removeAll"() {
		if(!this.userId) {
			throw new Meteor.Error("not-authorized");
		}

		Messages.remove({
			to: this.userId
		});
	},

	"users.create"(formData, cb) {
		check(formData, Object);

		const id = Accounts.createUser({
			email: formData.email,
			password: formData.password
		});

		console.log(id);

		check(id, String);

		Roles.addUsersToRoles(id, "default");

		cb();
	}
});