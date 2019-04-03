import React, { Component } from "react";
import ProfileCard from "../cards/ProfileCard";
import { FormBtn, Input } from "./Search";
import API from "../../utils/API"
import "./styles.css";

// localhost:3000/search

class Restaurants extends Component {
  constructor () {
    super();
    this.state = {
      query: "",
      users: []
    };
    this.findReviews = this.findReviews.bind(this);
    this.handleClick = this.handleClick.bind(this);
    this.findFollowers = this.findFollowers.bind(this);
  }


  handleInputChange = event => {
    const { name, value } = event.target;
    this.setState({
      [name]: value
    });
  };

  handleClick = (event) => {
    event.preventDefault();
    API.getUsers({name: {$regex: "/"+this.state.query+"/" }}).then(results => {
      this.findFollowers(results.data);
    })
  };

  findFollowers = (results) => {
    let userdata = results.map((user) => {
      return new Promise(function(res) { 
          API.getfollowers({
            FollowingId: user._id
          }).then(function(resultsOBJ) {
            let numfollowers = 0;
            for (let i in resultsOBJ.data) {
              numfollowers++
            }
            user["followers"] = numfollowers;
            res( user )
          });
      })
  })
    Promise.all(userdata).then(alldata => {
      //console.log(this.state.query);
      this.findReviews(alldata);
    })
  }

  findReviews = (results) =>  {
    let userdata = results.map((user) => {
      return new Promise(function(res) { 
          API.getReviews({
            UserId: user._id
          }).then(function(resultsOBJ) {
            console.log(resultsOBJ.data)
            let numReviews = resultsOBJ.data.length;
            user["reviews"] = numReviews;
            res(user)
          });
      })
  })
    Promise.all(userdata).then(alldata => {
      this.setState({users: alldata});
    })
  }

  handleFollow = event => {
    event.preventDefault();
    console.log(event.target)
  }

 

  render() {
    return (
      <div>
        <form className="d-flex flex-column" style={{ width: 100 + "%" }}>
          <h1>Foodies</h1>
          <div className="d-flex flex-row" style={{ flex: 1 }}>
            <Input
              className="d-flex flex-row"
              style={{ flex: 1, width: 100 + "%" }}
              value={this.state.query}
              onChange={this.handleInputChange}
              name="query"
              placeholder="Search for users..."
            />
            <FormBtn
              className="d-flex flex-row justify-content-end search-btn"
              style={{ flex: 1, float: "right", padding: 5 }}
              // disabled={!this.state.query}
              onClick={this.handleClick}
            />
          </div>
        </form>
           {this.state.users.map(user => (
                <ProfileCard
                  id={user._id}
                  imageurl={user.profilePic}
                  name={user.name}
                  key={user._id}
                  followers={user.followers}
                  reviews={user.reviews}
                  follow={this.handleFollow}
                  location={user.city + ", "+user.stateName}>

                </ProfileCard>
              ))}
      </div>
    );
  }
}

export default Restaurants;
