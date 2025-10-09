import { celsiusToFahrenheit } from "../utils/temperatureConversion.js"
import { useTheme } from "../context/AppContext.jsx";

export default function CurrentWeather({ weatherBackground, groupedData }) {
    const { selectedCity, unit } = useTheme();
    return (
        <div className={`weather-current-container ${weatherBackground}`}>
            <div className="weather-current">
                <div className="weather-current-top-row">
                    <div className="weather-current-location">
                        <h2>
                            {selectedCity.name}
                            {selectedCity.state ? `, ${selectedCity.state}` : ""}, {selectedCity.country}
                        </h2>
                    </div>
                    <div className="weather-current-icon"><div>{groupedData && <img src={"./icons/" + groupedData[0].entries[0].icon + ".png"} alt="" width="100px" height="100px" />}</div></div>
                </div>
                {groupedData && groupedData[0]?.entries[0]?.temp && (
                    <>
                        <p>{groupedData[0].entries[0].description}</p>
                        <h2>
                            {unit === "metric" ? `${Math.round(groupedData[0].entries[0].temp)} °C` : `${Math.round(celsiusToFahrenheit(groupedData[0].entries[0].temp))} °F`}
                        </h2>
                    </>
                )}
            </div>
        </div >
    )
}