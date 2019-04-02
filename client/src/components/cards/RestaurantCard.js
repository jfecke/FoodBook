import React from "react";
import "../search/styles.css";
import ph from "../../img/ph.png";

const RestaurantCard = props => {
	const star = <i className="fa fa-star" aria-hidden="true" />;
	const halfstar = <i className="fas fa-star-half-alt" />;

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
						<p className="title">Chueys</p>
					</div>

					<div
						className="d-flex flex-row justify-content-md-end muted"
						style={{ flex: 1 }}
					>
						<p>0.5 miles</p>
					</div>
				</div>

				<div className="d-flex flex-row" style={{ flex: 1 }}>
					<div className="d-flex flex-row row2" style={{ flex: 1 }}>
						<a href="/search/review">
							{star}
							{star}
							{halfstar}
						</a>
						<a href="/search/review" style={{ marginLeft: 5 }}>
							59 reviews
						</a>

						<div
							className="d-flex flex-row justify-content-end muted"
							style={{ flex: 1 }}
						>
							<p>$$$$</p>
						</div>
					</div>
				</div>

				<p>Italian</p>

				<div className="d-flex flex-row" style={{ flex: 1 }}>
					<div className="d-flex flex-row" style={{ flex: 1 }}>
						<p className="muted" style={{ width: 100 + "%" }}>
							209 E 58 St, Eastside
						</p>

						<a
							href="/search/id"
							className="btn btn-dark justify-content-end"
							style={{ float: "right", margin: 1 }}
						>
							Review
						</a>
					</div>
				</div>
			</div>

			<p />
		</div>
	);
};

export default RestaurantCard;

//removed so the page wouldn't break while designing

// placeholder="Name"
// name="name"
// type="name"
// value={this.state.name}
// onChange={this.onChange}
// error={errors.name}
