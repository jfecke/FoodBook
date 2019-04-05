const router = require("express").Router();
const API = require("../utils/API");


//CURRENT FUNCTION just returns YELP data to use to autocomplete 
router.route("/").put(function(req, res) {
    console.log("its working!!!!")
    console.log(req.body.id)
    API.searchById(req.body)
        .then((results) => {
            console.log(results.data)
            res.send(results.data)
        }).catch( err => console.log(err))
});

module.exports = router;