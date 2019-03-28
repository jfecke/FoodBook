function queryRestaurants() {
    let query = {
        term: "restaurant",
        categories: "bbq",
        location: "austin, tx",
        limit: "50"
    };
    API.queryRestaurants(query)
      .then(results => this.setState({ restaurants: results.data }))
      .catch(error => console.log(error));
};

function findFollowers() {
    let query = {
        FollowingId: UserID
    }
    API.findFollowers(query)
    .then(results => {
        let numfollowers = 0;
        for (let i in results.data) {
            numfollowers++
        }        
        this.setState({
            followers: results.data,
            numfollowers: numfollowers
        })})
    .catch(error => console.log(error));
};

function findFollowing() {
    let query = {
        FollowerID: UserID
    }
    API.findFollowing(query)
    .then(results => {
        let numfollowing = 0;
        for (let i in results.data) {
            numfollowing++
        }        
        this.setState({
            followers: results.data,
            numfollowing: numfollowing
        })})
    .catch(error => console.log(error));
};

function followUser() {
    let followObj = {
        FollowerID: myUserID,
        FollowingID: followingID
    }
    API.findFollowers({FollowerID: followObj.FollowerID})
        .then(results => {
            let alreadyFollowing = false;
            for (let i in results.data) {
                if (results.data[i] === followObj.followingID) {
                    alreadyFollowing = true;
                }
            }
            if ( alreadyFollowing === false) {
                API.followUser({followObj})
                    .then(resultObj => {
                        console.log(resultObj);
                    })
            }        
        })
    .catch(error => console.log(error));
};