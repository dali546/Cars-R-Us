import React from "react";
import "./App.css";
import { LeftPanel } from "./Components/LeftPanel";
import { MiddlePanel } from "./Components/MiddlePanel";

class App extends React.Component {
	constructor() {
		setInterval(() => {
			this.updateStateState();
		}, 1000);
		super();
	}
	state = {
		balance: 100,
		cars: [
			{
				id: 0,
				manufacturer: "Nissan",
				url: "https://upload.wikimedia.org/wikipedia/commons/thumb/6/67/Nissan-logo.svg/512px-Nissan-logo.svg.png",
				manufacturerPrice: 50,
				sellingPrice: 100,
				quantity: 0,
				locked: false
			},
			{
				id: 1,
				manufacturer: "Toyota",
				url: "https://upload.wikimedia.org/wikipedia/commons/thumb/6/67/Nissan-logo.svg/512px-Nissan-logo.svg.png",
				manufacturerPrice: 75,
				sellingPrice: 125,
				quantity: 0,
				locked: false
			},
			{
				id: 2,
				manufacturer: "Jeep",
				url: "https://upload.wikimedia.org/wikipedia/commons/thumb/6/67/Nissan-logo.svg/512px-Nissan-logo.svg.png",
				manufacturerPrice: 200,
				sellingPrice: 24,
				quantity: 0,
				locked: false
			},
			{
				id: 3,
				manufacturer: "Lambo",
				url: "https://upload.wikimedia.org/wikipedia/commons/thumb/6/67/Nissan-logo.svg/512px-Nissan-logo.svg.png",
				manufacturerPrice: 200,
				sellingPrice: 24,
				quantity: 0,
				locked: true
			}
		],
		carsSold: [{
			id: 0,
			quantity: 0
		}],
		carsBought: [{
			id:0,
			quantity: 0
		}],
		noOfCarsSold: 0,
		noOfCarsBought: 0,
		carsSoldInPastWeek: 0,
		customerDemand: 0,
		sellingLimit: 20
	};
	render() {
		return (
			<div className="App">
				<LeftPanel />
				<MiddlePanel
					changeQuantity={this.changeQuantity}
					changeSellingPrice={this.changeSellingPrice}
					cars={this.state.cars}
				/>
				<div className="RightPanel">
					<div className="Balance">Balance - £{this.state.balance}</div>
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

	changeQuantity = (id, value) => {
		this.setState(prevState => {
			let newState = { ...prevState };
			newState.cars[id].quantity += value;
			if (newState.cars[id].quantity < 0) newState.cars[id].quantity = 0;
			return newState;
		});
	};

	changeSellingPrice = (id, value) => {
		this.setState(prevState => {
			let newState = { ...prevState };
			newState.cars[id].sellingPrice += value;
			if (newState.cars[id].sellingPrice < 0) newState.cars[id].sellingPrice = 0;
			return newState;
		});
	};

	updateStateState = () => {
		this.setState(prevState => {
			return { balance: prevState.balance + 1 };
		});
		// console.log("i will be run every second.", new Date());
	};

	changeBalance = () => {
		this.setState(prevState => {
			let profit = (prevState.customerDemand*prevState.sellingLimit)*prevState.sellingPrice;
			return { balance: prevState.balance + profit}
		})
	}
}

export default App;
