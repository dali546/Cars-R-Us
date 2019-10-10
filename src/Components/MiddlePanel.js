import React from "react";
import { CarContainer } from "./CarContainer";

export const MiddlePanel = props => {
	
	return (
		<div className="MiddlePanel">
			{props.cars.map((car, i) => {
				return (
					!car.locked && (
						<CarContainer
							key={i}
							changeQuantity={props.changeQuantity}
							changeSellingPrice={props.changeSellingPrice}
							car={car}
						/>
					)
				);
			})}
		</div>
	);
};
