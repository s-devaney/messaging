import React, { Component } from "react";

import MessagesLayout from "../layouts/Messages.jsx";

export default class Messages extends Component {
	render() {
		return(
			<div id="messages-page">
				<h1 className="ui header">Messages</h1>
				<MessagesLayout />
			</div>
		);
	}
}