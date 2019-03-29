import React, { Component } from "react";
//might not need withRouter
import { withRouter } from "react-router-dom";
import PropTypes from "prop-types";
import { connect } from "react-redux";
import { registerUser } from "../../actions/authActions";
import TextFieldGroup from "../common/TextFieldGroup";

class Register extends Component {
	state = {
		name: "",
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
	};
	//onSubmit
	onSubmit = e => {
		e.preventDefault();
		const newUser = {
			name: this.state.name,
			email: this.state.email,
			password: this.state.password,
			password2: this.state.password2,
			city: this.state.city,
			stateName: this.state.stateName,
			profilePic: this.state.profilePic,
		};
		// axios call to be replaced in /authAction.js
		// axios
		//   .post("/api/users/register", newUser)
		//   .then(res => console.log(res.data))
		//   .catch(err => this.setState({ errors: err.response.data }));
		this.props.registerUser(newUser, this.props.history);
	};

	render() {
		const { errors } = this.state;

		return (
			<div className="register">
				<div className="container">
					<div className="row">
						<div className="col-md-8 m-auto">
							<h1 className="display-4 text-center">Sign Up</h1>
							<p className="lead text-center">Create your FoodBook account</p>
							<form noValidate onSubmit={this.onSubmit}>
								<div className="form-group">
									<TextFieldGroup
										placeholder="Name"
										name="name"
										type="name"
										value={this.state.name}
										onChange={this.onChange}
										error={errors.name}
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
