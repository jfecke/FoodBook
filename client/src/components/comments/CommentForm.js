import React, { Component } from "react";
import { Col, Row } from "../grid";
import API from "../../utils/API";
import { FormBtn } from "../Form/index";

export default class Comment extends Component {
	state = {
		title: "",
		rating: "",
		comment: "",
	};

	componentDidMount() {
		this.loadReviews();
	}

	loadReviews = () => {
		API.getReviews()
			.then(res =>
				this.setState({ reviews: res.data, title: "", rating: "", comment: "" })
			)
			.catch(err => console.log(err));
	};

	handleInputChange = event => {
		const { name, value } = event.target;
		this.setState({
			[name]: value,
		});
	};

	handleFormSubmit = event => {
		event.preventDefault();
		if (this.state.title && this.state.comment) {
			API.addReview({
				title: this.state.title,
				rating: this.state.rating,
				comment: this.state.comment,
			})
				.then(res => this.loadReviews())
				.catch(err => console.log(err));
		}
	};

	render() {
		return (
			<div className="card">
				<Row>
					<Col size="md-2">
						<img
							className="comment-pic"
							src="https://picsum.photos/160"
							alt="profile"
						/>
						<div className="text-center">User Name</div>
					</Col>
					<div className="col-md">
						<form>
							<div className="form-group">
								<label for="title">Post Title:</label>
								<input
									type="text"
									className="form-control"
									id="title"
									placeholder="Title (Required)"
									value={this.state.title}
									onChange={this.handleInputChange}
								/>
							</div>
							<div className="form-group">
								<label for="rating">Rating:</label>
								<select
									className="form-control"
									id="rating"
									value={this.state.rating}
									onChange={this.handleInputChange}
								>
									<option>1</option>
									<option>2</option>
									<option>3</option>
									<option>4</option>
									<option>5</option>
									<option>6</option>
									<option>7</option>
									<option>8</option>
									<option>9</option>
									<option>10</option>
								</select>
							</div>
							<div className="form-group">
								<label for="comment">Comment:</label>
								<textarea
									className="form-control"
									id="comment"
									rows="3"
									placeholder="Comment (Required)"
									value={this.state.comment}
									onChange={this.handleInputChange}
								/>
							</div>
							<FormBtn
								disabled={!(this.state.author && this.state.title)}
								onClick={this.handleFormSubmit}
							>
								Submit Review
							</FormBtn>
						</form>
					</div>
				</Row>
			</div>
		);
	}
}
