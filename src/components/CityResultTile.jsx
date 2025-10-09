import React from "react";

function CityResultTile({ name, state, country, lat, lon, onSelect }) {

  // Display a single result tile with a click handler to set the current city.
  function citySelected() {
    onSelect?.({ name, state, country, lat, lon });
  }

  return (

    <button type="button" className="city-tile" onClick={citySelected}>
      <div className="city-tile-name">{name}{state ? `, ${state}` : ""}, {country}</div>
      <div className="city-tile-coords">lat: {lat}, lon: {lon}</div>
    </button>

  );
}

export default CityResultTile;
