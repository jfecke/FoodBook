import React, { Component } from 'react';
import RestaurantCard from '../cards/RestaurantCard';
import { FormBtn, Input, AutoCompBox, AutoCompItem } from './Search';
import './styles.css';
import API from "../../utils/API"
// localhost:3000/search

class Restaurants extends Component {
  state = {
    restaurants: [],
    searchObj: {},
    searchVal: "",
    stateVal: "",
    cityVal: "",
    locationVal: {},
    
  }

  handleFormSubmit= event =>{
    event.preventDefault();
    let location = this.state.cityVal + ", "+ this.state.stateVal;
    let query = {
      term : this.state.searchVal,
      location : location,
      categories: "restaurants",
    }
    console.log(query)
    API.queryRestaurants(query).then( res => {
      console.log(res.data)
      this.setState({restaurants: res.data})
      console.log(this.state.restaurants)
    })
    
    
  }
  
  handleInputChange = event => {
    //console.log(event.target)
    const { name, value } = event.target;
    this.setState({
      [name]: value
    });
    console.log(this.state.searchVal)
  };

  // takes state and city value and geocodes it to lat long
  handleGeocode = event =>{
    this.handleInputChange(event)
    // let response;
    API.geocode(this.cityVal + this.stateVal).then((res) =>{
      this.setState({
        locationVal: res.data
      })
    })
    // console.log(this.state.locationVal)
    
  }

  handleAutocomp = event =>{
    this.handleInputChange(event)

    if(this.state.searchVal.length > 2){API.autocomplete(
      {
        text : this.state.searchVal,
        lat: this.state.locationVal.lat,
        lng: this.state.locationVal.lng
      }).then(res => {
      console.log(res.data)
      this.setState({
        searchObj : {
          categories : res.data.categories,
          businesses : res.data.businesses,
          terms : res.data.terms
        }

      })
    })} else { this.setState({ searchObj : {} })}
  }

 handleTextComplete = event =>{
  console.log(event.target)
   //this.setState({searchVal: event.target})
 }

  render() {

    return (
      <div>
        <form className="d-flex flex-column" style={{ width: 100 + '%' }}>
          <h1>Restaurants</h1>
          <div className="d-flex flex-row" style={{ flex: 1 }}>

            <div className="d-flex flex-row" style={{ flex: 1, width: 100 + '%' }} >
              <Input id="city" className="d-flex flex-row" style={{ flex: 1, width: 100 + '%' }}
                // value={this.state.query}
                // onChange={this.handleInputChange}
                name="cityVal"
                placeholder="City"
                value={this.state.cityVal}
                onChange={this.handleInputChange }

              />
              <Input id="state" className="d-flex flex-row" style={{ flex: 1, width: 100 + '%' }}
                // value={this.state.query}
                // onChange={this.handleInputChange}
                name="stateVal"
                disabled= {!this.state.cityVal}
                placeholder="State"
                value={this.state.stateVal}
                onChange={this.handleGeocode}
              />
              </div>
              <Input className="d-flex flex-row" style={{ flex: 1, width: 100 + '%' }}
                value={this.state.searchVal}
                onChange={this.handleInputChange}
              name="searchVal"
              placeholder="Search for restuarants, bars..."
              disabled = {!this.state.stateVal || !this.state.cityVal}
            />
              <FormBtn className="d-flex flex-row justify-content-end search-btn" style={{ flex: 1, float: 'right', padding: 5 }}
              disabled={!this.state.searchVal}
              onClick={this.handleFormSubmit}
            >
            
            </FormBtn>
          </div>
          {/* <AutoCompBox
            terms = {this.state.searchObj}
            textComp = {this.handleTextComplete}
          >	
            {this.state.searchObj.terms}	
            <AutoCompItem/>
          </AutoCompBox> */}
        </form>
        <div className="container">
          <div className="row">
            <div className="col-md-2">Sidebar filter searches, navigate to other pages..something
        </div>
        {this.state.restaurants.length ? (            
            <div className="col-md-6">
                {this.state.restaurants.map((restaurant,index) => {
                  return(
                  <RestaurantCard 
                    key = {restaurant.id}
                    id = {restaurant.id}
                    name = {restaurant.name}
                    link ={restaurant.url}
                    image = {restaurant.image_url}
                    rating ={restaurant.rating}
                    location ={restaurant.coordinates}
                    price ={restaurant.price}
                    address ={restaurant.location.display_address}
                    phone ={restaurant.display_phone}
                    distance ={restaurant.distance}
                    idx = {index}
                    category = {restaurant.categories[0].title}
                  />
                  )
                })}

            </div>
            
            ): <div className="col-md-6"/>}

            <div className="col-md-4">Google Map?
        </div>
          </div>
        </div>
      </div>
    )
  }
}

export default Restaurants;
