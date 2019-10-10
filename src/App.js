import React from "react";
import "./App.css";
import { LeftPanel } from "./Components/LeftPanel";
import { MiddlePanel } from "./Components/MiddlePanel";

class App extends React.Component {
	state = {
		cars: [
			{
				manufacturer: "Nissan",
				url: "https://upload.wikimedia.org/wikipedia/commons/thumb/6/67/Nissan-logo.svg/512px-Nissan-logo.svg.png",
				manufacturerPrice: 50,
				sellingPrice: 100,
				quantity: 0,
				locked: false
			},
			{
				manufacturer: "Toyota",
				url: "https://upload.wikimedia.org/wikipedia/commons/thumb/6/67/Nissan-logo.svg/512px-Nissan-logo.svg.png",
				manufacturerPrice: 75,
				sellingPrice: 125,
				quantity: 0,
				locked: true
			},
			{
				manufacturer: "Jeep",
				url: "https://upload.wikimedia.org/wikipedia/commons/thumb/6/67/Nissan-logo.svg/512px-Nissan-logo.svg.png",
				manufacturerPrice: 200,
				sellingPrice: 24,
				quantity: 0,
				locked: true
			},
			{
				manufacturer: "Lambo",
				url: "https://upload.wikimedia.org/wikipedia/commons/thumb/6/67/Nissan-logo.svg/512px-Nissan-logo.svg.png",
				manufacturerPrice: 200,
				sellingPrice: 24,
				quantity: 0,
				locked: true
			}
		]
	};
	render() {
		return (
			<div className="App">
				<LeftPanel />
				<MiddlePanel cars={this.state.cars} />
				<div className="RightPanel">
					<div className="Balance">Balance - £0.00</div>
					<hr />
					<ul>
						<li>Revenue</li>
						<li>Customer Demand</li>
						<li>Cost of Production / Min</li>
						<li>Total Inventory</li>
					</ul>
				</div>
			</div>
		);
	}
}

export default App;
