import React, { Component } from "react";
import API from "../../utils/API";

export default class Comment extends Component {
	state = {
		reviews: [],
		title: "",
		rating: "",
		comment: "",
	};

	componentDidMount() {
		this.loadReviews();
	}

	loadReviews = () => {
		API.getReviews().then(res => this.setState({ reviews: res.data }));
	};

	render() {
		return (
			<div className="card">
				<div className="row">
					<div className="col-md-2">
						<img
							className="comment-pic"
							src="https://picsum.photos/160"
							alt="profile"
						/>
						<div className="text-center">User Name</div>
					</div>
					<div className="col-md">
						<div>{this.state.title || "No Results Found"}</div>
						<div>
							<div>Rating ★★★★</div>
							Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do
							eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut
							enim ad minim veniam, quis nostrud exercitation ullamco laboris
							nisi ut aliquip ex ea commodo consequat. Duis aute irure dolor in
							reprehenderit in voluptate velit esse cillum dolore eu fugiat
							nulla pariatur. Excepteur sint occaecat cupidatat non proident,
							sunt in culpa qui officia deserunt mollit anim id est laborum.
						</div>
					</div>
				</div>
			</div>
		);
	}
}
