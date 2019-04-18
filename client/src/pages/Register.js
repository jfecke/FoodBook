import React, { Component } from "react";
//might not need withRouter
import { withRouter } from "react-router-dom";
import PropTypes from "prop-types";
import { connect } from "react-redux";
import { registerUser } from "../actions/authActions";
import TextFieldGroup from "../components/common/TextFieldGroup";
import API from "../utils/API"

class Register extends Component {
	state = {
		username: "",
		displayname: "",
		email: "",
		password: "",
		password2: "",
		city: "",
		stateName: "",
		profilePic: "",
		errors: {},
	};

	// Check to see if logged in
	componentDidMount() {
		if (this.props.auth.isAuthenticated) {
			this.props.history.push("/dashboard");
		}
	}

	//redux
	//test for errors property
	//errors from component state
	componentWillReceiveProps(nextProps) {
		if (nextProps.errors) {
			this.setState({ errors: nextProps.errors });
		}
	}
	// onChange
	onChange = e => {
		e.preventDefault();
		this.setState({ [e.target.name]: e.target.value });
		if (e.target.name === "username") {
			API.getUsers({username:e.target.value}).then(user => {
				if (user.data.length>0) {
					let temperrors = this.state.errors;
					temperrors.username = "Username unavailable";
					this.setState({ errors: temperrors });
				} else {
					let temperrors = this.state.errors;
					temperrors.username = "";
					this.setState({ errors: temperrors });
				}
			})
		} else if (e.target.name === "email") {
			API.getUsers({email: e.target.value}).then(user => {
				if (user.data.length>0) {
					let temperrors = this.state.errors;
					temperrors.email = "Account already exists";
					this.setState({ errors: temperrors });
				} else {
					let temperrors = this.state.errors;
					temperrors.email = "";
					this.setState({ errors: temperrors });
				}
			})
		}
	};

	//onSubmit
	onSubmit = e => {
		e.preventDefault();
		const newUser = {
			username: this.state.username,
			displayname: this.state.displayname,
			email: this.state.email,
			password: this.state.password,
			password2: this.state.password2,
			city: this.state.city,
			stateName: this.state.stateName
		};
		if (this.state.profilePic.length > 0) {
			newUser.profilePic = this.state.profilePic;
		};
		this.props.registerUser(newUser, this.props.history);
	};

	render() {
		const { errors } = this.state;

		return (
			<div className="register">
				<div className="container">
					<div className="row">
						<div className="col-md-8 m-auto">
							<h1 className="display-4 text-center font-weight-bold">Sign Up</h1>
							<p className="lead text-center">Create your FoodBook account</p>
							<form noValidate onSubmit={this.onSubmit}>
								<div className="form-group">
									<TextFieldGroup
										placeholder="Username"
										name="username"
										type="name"
										value={this.state.username}
										onChange={this.onChange}
										error={errors.username}
									/>
									
									<TextFieldGroup
										placeholder="Display Name"
										name="displayname"
										type="name"
										value={this.state.displayname}
										onChange={this.onChange}
										error={errors.displayname}
									/>

									<TextFieldGroup
										placeholder="Email Address"
										name="email"
										type="email"
										value={this.state.email}
										onChange={this.onChange}
										error={errors.email}
									/>

									<TextFieldGroup
										placeholder="Profile Pic"
										name="profilePic"
										type=""
										value={this.state.profilePic}
										onChange={this.onChange}
										error={errors.profilePic}
									/>

									<TextFieldGroup
										placeholder="City"
										name="city"
										type=""
										value={this.state.city}
										onChange={this.onChange}
										error={errors.city}
									/>

									<TextFieldGroup
										placeholder="State"
										name="stateName"
										type=""
										value={this.state.stateName}
										onChange={this.onChange}
										error={errors.stateName}
									/>

									<TextFieldGroup
										placeholder="Password"
										name="password"
										type="password"
										value={this.state.password}
										onChange={this.onChange}
										error={errors.password}
									/>

									<TextFieldGroup
										placeholder="Confirm Password"
										name="password2"
										type="password"
										value={this.state.password2}
										onChange={this.onChange}
										error={errors.password2}
									/>

									<input
										type="submit"
										className="btn btn-info btn-block mt-4"
									/>
								</div>
							</form>
						</div>
					</div>
				</div>
			</div>
		);
	}
}

//For Redux
Register.propTypes = {
	registerUser: PropTypes.func.isRequired,
	auth: PropTypes.object.isRequired,
	errors: PropTypes.object.isRequired,
};

const mapStateToProps = state => ({
	auth: state.auth,
	errors: state.errors,
});

export default connect(
	mapStateToProps,
	{ registerUser }
)(withRouter(Register));
