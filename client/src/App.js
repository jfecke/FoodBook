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
import FollowReview from "./components/review/FollowReview";
import CommentCard from "./components/comments/CommentCard";
import UserReview from "./components/review/UserReview";
import CommentForm from "./components/comments/CommentForm";
import { clearCurrentProfile } from "./actions/profileActions";
import PrivateRoute from "./components/common/PrivateRoute";
import Restaurants from './components/search/Restaurants';
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
						<Route exact path="/" component={Landing} />
						<div className="container">
							<Route exact path="/register" component={Register} />
							<Route exact path="/login" component={Login} />
							<Route exact path="/search" component={Restaurants} />

							
							<Route path="/dashboard" component={Dashboard} />

							<Switch>
								<PrivateRoute
									exact
									path="/dashboard/review"
									component={FollowReview}
								/>
							</Switch>

							<Switch>
								<PrivateRoute
									exact
									path="/dashboard/review/comment"
									component={CommentCard}
								/>
							</Switch>

							<Switch>
								<PrivateRoute
									path="/dashboard/userreview"
									component={UserReview}
								/>
							</Switch>

							<Switch>
								<PrivateRoute
									exact
									path="/dashboard/userreview/comment"
									component={CommentCard}
								/>
							</Switch>

							<Switch>
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
