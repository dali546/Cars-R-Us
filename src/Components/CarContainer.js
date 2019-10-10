import React from "react";
export const CarContainer = ({ car }) => {
	return (
		<div className="Car-Container">
			<div className="Car-Title">{car.manufacturer}</div>
			<div className="Car-Image-Container">
				<img src={car.url} alt={car.manufacturer} className="Car-Image" />
				<div className="Car-Image-Overlay">{car.manufacturerPrice}</div>
			</div>
			<CarToggles car={car}/>
		</div>
	);
};
const CarToggles = ({car}) => {
	return <div className="Car-Toggles">
		<div className="Car-Toggle Car-Quantity-Toggle">
			<div className="Toggle-Title">Quantity</div>
			<div className="Toggle-Controls">
				<button>Sell</button>
				<div>{car.quantity}</div>
				<button>Buy</button>
			</div>
		</div>
		<div className="Car-Toggle Car-Price-Toggle">
			<div className="Toggle-Title">Price</div>
			<div className="Toggle-Controls"><button>-</button>
				<div>{car.sellingPrice}</div>
				<button>+</button></div>
		</div>
	</div>;
}

