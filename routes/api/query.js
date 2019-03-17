const router = require("express").Router();
const API = require("../utils/API");
const restaurantController = require("../../controllers/restaurantsController");

router.route("/").put(function(req, res) {
    API.search(req.body)
    .then((response) => {
        const restaurants = response.jsonBody.businesses;
        let yelpids = [];
        for (let i in restaurants) {
            yelpids.push(restaurants[i].id)
        }
        restaurantController.queryAll({yelpids: yelpids})
        .then(function(results){
            let ids = [];
            let filtered = [];
            if (results.length>0) {
                for (let i in results) {
                    ids.push(results[i].yelpid);
                    filtered.push(results[i])
                };
                for (let i in restraunts) {
                    if (ids.indexOf(restraunts[i].id) < 0){
                        filtered.push(restraunts[i]);
                    }
                };
                res.send(filtered);
            }  else {
                res.send(restaurants);
            }         
        })
        .catch(error => console.log(error))
    })
    .catch(error => {console.log("query error", error)});

});

module.exports = router;

// {
//     "category": "restaurants",
//     "location": "austin, tx"
// }