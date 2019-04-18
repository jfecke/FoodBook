import React from "react";
import StarRatings from "react-star-ratings";

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
				<h5>Restaurant: {props.name}</h5>
				<h5>
					Rating:
					<StarRatings
						rating={props.rating}
						starRatedColor="black"
						numberOfStars={5}
						name="rating"
						starDimension="15px"
						starSpacing="2px"
						title="Rating: "
					/>
				</h5>
				{/* <h5>Rating: {props.rating}</h5> */}
				<h5>Review: {props.review}</h5>
				<h5>Review By: {props.displayname + "  (" +  props.username + ")"}</h5>
				<h5>{props.reviews}</h5>
				<h5>{props.yourReviews}</h5>
				<div className={props.myClass} onClick={props.deletebtn} reviewid={props.reviewid}>X</div>
			</div>
		</div>
	);
};

export default ReviewCard;
