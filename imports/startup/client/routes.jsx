import { FlowRouter } from "meteor/kadira:flow-router";
import React from "react";
import { mount } from "react-mounter";

import App from "../../ui/layouts/App.jsx";

import Home from "../../ui/pages/Home.jsx";
import Login from "../../ui/pages/Login.jsx";
import Register from "../../ui/pages/Register.jsx";

import Messages from "../../ui/pages/Messages.jsx";
import NewMessage from "../../ui/pages/NewMessage.jsx";
import Settings from "../../ui/pages/Settings.jsx";
import Admin from "../../ui/pages/Admin.jsx";

const publicRoutes = FlowRouter.group({ name: "public" });

publicRoutes.route("/", {
	name: "home",
	action() {
		mount(App, { yield: <Home /> });
	}
});

publicRoutes.route("/login", {
	name: "login",
	action() {
		mount(App, { yield: <Login /> });
	}
});

publicRoutes.route("/register", {
	name: "register",
	action() {
		mount(App, { yield: <Register /> });
	}
});

const authenticatedRoutes = FlowRouter.group({ name: "authenticated"});

authenticatedRoutes.route("/messages", {
	name: "messages",
	action() {
		console.log("route to messages");
		mount(App, { yield: <Messages /> });
	}
});

authenticatedRoutes.route("/messages/new", {
	name: "newMessage",
	action() {
		console.log("route to new message");
		mount(App, { yield: <NewMessage /> });
	}
});

authenticatedRoutes.route("/logout", {
	name: "logout",
	action() {
		Meteor.logout(() => { FlowRouter.go("login") });
	}
});

authenticatedRoutes.route("/settings", {
	name: "settings",
	action() {
		mount(App, { yield: <Settings /> });
	}
});

const adminRoutes = FlowRouter.group({ name: "admin" });

adminRoutes.route("/admin", {
	name: "admin",
	action() {
		mount(App, { yield: <Admin /> });
	}
})