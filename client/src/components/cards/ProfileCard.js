import React from "react";
import "../search/styles.css";
import ph from "../../img/ph.png";

const ProfileCard = props => {
	return (
		<div className="card d-flex flex-row">
			<div className="img-wrap d-flex justify-content-center">
				<img id={props.id} alt={props.id} src={ph} />
			</div>
			<div
				className="main-content d-flex flex-column justify-content-between"
				style={{ flex: 1, marginLeft: 5 }}
			>
				<div className="d-flex flex-row row1">
					<div style={{ flex: 1 }}>
						<p className="title">UserName</p>
					</div>

					<div
						className="d-flex flex-row justify-content-md-end muted"
						style={{ flex: 1 }}
					>
						<button className="btn btn-primary">Follow</button>
					</div>
				</div>

				<p>Number of Followers</p>
				<p>Number of Reviews</p>

				<p className="muted">Location</p>
			</div>
			<p />
		</div>
	);
};

export default ProfileCard;

//removed so the page wouldn't break while designing

// placeholder="Name"
// name="name"
// type="name"
// value={this.state.name}
// onChange={this.onChange}
// error={errors.name}
