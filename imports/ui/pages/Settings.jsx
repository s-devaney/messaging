import React, { Component } from "react";

import SettingsLayout from "../layouts/Settings.jsx";

export default class Settings extends Component {
	render() {
		return(
			<div id="settings-page">
				<h1 className="ui header">Settings</h1>
				<SettingsLayout />
			</div>
		);
	}
}