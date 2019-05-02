import React, { Component } from "react";
import RestaurantCard from "../components/cards/RestaurantCard";
import ReviewCard from "../components/cards/ReviewCard";
import "./styles.css";
import CommentForm from "../components/comments/CommentForm";
import API from "../utils/API";
import { Row, Col, Container } from "../components/grid/index";
import { getCurrentProfile } from "../actions/profileActions";
import PropTypes from "prop-types";
import { connect } from "react-redux";
import EditForm from "../components/comments/EditForm";
import { FormBtn } from "../components/Form/index";

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
			thisReview: {},
			modalState: "hide-modal",
			editContentClass: "modal-content-edit d-none",
			deleteContentClass: "modal-content-delete d-none"
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
				address: res.data.location.display_address
			})
		});
	}

	getReviews = () => {
		API.getReviews({ YelpId: this.props.location.state.yelpId })
			.then(reviews => {
				for (let i in reviews.data) {
					if (reviews.data[i].UserId === this.props.auth.user.id) {
						reviews.data[i]["className"] = "deletebtn"
						reviews.data[i]["editClass"] = "editbtn"
						
					} else {
						reviews.data[i]["className"] = "d-none"
						reviews.data[i]["editClass"] = "d-none"
					}
				}
				this.setState({
					numReviews: reviews.data.length,
					yourReviews: reviews.data
				});
				
			})
			.catch(error => console.log(error));
	};

	deleteReview = event => {
		event.preventDefault();
		let reviewID = event.target.getAttribute("reviewid")
    this.setState({
      deleteContentClass: "modal-content-delete showContent",
      modalState: "show-modal",
      reviewID: reviewID
    })
	}

	confirmDelete = (event) => {
		event.preventDefault();
		API.deleteReview(this.state.reviewID).then(() => {
				this.setState({
			yourReviews: [],
			modalState: "hide-modal",
			editContentClass: "modal-content-edit d-none",
			deleteContentClass: "modal-content-delete d-none"
		});
				this.getReviews();
			});
	}

	editReview = event => {
		event.preventDefault();
		let reviewID = event.target.getAttribute("reviewid");
		API.getReviews({_id: reviewID}).then(review => {
			this.setState({
				thisReview: review.data[0],
        modalState: "show-modal",
        editContentClass: "modal-content-edit showContent"
			})
		});
  }
  
  closeModal = (event) => {
    if (typeof(event) !== "undefined") {
      event.preventDefault();
    }
    this.setState({
      modalState: "hide-modal",
      editContentClass: "modal-content-edit d-none",
      deleteContentClass: "modal-content-delete d-none"
    })
    this.getReviews();
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
							<CommentForm
							restaurantName = {this.state.restaurant.name}
							passProp={passProp} />
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
									displayname = {yourReview.displayname}
									rating={yourReview.rating}
									review={yourReview.review}
									myClass={yourReview.className}
									deletebtn={this.deleteReview}
									reviewid={yourReview._id}
									editClass={yourReview.editClass}
									editreview={this.editReview}
								/>
							))}
						</Col>
					</Row>
				</Container>
				<div id="modal" className={this.state.modalState}>
          <div id="dashboardmodel" className={this.state.editContentClass}>
            <Col size="md-12">
              <h3>{this.state.thisReview.restaurantname}</h3>
							<EditForm
							review = {this.state.thisReview}
							closeModal={this.closeModal}
							refreshFunction={this.getReviews}
							 />
						</Col>
          </div>
          <div id="verifydelete" className={this.state.deleteContentClass}>
          <h3>Delete Review?</h3>
          <br/>
          <div className="btngroup">
					<FormBtn
						onClick={this.confirmDelete}
						className="btn btn-success btn-left"
					>
						Delete
					</FormBtn>
					<FormBtn
						onClick={this.closeModal}
						className="btn btn-danger btn-right"
					>
						Cancel
					</FormBtn>
				</div>
          </div>
        </div>
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


