import React, { useState, useEffect } from "react";
import { useDebounce } from "use-debounce";
import useFetch from "../hooks/useFetch";
import CityResultTile from "./CityResultTile.jsx";
import { useTheme } from "../context/AppContext.jsx";
import './CitySearch.css';

function CitySearch() {
  const [cityNameInput, setCityNameInput] = useState("");
  const [cityName, setCityName] = useState("");
  const [hasSearched, setHasSearched] = useState(false);
  const [errors, setErrors] = useState({});
  const [displayResults, setDisplayResults] = useState(false);
  const { setSelectedCity, setShowSearch } = useTheme();
  const [debouncedCityNameInput] = useDebounce(cityNameInput, 1000); // Debounce set to 1 second to prevent hammering free API
  const geoUrl =
    hasSearched && cityName
      ? `https://api.openweathermap.org/geo/1.0/direct?q=${encodeURIComponent(
        cityName
      )}&limit=5&appid=${import.meta.env.VITE_OPEN_WEATHER_KEY}`
      : null;

  const { data: dataSearch, loading: loadingSearch, error: errorSearch } =
    useFetch(geoUrl); // Becomes valid after re-render when cityName and hasSearched are updated by handleClick

  useEffect(() => {
    if (loadingSearch || errorSearch) {
      // Hide result tiles if loading, during new search, or error occurs
      setDisplayResults(false);
      return;
    }
    if (Array.isArray(dataSearch) && dataSearch.length === 0 && hasSearched) {
      // Prompt to search but disabled on first load using hasSearched
      setErrors({ cityName: "No city found; please try again." });
      return;
    }
    setDisplayResults(Array.isArray(dataSearch) && dataSearch.length > 0);
  }, [dataSearch, loadingSearch, errorSearch]);

  useEffect(() => {
    const city = debouncedCityNameInput.trim();
    if (city) {
      setErrors({});
      setCityName(city);
      setHasSearched(true);
    } else {
      setDisplayResults(false);
    }
  }, [debouncedCityNameInput]);

  function handleSubmit(e) {
    // Use latest handleChange value to search for city
    e.preventDefault();
    const name = cityNameInput.trim();
    if (!name) {
      setErrors({ cityName: "Enter a city name" });
      return;
    }
    setErrors({});
    setCityName(name);
    setHasSearched(true);
  }

  return (
    <div className="city-search-container">
      <form className="city-search-form" onSubmit={handleSubmit}>
        <input
          id="city-name"
          name="cityName"
          type="text"
          value={cityNameInput}
          onChange={(e) => setCityNameInput(e.target.value)}
          placeholder="Search for a city"
        />
        <button id="nav-control-search" type="submit" className="nav-control"><img src="/icons/icon-search.png" height="40px" width="40px" /></button>
      </form>

      <div className="city-search-messages">
        {hasSearched && loadingSearch && <p className="info">Searching…</p>}
        {errors.cityName && <p className="info">{errors.cityName}</p>}
        {hasSearched && errorSearch && <p className="info">Error: {String(errorSearch)}</p>}
      </div>

      <div className="city-search-results">
        {displayResults && (
          <div className="search-results">
            {dataSearch.map((city, i) => (
              <CityResultTile
                key={`${city.lat},${city.lon},${i}`} // Some search results contain identical lon and lat values, 'i' added to create unique key.
                name={city.name}
                state={city.state}
                country={city.country}
                lat={city.lat}
                lon={city.lon}
                onSelect={() => {
                  setSelectedCity({
                    name: city.name,
                    state: city.state,
                    country: city.country,
                    lat: city.lat,
                    lon: city.lon,
                  });
                  setDisplayResults(false);
                  setShowSearch("false");
                }}
              />
            ))}
          </div>
        )}
      </div>
    </div>
  );
}

export default CitySearch;
