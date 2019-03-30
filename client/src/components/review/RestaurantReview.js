import React, { Component } from "react";
import RestaurantCard from "../cards/RestaurantCard";
import "../search/styles.css";
import CommentForm from "../comments/CommentForm";

// localhost:3000/search

class Restaurants extends Component {
	render() {
		return (
			<div>
				<form className="d-flex flex-column" style={{ width: 100 + "%" }}>
					<h1>Add New Review</h1>
					<div className="d-flex flex-row" style={{ flex: 1 }} />
				</form>
				<div className="container">
					<div className="row">
						{/* <div className="col-md-2">Sidebar filter searches, navigate to other pages..something
        </div> */}
						<div className="col-md-12">
							<RestaurantCard />
							<CommentForm />
						</div>
						{/* <div className="col-md-4">Google Map?
        </div> */}
					</div>
				</div>
			</div>
		);
	}
}

export default Restaurants;
