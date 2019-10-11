import React from "react";
import { CarContainer } from "./CarContainer";

export const MiddlePanel = props => {
	return (
		<div className="MiddlePanel">
			{props.cars.map((car, i) => {
				return (
					<CarContainer
						key={i}
						unlockCar={props.unlockCar}
						changeQuantity={props.changeQuantity}
						changeSellingPrice={props.changeSellingPrice}
						car={car}
					/>
				);
			})}
		</div>
	);
};
