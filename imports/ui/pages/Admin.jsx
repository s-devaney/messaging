import React, { Component } from "react";

import AdminLayout from "../layouts/Admin.jsx";

export default class Admin extends Component {
	render() {
		return(
			<div id="admin-page">
				<h1 className="ui header">Admin</h1>
				<AdminLayout />
			</div>
		);
	}
}