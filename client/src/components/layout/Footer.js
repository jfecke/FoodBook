import React from "react";

export default function Footer() {
	return (
		<footer style ={{position: "fixed", bottom:0, width: 100 +"%", height: 5 + "%"}}className="bg-dark text-white mt-5 p-2 text-center footer">
			Copyright &copy; {new Date().getFullYear()} FoodBook
		</footer>
	);
}
