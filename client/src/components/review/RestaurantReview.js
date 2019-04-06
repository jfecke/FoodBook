import React, { Component } from "react";
import RestaurantCard from "../cards/RestaurantCard";
import "../search/styles.css";
import CommentForm from "../comments/CommentForm";
import { List, ListItem } from "../comments/CommentCard";
import API from "../../utils/API";

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
		};
	}
	componentDidMount() {
		var temp = { id: this.props.location.state.yelpId };
		API.searchId(temp).then(res => this.setState({ restaurant: res.data }));
	}

	getReviews = () => {
		API.getReviews({ YelpId: this.props.location.state.yelpId }).then(
			reviews => {
				console.log(reviews);
			}
		);
	};
	loadReviews = () => {
		API.getReviews()
			.then(res =>
				this.setState({ reviews: res.data, rating: "", comment: "" })
			)
			.catch(err => console.log(err));
	};

	render() {
		const passProp = this.props.location.state.yelpId;

		return (
			<div>
				<form className="d-flex flex-column" style={{ width: 100 + "%" }}>
					<h1>Add New Review</h1>
					<div className="d-flex flex-row" style={{ flex: 1 }} />
				</form>
				<div className="container">
					<div className="row">
						{this.state.restaurant.length ? (
							<div className="col-md-12">
								{this.state.restaurant.map(restaurant => {
									return (
										<RestaurantCard
											key={restaurant.id}
											id={restaurant.id}
											name={restaurant.name}
											link={restaurant.url}
											image={restaurant.image_url}
											rating={restaurant.rating}
											location={restaurant.coordinates}
											price={restaurant.price}
											address={restaurant.location.display_address}
											phone={restaurant.display_phone}
											distance={restaurant.distance}
											category={restaurant.categories[0].title}
										/>
									);
								})}
							</div>
						) : (
							<div className="col-md-12">No data found.</div>
						)}

						<CommentForm passProp={passProp} />

						<List>
							<ListItem> Test </ListItem>
						</List>
					</div>
				</div>
			</div>
		);
	}
}

export default Restaurants;
