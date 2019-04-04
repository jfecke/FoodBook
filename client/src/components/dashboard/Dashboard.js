import React, { Component } from "react";
import PropTypes from "prop-types";
import { connect } from "react-redux";
import { getCurrentProfile } from "../../actions/profileActions";
// import { Link } from "react-router-dom";
import { Col, Row, Container } from "../grid";
import API from "../../utils/API";
import { List, ListItem } from "../list";
// import { findFollowers, findFollowing } from "../../utils/methods";

class Dashboard extends Component {
  constructor(props) {
    super(props);
    this.state = {
      switch: true,
      reviewFeed: [],
      yourReviews: [],
      followers: [{}],
      numfollowing: "",
      numfollowers: "",
      rating: 0,
      comment: "",
      numReviews: ""
    };
    this.handleSwitch = this.handleSwitch.bind(this);
    this.findFollowers = this.findFollowers.bind(this);
    this.findFollowing = this.findFollowing.bind(this);
    // this.getReviews = this.getReviews.bind(this);
    // this.getReviewFeed = this.getReviewFeed.bind(this);
  }

  componentDidMount() {
    this.props.getCurrentProfile();
    this.findFollowers();
    this.findFollowing();
    // this.getReviews();
    // this.getReviewFeed();
  }

  // Find Followers
  findFollowers = () => {
    let query = {
      FollowingId: this.props.auth.user.id
    };
    API.getfollowers(query)
      .then(results => {
        let numfollowers = 0;
        for (let i in results.data) {
          numfollowers++;
          console.log(results.data);
        }
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
        let numfollowing = 0;
        for (let i in results.data) {
          numfollowing++;
          console.log(numfollowing);
        }
        this.setState({
          followers: results.data,
          numfollowing: numfollowing
        });
      })
      .catch(error => console.log(error));
  };

  //Get Reviews (not sure it works)
//   getReviews = () => {
//     let query = {
//       YelpId: this.state.yelpid
//     };
//     API.getReviews(query)
//       .then(results => {
//         let numReviews = 0;
//         for (let i in results.data) {
//           numReviews++;
//           console.log(numReviews);
//           console.log(results);
//         }
//         this.setState({
//           reviews: results.data,
//           numReviews: numReviews
//         });
//       })

//       .catch(err => console.log(err));
//   };

  // Get review feed (not sure if it works)
//   getReviewFeed = () => {
//     let query = {
//       FollowerID: this.props.auth.user.id
//     };
//     let following = [];
//     API.findFollowing(query).then(results => {
//       for (let i of results.data) {
//         following.push(i);
//       }
//       API.getReviews({ UserId: { $in: following } }).then(resultOBJ => {
//         if (resultOBJ.data.length < 1) {
//           console.log(resultOBJ.data);
//         }
//       });
//     });
//   };

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
                {this.state.numReviews}
              </Col>
              <Col size="md-4" value={this.state.numfollowers}>
                # of Followers {this.state.numfollowers}
              </Col>
              <Col size="md-4" value={this.state.numfollowing}>
                # Following {this.state.numfollowing}
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
