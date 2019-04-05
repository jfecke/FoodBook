import React, { Component } from "react";
import { Col, Row } from "../grid";
import API from "../../utils/API";
import { FormBtn } from "../Form/index";
import { getCurrentProfile } from "../../actions/profileActions";
import PropTypes from "prop-types";
import { connect } from "react-redux";

class CommentForm extends Component {
	constructor(props) {
		super(props);
		this.state = {
			// YelpId: "",
			rating: 0,
			comment: "",
		};
		this.handleInputChange = this.handleInputChange.bind(this);
	}

	componentDidMount() {
		this.props.getCurrentProfile();
		this.loadReviews();
	}

	loadReviews = () => {
		API.getReviews()
			.then(res =>
				this.setState({ reviews: res.data, rating: "", comment: "" })
			)
			.catch(err => console.log(err));
	};

	handleInputChange(event) {
		return function(e) {
			var state = {};
			state[event] = e.target.value;
			this.setState(state);
		}.bind(this);
	}

	handleFormSubmit = event => {
		event.preventDefault();
		if (this.state.comment) {
			API.addReview({
				UserId: this.props.auth.user.id,
				// YelpId: this.state.YelpId
				rating: this.state.rating,
				comment: this.state.comment,
			})
				.then(res => this.loadReviews())
				.catch(err => console.log(err));
		}
	};

	render() {
		const { user } = this.props.auth;
		return (
			<div className="card">
				<Row>
					<Col size="md-2">
						<img className="comment-pic" src={user.profilePic} alt="profile" />
						<div className="text-center">{user.name}</div>
					</Col>
					<div className="col-md">
						<form>
							<div className="form-group">
								<label for="rating">Rating:</label>
								<select
									className="form-control"
									id="rating"
									value={this.state.rating}
									onChange={this.handleInputChange("rating")}
								>
									<option>0</option>
									<option>0.5</option>
									<option>1</option>
									<option>1.5</option>
									<option>2</option>
									<option>2.5</option>
									<option>3</option>
									<option>3.5</option>
									<option>4</option>
									<option>4.5</option>
									<option>5</option>
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
									onChange={this.handleInputChange("comment")}
								/>
							</div>
							<FormBtn
								disabled={!this.state.comment}
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
CommentForm.propTypes = {
	getCurrentProfile: PropTypes.func.isRequired,
	auth: PropTypes.object.isRequired,
	profile: PropTypes.object.isRequired,
};
const mapStateToProps = state => ({
	profile: state.profile,
	auth: state.auth,
});

export default connect(
	mapStateToProps,
	{ getCurrentProfile }
)(CommentForm);
