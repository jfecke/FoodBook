import React, { Component } from "react";
import RestaurantCard from "../cards/RestaurantCard";
import ReviewCard from "../cards/ReviewCard";
import "../search/styles.css";
import CommentForm from "../comments/CommentForm";
import API from "../../utils/API";
import { Row, Col, Container } from "../grid/index";

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
		var temp = { id: this.props.location.state.yelpId };
		API.searchId(temp).then(res =>
			this.setState({
				restaurant: res.data,
				category: res.data.categories[0].title,
				address: res.data.location.display_address,
			})
		);
	}

	getReviews = () => {
		const { user } = this.props.auth;
		API.getReviews({ UserId: user.id })
			.then(reviews => {
				console.log(reviews.data);
				this.setState({
					numReviews: reviews.data.length,
					yourReviews: reviews.data,
				});
			})
			.catch(error => console.log(error));
	};

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
									key={yourReview._id}
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

export default Restaurants;
