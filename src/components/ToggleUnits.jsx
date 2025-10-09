import React from "react";
import { useTheme } from "../context/AppContext.jsx"

function ToggleUnits() {
    const { unit, toggleUnit } = useTheme();

    return (
        <button className="nav-control" onClick={toggleUnit}>{unit === "metric" ? (<img src="./icons/icon-celsius.png" alt="Toggle between Celsius and Fahrenheit" height="40px" width="40px" />) : (<img src="./icons/icon-fahrenheit.png" alt="Toggle between Celsius and Fahrenheit" height="40px" width="40px" />)}</button>
    )

}

export default ToggleUnits;
