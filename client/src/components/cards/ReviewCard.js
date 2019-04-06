import React from "react";
import "../search/styles.css";
//import ph from "../../img/ph.png";

const ReviewCard = props => {
	// id={review.UserId}
	//               name={review.name}
	//               key={review.YelpId}
	//               rating={review.rating}
	//               reviews={review.reviews}
	return (
		<div className="card d-flex flex-row">
			<div className="rating">
				<h5>Restaurant: {props.id}</h5>
				<h5>Rating: {props.rating}</h5>
				<h5>Review: {props.review}</h5>
				<h5>{props.key}</h5>
				<h5>{props.name}</h5>
				<h5>{props.reviews}</h5>
				<h5>{props.yourReviews}</h5>
			</div>
		</div>
	);
};

export default ReviewCard;
