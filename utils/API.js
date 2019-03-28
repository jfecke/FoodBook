import axios from "axios";

export default {
  // Gets all books
  queryRestaurants: function() {
    return axios.put("/api/query", query);
  },
  // Gets the book with the given id
  getfollowers: function() {
    return axios.get("/api/followers/");
  },
  // Deletes the book with the given id
  followUser : function() {
    return axios.post("/api/followers/");
  },
  // Saves a book to the database
  saveBook: function(bookData) {
    return axios.post("/api/books", bookData);
  }
};
