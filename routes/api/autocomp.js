const router = require("express").Router();
const API = require("../utils/API");


//CURRENT FUNCTION just returns YELP data to use to autocomplete 
router.route("/").post(function(req, res) {
    console.log("its working!!!!")
    console.log(req.body)
    API.autocomp(req.body)
        .then((results) => {
            console.log(results.data)
            res.send(results.data)
        }).catch( err => console.log(err))
});

module.exports = router;