import React, { Component } from "react";
import RestaurantCard from "../cards/RestaurantCard";
import ReviewCard from "../cards/ReviewCard";
import "../search/styles.css";
import CommentForm from "../comments/CommentForm";
import API from "../../utils/API";
import { Row, Col, Container } from "../grid/index";
import { getCurrentProfile } from "../../actions/profileActions";
import PropTypes from "prop-types";
import { connect } from "react-redux";

class Restaurants extends Component {
	constructor(props) {
		super(props);
		this.state = {
			rating: 0,
			comment: "",
			restaurant: {},
			searchObj: {},
			searchVal: "",
			stateVal: "",
			cityVal: "",
			locationVal: {},
			yelpId: "",
			reviews: [],
			yourReviews: [],
		};
		this.getReviews = this.getReviews.bind(this);
	}
	componentDidMount() {
		this.props.getCurrentProfile();
		var temp = { id: this.props.location.state.yelpId };
		API.searchId(temp).then(res => {
			this.getReviews();
			this.setState({
				restaurant: res.data,
				category: res.data.categories[0].title,
				address: res.data.location.display_address,
			})
			}
		);
	}

	getReviews = () => {
		const { user } = this.props.auth;
		API.getReviews({ UserId: user.id })
			.then(reviews => {
				this.getUserNames(reviews.data);
				
			})
			.catch(error => console.log(error));
	};

	getUserNames = (reviews) => {
		let restaurantreviews = reviews.map((review) => {
			return new Promise(function(res) { 
				API.getUsers({
				  _id: review.UserId
				}).then(function(resultsOBJ) {
					review["username"] = resultsOBJ.data[0].name;
				  	res(review)
				});
			})
		})
		  Promise.all(restaurantreviews).then(alldata => {
			this.setState({
				numReviews: alldata.length,
				yourReviews: alldata,
			});
		  })
	}


	render() {
		const passProp = this.props.location.state.yelpId;
		const restaurant = this.state.restaurant;
		return (
			<div>
				<form className="d-flex flex-column" style={{ width: 100 + "%" }}>
					<h1>Add New Review</h1>
					<div className="d-flex flex-row" style={{ flex: 1 }} />
				</form>
				<Container>
					<Row>
						<Col size="md-12">
							<RestaurantCard
								key={restaurant.id}
								id={restaurant.id}
								name={restaurant.name}
								link={restaurant.url}
								image={restaurant.image_url}
								rating={restaurant.rating}
								location={restaurant.coordinates}
								price={restaurant.price}
								address={this.state.address}
								phone={restaurant.display_phone}
								distance={restaurant.distance}
								category={this.state.category}
							/>
						</Col>
					</Row>
					<Row>
						<Col size="md-12">
							<CommentForm passProp={passProp} />
						</Col>
					</Row>
					<Row>
						<Col size="md-12">
							{this.state.yourReviews.map(yourReview => (
								<ReviewCard
									id={yourReview.UserId}
									name={restaurant.name}
									key={yourReview._id}
									username = {yourReview.username}
									rating={yourReview.rating}
									review={yourReview.review}
								/>
							))}
						</Col>
					</Row>
				</Container>
			</div>
		);
	}
}

Restaurants.propTypes = {
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
)(Restaurants);


