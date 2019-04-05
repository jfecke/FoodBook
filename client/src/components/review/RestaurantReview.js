import React, { Component } from "react";
import RestaurantCard from "../cards/RestaurantCard";
import "../search/styles.css";
import CommentForm from "../comments/CommentForm";
import { List, ListItem } from "../comments/CommentCard";
import API from "../../utils/API";

class Restaurants extends Component {
	getReviews = () => {
		API.getReviews({ YelpId: this.state.yelpid }).then(reviews => {
			console.log(reviews);
		});
	};

	render() {
		return (
			<div>
				<form className="d-flex flex-column" style={{ width: 100 + "%" }}>
					<h1>Add New Review</h1>
					<div className="d-flex flex-row" style={{ flex: 1 }} />
				</form>
				<div className="container">
					<div className="row">
						<div className="col-md-12">
							<RestaurantCard />
							<CommentForm />
							<List>
								
							</List>
						</div>
					</div>
				</div>
			</div>
		);
	}
}

export default Restaurants;
