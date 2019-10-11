import React from "react";
import "./App.css";
import { LeftPanel } from "./Components/LeftPanel";
import { MiddlePanel } from "./Components/MiddlePanel";

class App extends React.Component {
	state = {
		maintenanceCost: 50,
		balance: 5000,
		cars: [
			{
				id: 0,
				manufacturer: "Nissan",
				url: "https://upload.wikimedia.org/wikipedia/commons/thumb/6/67/Nissan-logo.svg/512px-Nissan-logo.svg.png",
				manufacturerPrice: 1000,
				sellingPrice: 1000,
				quantity: 0,
				locked: false,
				customerDemand: 0.5,
				sellingLimit: 10,
				unlockPrice: 0
			},
			{
				id: 1,
				manufacturer: "Toyota",
				url: "http://www.car-brand-names.com/wp-content/uploads/2015/07/Toyota-logo.png",
				manufacturerPrice: 5000,
				sellingPrice: 5000,
				quantity: 0,
				locked: true,
				customerDemand: 0.5,
				sellingLimit: 8,
				unlockPrice: 20000
			},
			{
				id: 2,
				manufacturer: "Jeep",
				url: "https://www.carlogos.org/logo/Jeep-logo-green-3840x2160.png",
				manufacturerPrice: 20000,
				sellingPrice: 20000,
				quantity: 0,
				locked: true,
				customerDemand: 0.5,
				sellingLimit: 5,
				unlockPrice: 80000
			},
			{
				id: 3,
				manufacturer: "Audi",
				url: "https://www.carlogos.org/logo/Audi-logo-1999-1920x1080.png",
				manufacturerPrice: 40000,
				sellingPrice: 40000,
				quantity: 0,
				locked: true,
				customerDemand: 0.5,
				sellingLimit: 5,
				unlockPrice: 160000
			},
			{
				id: 4,
				manufacturer: "Bentley",
				url: "https://www.carlogos.org/logo/Bentley-logo.png",
				manufacturerPrice: 80000,
				sellingPrice: 80000,
				quantity: 0,
				locked: true,
				customerDemand: 0.5,
				sellingLimit: 3,
				unlockPrice: 320000
			},
			{
				id: 5,
				manufacturer: "Lamborghini",
				url: "http://www.car-brand-names.com/wp-content/uploads/2015/03/Lamborghini-Logo.png",
				manufacturerPrice: 100000,
				sellingPrice: 100000,
				quantity: 0,
				locked: true,
				customerDemand: 0.5,
				sellingLimit: 2,
				unlockPrice: 400000
			}
		],
		weekNo: 0,
		allTimeCarsSold: [
			{ id: 0, amountSold: 5 },
			{ id: 1, amountSold: 0 },
			{ id: 2, amountSold: 0 },
			{ id: 3, amountSold: 0 }
		],
		allTimeCarsBought: [
			{ id: 0, amountBought: 0 },
			{ id: 1, amountBought: 0 },
			{ id: 2, amountBought: 0 },
			{ id: 3, amountBought: 0 }
		]
	};

	componentDidMount() {
		setInterval(() => {
			this.progressAWeek();
		}, 3000);
	}

	render() {
		return (
			<div className="App">
				<LeftPanel />
				<MiddlePanel
					unlockCar={this.unlockCar}
					changeQuantity={this.changeQuantity}
					changeSellingPrice={this.changeSellingPrice}
					cars={this.state.cars}
				/>
				<div className="RightPanel">
					<div className="Balance">Balance - £{this.state.balance.toFixed(2)}</div>
					<hr />
					<li>
						Total Inventory:
						{this.state.cars.reduce((total, car) => {
							return total + car.quantity;
						}, 0)}
					</li>
					<ul>
						<li>Week Number: {this.state.weekNo}</li>
						<li>Revenue</li>
						<li>Customer Demand</li>
						<li>Cost of Production / Min</li>

						{this.state.allTimeCarsBought.map(obj => (
							<p key={obj.id}>{obj.amountBought}</p>
						))}
					</ul>
				</div>
			</div>
		);
	}

	changeQuantity = (id, value) => {
		this.setState(prevState => {
			let newBalance = prevState.balance;
			let newAllTimeCarsBought = prevState.allTimeCarsBought;
			let newCars = prevState.cars.map(car => {
				if (car.id === id) {
					let bill = 0;
					if (value === -1) bill = (car.manufacturerPrice / 2) * value;
					else bill = car.manufacturerPrice * value;

					if (car.manufacturerPrice <= prevState.balance && !(value < 0 && car.quantity === 0)) {
						car.quantity += value;
						if (car.quantity < 0) car.quantity = 0;
						newBalance -= bill;

						newAllTimeCarsBought.find(({ id: car }) => car === id).amountBought += value;
					}
				}
				return car;
			});
			return { balance: newBalance, cars: newCars, allTimeCarsBought: newAllTimeCarsBought };
		});
	};

	changeSellingPrice = (id, value) => {
		this.setState(prevState => {
			let newCars = prevState.cars.map(car => {
				if (car.id === id) {
					let newDemand = parseFloat(((car.manufacturerPrice / car.sellingPrice) * Math.random(0.5)).toFixed(2));
					if (newDemand > 1) newDemand = 1;
					car.customerDemand = newDemand;

					car.sellingPrice += value;
					if (car.sellingPrice < 0) car.sellingPrice = 0;
				}
				return car;
			});
			return { cars: newCars };
		});
	};

	progressAWeek = () => {
		this.setState(prevState => {
			// Sell Cars from Available Cars
			let salesThisWeek = this.state.cars.map(car => {
				let possibleNoSales = Math.floor(car.customerDemand * car.sellingLimit);
				let actualSales = car.quantity > possibleNoSales ? possibleNoSales : car.quantity;
				return { id: car.id, amountSold: actualSales };
			});

			// Decrease quantity
			let newCars = prevState.cars.map(car => {
				let newCar = { ...car };
				newCar.quantity -= salesThisWeek.find(({ id }) => id === car.id).amountSold;
				return newCar;
			});

			// Update Total Car Sales Stats
			// For Each Car Update AllTimeCars Sold Return That
			let newAllTimeCarSold = prevState.allTimeCarsSold.map(obj => {
				let newObj = {
					id: obj.id,
					amountSold: obj.amountSold + salesThisWeek.find(({ id }) => id === obj.id).amountSold
				};
				return newObj;
			});

			// Calculate Profit from No Cars Sold
			let profit = 0;
			profit = prevState.cars.reduce((total, car) => {
				return total + salesThisWeek.find(({ id }) => id === car.id).amountSold * car.sellingPrice;
			}, 0);

			return {
				// Increment WeekNo
				weekNo: prevState.weekNo + 1,
				cars: newCars,
				allTimeCarsSold: newAllTimeCarSold,
				balance: prevState.balance + profit - prevState.maintenanceCost
			};
		});
	};

	unlockCar = id => {
		this.setState(prevState => {
			let bill = 0;
			let cars = prevState.cars.map(car => {
				if (car.id === id) {
					if (prevState.balance >= car.unlockPrice) {
						car.locked = false;
						bill = car.unlockPrice;
					}
				}
				return car;
			});
			return { balance: prevState.balance - bill, cars: cars };
		});
	};
}

export default App;
