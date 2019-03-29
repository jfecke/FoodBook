import React, { Component } from "react";
import RestaurantCard from "../cards/RestaurantCard";
import { FormBtn, Input } from "./Search";
import "./styles.css";

// localhost:3000/search

class Restaurants extends Component {
  render() {
    return (
      <div>
        <form className="d-flex flex-column" style={{ width: 100 + "%" }}>
          <h1>Restaurants</h1>
          <div className="d-flex flex-row" style={{ flex: 1 }}>
            <Input
              className="d-flex flex-row"
              style={{ flex: 1, width: 100 + "%" }}
              // value={this.state.query}
              // onChange={this.handleInputChange}
              name="query"
              placeholder="Search for restuarants, bars..."
            />
            <FormBtn
              className="d-flex flex-row justify-content-end search-btn"
              style={{ flex: 1, float: "right", padding: 5 }}
              // disabled={!this.state.query}
              // onClick={this.handleFormSubmit}
            />
          </div>
        </form>

        <RestaurantCard />
        <RestaurantCard />
        <RestaurantCard />
        <RestaurantCard />
        <RestaurantCard />
        <RestaurantCard />
        <RestaurantCard />
        <RestaurantCard />
        <RestaurantCard />
        <RestaurantCard />
      </div>
    );
  }
}

export default Restaurants;
