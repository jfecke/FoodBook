import React, { Component } from "react";
import PropTypes from "prop-types";
import { connect } from "react-redux";
import { getCurrentProfile } from "../../actions/profileActions";
import { Col, Row, Container } from "../grid";
import API from "../../utils/API";
import ReviewCard from "../cards/ReviewCard";
import { List, ListItem } from "../list";

class Dashboard extends Component {
  constructor(props) {
    super(props);
    this.state = {
      switch: true,
      reviews: [],
      yourReviews: [],
      followers: [{}],
      numfollowing: "",
      numfollowers: "",
      rating: 0,
      comment: "",
      numReviews: "", 
    };
    this.handleSwitch = this.handleSwitch.bind(this);
    this.findFollowers = this.findFollowers.bind(this);
    this.findFollowing = this.findFollowing.bind(this);
    this.getReviews = this.getReviews.bind(this);
    // this.getReviewFeed = this.getReviewFeed.bind(this);
  }

  componentDidMount() {
    this.props.getCurrentProfile();
    this.findFollowers();
    this.findFollowing();
    this.getReviewCount();
    this.getFeed();
    console.log(this.props.auth.user)
  }

  // Find Followers
  findFollowers = () => {
    let query = {
      FollowingId: this.props.auth.user.id
    };
    API.getfollowers(query)
      .then(results => {
        let numfollowers = results.data.length;
        this.setState({
          followers: results.data,
          numfollowers: numfollowers
        });
      })
      .catch(error => console.log(error));
  };

  // Find Following
  findFollowing = () => {
    let query = {
      FollowerId: this.props.auth.user.id
    };
    API.getfollowers(query)
      .then(results => {
        let numfollowing = results.data.length;
        this.setState({
          followers: results.data,
          numfollowing: numfollowing
        });
      })
      .catch(error => console.log(error));
  };

  // Get Reviews for User
  getReviews = () => {
    const { user } = this.props.auth;
    API.getReviews({UserId: user.id}).then(reviews => {
      for (let i in reviews.data) {
        reviews.data[i]["className"] = "d-none"
      };
      this.setState({
				yourReviews: reviews.data
			});
    })
    .catch(error => console.log(error));
  };
   
  getReviewCount = () => {
    const { user } = this.props.auth;
    API.getReviews({UserId: user.id}).then(reviews => {
      this.setState({
				numReviews: reviews.data.length
			});
    })
    .catch(error => console.log(error));
  };


  getFeed = () => {
    API.getfollowers({FollowerId: this.props.auth.user.id})
      .then(results => {
        let tempFollowers = [];
        for (let followOBJ of results.data) {
          tempFollowers.push(followOBJ.FollowingId)
        }
        this.findReviewsofFollowers(tempFollowers);
      })
      .catch(error => console.log(error));
  }

  findReviewsofFollowers = (followers) => {
    API.getReviews({UserId: {$in : followers}}).then(reviews => {
      for (let i in reviews.data) {
        reviews.data[i]["className"] = "d-none"
      };
      this.setState({
				yourReviews: reviews.data
			});
    })
  }


  handleSwitchToReviews = () => {
    this.handleSwitch();
    this.getReviews();
  }

  handleSwitchToFeed = () => {
    this.handleSwitch();
    this.getFeed();
  }

  handleSwitch() {
    this.setState(state => ({
      switch: !state.switch
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
              <Col size="md-4" value={this.state.numReviews}>
                # of Reviews  
                <strong> {this.state.numReviews}</strong>
              </Col>
              <Col size="md-4" value={this.state.numfollowers}>
                # of Followers <strong>{this.state.numfollowers}</strong>
              </Col>
              <Col size="md-4" value={this.state.numfollowing}>
                # Following <strong>{this.state.numfollowing}</strong>
              </Col>
            </div>
            <div className="row text-bg">
              <hr className="m-2" />
            </div>
            <div className="row text-bg">
              <Col size="md-6">
                {this.state.switch ? (
                  <button>Review Feed ▼</button>
                ) : (
                  <button onClick={this.handleSwitchToFeed}>Review Feed ▶</button>
                )}
              </Col>
              <Col size="md-6" value={this.state.numfollowing}>
                {this.state.switch ? (
                  <button onClick={this.handleSwitchToReviews}>Your Reviews ▶</button>
                ) : (
                  <button>Your Reviews ▼</button>
                )}
              </Col>
            </div>
          </div>
        </div>
        <Row>
          <Col size ="md-12">
            {/* Need to populate list here. Review Feed(findFollowing?) in the second arg, the user's reviews(getReviews?) in the third. */}
            {this.state.switch ? (
              <List>
                <ListItem key={user.username}>
                  <strong>{user.displayname + "'s Review Feed"}</strong>
                </ListItem>
              </List>
            ) : (
              <List>
                <ListItem key={user.username}>
                  <strong>{user.displayname + "'s Reviews"}</strong>
                  
                </ListItem>
               
              </List>
            )}
          </Col>
        </Row>
        {this.state.yourReviews.map(yourReview => (
              		<ReviewCard
                  id={yourReview.UserId}
                  name={yourReview.restaurantname}
                  key={yourReview._id}
                  rating={yourReview.rating}
                  review={yourReview.review}
                  username={yourReview.username}
                  displayname={yourReview.displayname}
                  myClass={yourReview.className}
                  />
              		))}
      </Container>
    );
  }
}

Dashboard.propTypes = {
  getCurrentProfile: PropTypes.func.isRequired,
  auth: PropTypes.object.isRequired,
  profile: PropTypes.object.isRequired
};

const mapStateToProps = state => ({
  profile: state.profile,
  auth: state.auth
});

export default connect(
  mapStateToProps,
  { getCurrentProfile }
)(Dashboard);
