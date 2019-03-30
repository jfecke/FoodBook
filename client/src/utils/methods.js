import { STATES } from "mongoose";
import API from "../utils/API";

function queryRestaurants() {
    let query = {
        term: "restaurant" + this.state.searchTerm,
        categories: this.state.categories,
        location: this.state.location,
        limit: "50"
    };
    API.queryRestaurants(query)
      .then(results => this.setState({ restaurants: results.data }))
      .catch(error => console.log(error));
};

function findFollowers() {
    let query = {
        FollowingId: this.state.myUserID
    }
    API.findFollowers(query)
    .then(results => {
        let numfollowers = 0;
        for (let i in results.data) {
            numfollowers++
        }        
        this.setState({
            followers: results.data,
            numfollowers: numfollowers
        })})
    .catch(error => console.log(error));
};

function findFollowing() {
    let query = {
        FollowerID: this.state.myUserID
    }
    API.findFollowing(query)
    .then(results => {
        let numfollowing = 0;
        for (let i in results.data) {
            numfollowing++
        }        
        this.setState({
            followers: results.data,
            numfollowing: numfollowing
        })})
    .catch(error => console.log(error));
};

function followUser() {
    let followObj = {
        FollowerID: this.state.myUserID,
        FollowingID: this.state.followingID
    }
    API.findFollowers({
        FollowerID: followObj.FollowerID,
        FollowingID: followObj.FollowerID
        })
        .then(results => {
            if (results.data.length == 0) {
                API.followUser({followObj})
                .then(resultObj => {
                    console.log(resultObj);
                })
            }     
        })
    .catch(error => console.log(error));
};

function getReviews() {
    API.getReviews({YelpId: this.state.yelpid}).then(reviews => {
        console.log(reviews);
    });
};

function addReview() {
    let reviewOBJ = {
        YelpId: this.state.yelpid,
        UserId: this.state.myUserID,
        review: this.state.myReview
    };
    API.getReviews({YelpId: reviewOBJ.YelpId, UserId: reviewOBJ.UserId}).then(results => {
        if (results.data.length < 1) {
            API.addReview(reviewOBJ).then(resultObj => {
                console.log(resultObj);
            });
        };
    });
};

function deleteReview() {
    API.getReviews({YelpId: this.state.yelpid, UserId: this.state.myUserID}).then(results => {
        if (results.data.length > 0) {
            API.deleteReview(results.data[0]._id).then(resultOBJ => {
                console.log(results.data);
            });
        };
    });
};

function addRestaurant() {
    let restaurantOBJ = {
        yelpid: this.state.yelpid,
        name: this.state.name,
        imageurl: this.state.imageurl,
        url: this.state.url,
        yelprating: this.state.yelprating,
        latitude: this.state.latitude,
        longitude: this.state.longitude,
        price: this.state.price,
        address: this.state.address,
        phonenumber: this.state.phonenumber,
        link: this.state.link
    };
    API.getRestaraunts({yelpid: this.state.yelpid}).then(results => {
        if (results.data.length < 1) {
            API.addRestaurant(restaurantOBJ).then(resultObj => {
                console.log(resultObj);
            });
        };
    });
};

function deleteRestaurant() {
    API.getRestaraunts({YelpId: this.state.yelpid}).then(results => {
        if (results.data.length > 0) {
            API.deleteRestaurant(results.data[0]._id).then(resultOBJ => {
                console.log(results.data);
            });
        };
    });
}