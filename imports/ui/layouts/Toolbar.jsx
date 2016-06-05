import React, { Component } from "react";
import { createContainer } from "meteor/react-meteor-data";
import { Meteor } from "meteor/meteor";

import FlowHelpers from "../../lib/FlowHelpers.js";

class Toolbar extends Component {
	render() {
		return(
			<div id="toolbar">
				<div className="ui secondary menu inverted blue">
					<a className="item">
						<i className="sidebar icon"></i>
					</a>
					<div className="right menu">
						<a href={FlowHelpers.pathFor("logout")} className="item">
							<i className="sign out icon"></i>
						</a>
					</div>
				</div>
			</div>
		);
	}
}

export default createContainer(() => {
	return {
		hasUser: !!Meteor.user(),
	}
}, Toolbar);