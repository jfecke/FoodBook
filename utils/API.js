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
  getRestaraunt: function() {
    return axios.get("/api/restaurants", restaurantData);
  },
  addReview: function(reviewData) {
    return axios.post("/api/reviews", reviewData);
  },
  getReviews: function(reviewData) {
    return axios.get("/api/reviews", reviewData);
  }
};
