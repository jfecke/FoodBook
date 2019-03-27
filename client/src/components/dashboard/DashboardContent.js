import React, { Component } from "react";
import handleClick from "./Dashboard";

export default class DashboardContent extends Component {
	render() {
		return (
			<div className="dashboard-bg">
				<div className="profile-header text-center">
					<img
						className="profile-pic img-responsive m-3"
						src="https://picsum.photos/250/?random"
						alt="Profile"
					/>
					<div className="row">
						<div className="col-md-2" />
						<div className="text-bg col-md-8">
							<div className="row">
								<div className="col-md-3">City+State</div>
								<div className="col-md-3"># of Reviews</div>
								<div className="col-md-3"># of Followers</div>
								<div className="col-md-3"># Following</div>
							</div>
							<hr className="m-2" />
							<div className="row">
								<a className="col-md-6" href="#" onClick={handleClick}>
									Your Reviews ▶
								</a>
							</div>
						</div>
						<div className="col-md-2" />
					</div>
				</div>
			</div>
		);
	}
}
