/*
FOR BUSINESS QUERIES : https://www.yelp.com/developers/documentation/v3/business_search
FOR REVIEW QUERIES : https://www.yelp.com/developers/documentation/v3/business_reviews
*/

const axios = require("axios");
require("dotenv").config()
const yelp = require('yelp-fusion');
const Api_Keys = {
    YelpKey: process.env.YelpAPI_KEY,
    MapsKey: process.env.MapsAPI_KEY,
    ClientID: process.env.YelpCLIENT_ID
}
const key = "hjzawpNl48mrUUwiJ0_8vXq2C5aEgwpmJrsmOOpxlLc1pNvJuJOAgkifVDdKc5lR1GNEK0U8L1ofpZxRnrBXypzCCcrCIR8M0Df73-uLZpv6i_uagjIY-dx9UVOIXHYx"
//Trouble getting the response to work with an ENV variable so this is what im using for now.""

const client = yelp.client(key);

module.exports = {
    Query : {
        category: 'Food',
        location: 'austin, tx'
    },
    search: function(query) {
        console.log("I QUERY THIS!!!", query)
        return client.search(query)
    },
    review: function(id){
        console.log("Finding Reviews for id: "+id)
        return client.reviews(id)
    },
    autocomp: function(input){
        
        return axios.get("https://api.yelp.com/v3/autocomplete?text="+input.text+"&latitude="+input.location.lat+"&longitude="+input.location.long,{ headers: { Authorization: "Bearer "+key} } )
    }
};




// const searchQuery = {
//     category: 'Food',
//     location: 'austin, tx'
// }

//change searchQuery to change results; business Id's for reviews stored in response.jsonBody.businesses[n].id
// client.search(searchQuery).then(response => {
//     const firstResult = response.jsonBody.businesses;
//     const prettyJson = JSON.stringify(firstResult, null, 4);
//     console.log(prettyJson);
// }).catch(e => {
//     console.log(e);
// })


