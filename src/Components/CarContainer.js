import React from "react";
export const CarContainer = props => {
	return (
		<div className="Car-Container">
			<div className="Car-Header">
				<div className="Car-Title">{props.car.manufacturer}</div>
				<div className="Car-Customer-Demand">Demand: {props.car.customerDemand}%</div>
			</div>
			<div className="Car-Image-Container">
				<img src={props.car.url} alt={props.car.manufacturer} className="Car-Image" />
				<div className="Car-Image-Overlay">{props.car.manufacturerPrice}</div>
			</div>
			<CarToggles {...props} />
			{props.car.locked && (
				<div className="Car-Container-Overlay">
					<span role="img" aria-label="locked">
						&#128274;
					</span>
					<button onClick={() => props.unlockCar(props.car.id)}>Unlock: {props.car.unlockPrice}</button>
				</div>
			)}
		</div>
	);
};
const CarToggles = props => {
	return (
		<div className="Car-Toggles">
			<QuantityToggle {...props} />
			<PriceToggle {...props} />
		</div>
	);
};
const PriceToggle = props => {
	return (
		<div className="Car-Toggle Car-Price-Toggle">
			<div className="Toggle-Title">Price</div>
			<div className="Toggle-Controls">
				<button onClick={() => props.changeSellingPrice(props.car.id, -props.car.manufacturerPrice / 10)}>-</button>
				<div>{props.car.sellingPrice}</div>
				<button onClick={() => props.changeSellingPrice(props.car.id, props.car.manufacturerPrice / 10)}>+</button>
			</div>
		</div>
	);
};

const QuantityToggle = props => {
	return (
		<div className="Car-Toggle Car-Quantity-Toggle">
			<div className="Toggle-Title">Quantity</div>
			<div className="Toggle-Controls">
				<button onClick={() => props.changeQuantity(props.car.id, -1)}>Sell</button>
				<div>{props.car.quantity}</div>
				<button onClick={() => props.changeQuantity(props.car.id, 1)}>Buy</button>
			</div>
		</div>
	);
};
