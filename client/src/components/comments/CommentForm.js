import React, { Component } from "react";

export default class Comment extends Component {
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
						<form>
							<div class="form-group">
								<label for="title">Post Title:</label>
								<input
									type="text"
									class="form-control"
									id="title"
									placeholder="Title"
								/>
							</div>
							<div class="form-group">
								<label for="rating">Rating:</label>
								<select class="form-control" id="rating">
									<option>1</option>
									<option>2</option>
									<option>3</option>
									<option>4</option>
									<option>5</option>
								</select>
							</div>
							<div class="form-group">
								<label for="comment">Comment</label>
								<textarea class="form-control" id="comment" rows="5" />
							</div>
						</form>
					</div>
				</div>
			</div>
		);
	}
}
