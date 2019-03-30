import axios from "axios";

export default {
  // Gets all books
  queryRestaurants: function(query) {
    return axios.put("/api/query", query);
  },
  // Gets the book with the given id
  getfollowers: function(query) {
    return axios.get("/api/followers/", query);
  },
  // Deletes the book with the given id
  followUser : function(query) {
    return axios.post("/api/followers/", query);
  },
  // Saves a book to the database
  addRestaurant: function(restaurantData) {
    return axios.post("/api/restaurants", restaurantData);
  },
  getRestaurants: function(restaurantData) {
    return axios.get("/api/restaurants", restaurantData);
  },
  addReview: function(reviewData) {
    return axios.post("/api/reviews", reviewData);
  },
  getReviews: function(reviewData) {
    return axios.get("/api/reviews", reviewData);
  },
  deleteReview: function(reviewId) {
      return axios.delete("/api/reviews/"+ reviewId);
  },
  deleteRestaurant: function(restaurantID) {
    return axios.delete("/api/restaurants/"+ restaurantID);
  },
  updateReview: function(reviewOBJ) {
    return axios.put("/api/reviews/"+ reviewOBJ._id, reviewOBJ);
  },
  updateRestaurant: function(restaurantOBJ) {
    return axios.put("/api/restaurants/"+ restaurantOBJ._id, restaurantOBJ);
  },
  updateUser: function(userOBJ) {
    return axios.put("/api/restaurants/"+ userOBJ._id, userOBJ);
  }
};
