import React, { Component } from "react";
import PropTypes from "prop-types";
import { connect } from "react-redux";
import { getCurrentProfile } from "../../actions/profileActions";
import { Link } from "react-router-dom";
import { Col, Row, Container } from "../grid";
import { List, ListItem } from "../list";
import { findFollowers } from "../../utils/methods";

class Dashboard extends Component {
	constructor(props) {
		super(props);
		this.state = {
			switch: true,
			reviewFeed: [],
			yourReviews: [],
		};
		this.handleSwitch = this.handleSwitch.bind(this);
	}

	componentDidMount() {
		this.props.getCurrentProfile();
		// this.props.findFollowers({this.props.auth.user.id});
	}

	handleSwitch() {
		this.setState(state => ({
			switch: !state.switch,
		}));
	}

	render() {
		const { user } = this.props.auth;
		return (
			<Container>
				<div className="dashboard-bg">
					<div className="profile-header text-center">
						<Row>
							<Col size="md-12">
								<img
									className="profile-pic img-responsive m-3"
									src={user.profilePic || "https://picsum.photos/250/?random"}
									alt="Profile"
								/>
							</Col>
						</Row>
						<div className="row text-bg">
							<Col size="md-4">{this.props.numreviews || "# of Reviews"}</Col>
							<Col size="md-4">
								{this.props.numfollowers || "# of Followers"}
							</Col>
							<Col size="md-4">{this.props.numfollowing || "# Following"}</Col>
						</div>
						<div className="row text-bg">
							<hr className="m-2" />
						</div>
						<div className="row text-bg">
							<Col size="md-6">
								{this.state.switch ? (
									<button>Review Feed ▼</button>
								) : (
									<button onClick={this.handleSwitch}>Review Feed ▶</button>
								)}
							</Col>
							<Col size="md-6">
								{this.state.switch ? (
									<button onClick={this.handleSwitch}>Your Reviews ▶</button>
								) : (
									<button>Your Reviews ▼</button>
								)}
							</Col>
						</div>
					</div>
				</div>
				<Row>
					<Col size="md-12">
						{/* Need to populate list here. Review Feed(findFollowing?) in the second arg, the user's reviews(getReviews?) in the third. */}
						{this.state.switch ? (
							<List>
								<ListItem key={user.name}>
									<strong>{user.name + "'s Review Feed"}</strong>
								</ListItem>
							</List>
						) : (
							// 	<List>
							// 		{this.state.books.map(book => (
							// 			<ListItem key={book._id}>
							// 				<Link to={"/books/" + book._id}>
							// 					<strong>
							// 						{book.title} by {book.author}
							// 					</strong>
							// 				</Link>
							// 			</ListItem>
							// 		))}
							// 	</List>
							<List>
								<ListItem key={user.name}>
									<strong>{user.name + "'s Reviews"}</strong>
								</ListItem>
							</List>
						)}
					</Col>
				</Row>
			</Container>
		);
	}
}

Dashboard.propTypes = {
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
)(Dashboard);
