import React from "react";
import { CarContainer } from "./CarContainer";

export const MiddlePanel = ({ cars }) => (
	<div className="MiddlePanel">
		{/* {cars.map((car, i) => {
			return {!(car.locked) && <CarContainer key={i} car={car} />}
		}} */}
		{cars.map((car, i) => {
			return !car.locked && <CarContainer key={i} car={car} />
		})}
	</div>
);
