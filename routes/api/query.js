const router = require("express").Router();
const API = require("../utils/API");

router.route("/").put(function(req, res) {
    API.search(req.body).then((results) => {
        console.log("TESTING AGAIN")
        res.json("results")
    })
    .catch(error => {console.log("query error", error)});

});

module.exports = router;

// {
//     "category": "restaurants",
//     "location": "austin, tx"
// }