import React, { Component } from "react";

export default class Review extends Component {
	render() {
		return (
			<div className="card">
				<div className="row">
					{/* <div className="col-md"> */}
					<img
						className="restaruant-pic"
						src="https://picsum.photos/160"
						alt="profile"
					/>
					{/* </div> */}
					<div className="col-md">
						<h3>Restaurant Name</h3>
						<div>Address</div>
						<div># of Reviews by Follows</div>
						<div>Yelp Rating</div>
						<div>Foodbook Rating</div>
						<a href="javascript:alert('Expand!');"># of Comments</a>
					</div>
				</div>
			</div>
		);
	}
}
