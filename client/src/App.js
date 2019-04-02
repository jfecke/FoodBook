import React, { Component } from "react";
import { BrowserRouter as Router, Route, Switch } from "react-router-dom";
import { Provider } from "react-redux";
import jwt_decode from "jwt-decode";
import setAuthToken from "./utils/setAuthToken";
import { setCurrentUser, logoutUser } from "./actions/authActions";
import store from "./store";

import Navbar from "./components/layout/Navbar";
import Footer from "./components/layout/Footer";
import Landing from "./components/layout/Landing";
import Register from "./components/auth/Register";
import Login from "./components/auth/Login";
import Dashboard from "./components/dashboard/Dashboard";

import { clearCurrentProfile } from "./actions/profileActions";
import PrivateRoute from "./components/common/PrivateRoute";
import Restaurants from "./components/search/Restaurants";
import Profiles from "./components/profiles/Profiles";
import NoMatch from "./components/nomatch/NoMatch";

// Change for simpler routing
import RestaurantReview from "./components/review/RestaurantReview.js";
import FollowReview from "./components/review/FollowReview";
import UserReview from "./components/review/UserReview";
import CommentForm from "./components/comments/CommentForm";
import CommentCard from "./components/comments/CommentCard";

// import CreateProfile from "./components/create-profile/CreateProfile";

import "./App.css";

// Check for token
if (localStorage.jwtToken) {
	// Set auth token header auth
	setAuthToken(localStorage.jwtToken);
	// Decode token, get User info and expiration
	const decoded = jwt_decode(localStorage.jwtToken);
	// Set User and isAuthenticated
	store.dispatch(setCurrentUser(decoded));
	// Check for expired token
	const currentTime = Date.now() / 1000;
	if (decoded.exp < currentTime) {
		// Logout User
		store.dispatch(logoutUser());
		// Clear current profile
		store.dispatch(clearCurrentProfile());
		// Redirect to Login
		window.location.href = "/login";
	}
}

class App extends Component {
	render() {
		return (
			<Provider store={store}>
				<Router>
					<div className="App">
						<Navbar />
						<div className="container">
							<Switch>
								<Route exact path="/" component={Landing} />
								<Route exact path="/register" component={Register} />
								<Route exact path="/login" component={Login} />
								<PrivateRoute exact path="/search" component={Restaurants} />
								<PrivateRoute exact path="/profiles" component={Profiles} />
								<PrivateRoute path="/dashboard" component={Dashboard} />
								{/* <PrivateRoute path="/search/:id" component={CommentForm} /> */}
								<Route component={NoMatch} />

								{/* Change to simplify routing */}
								<PrivateRoute
									exact
									path="/search/review"
									component={RestaurantReview}
								/>
								<PrivateRoute
									exact
									path="/dashboard/review"
									component={FollowReview}
								/>
								<PrivateRoute
									exact
									path="/dashboard/review/comment"
									component={CommentCard}
								/>
								<PrivateRoute
									path="/dashboard/userreview"
									component={UserReview}
								/>
								<PrivateRoute
									exact
									path="/dashboard/userreview/comment"
									component={CommentCard}
								/>
								<PrivateRoute
									exact
									path="/comment/commentform"
									component={CommentForm}
								/>
							</Switch>
						</div>
						<Footer />
					</div>
				</Router>
			</Provider>
		);
	}
}

export default App;
