import { dateToDddD } from "../utils/dateConversion.js";
import DeviceThermostatIcon from '@mui/icons-material/DeviceThermostat';
import AirIcon from '@mui/icons-material/Air';
import OpacityIcon from '@mui/icons-material/Opacity';
import WeatherDataPoint from "./WeatherDataPoint.jsx";
import { useTheme } from "../context/AppContext.jsx";

export default function WeatherForecastTable({ error, loading, groupedData, handleClick, activeDay, activeTab }) {
    const { unit } = useTheme();
    return (
        <div className="weather-forecast">

            {/* Display placeholder loading or error on failure */}
            {loading && <p className="info">Loading forecast…</p>}
            {error && <p className="error">Error: {String(error)}</p>}

            {/* Day tabs to move through each day's forecast */}
            <div className="weather-results-tabs">
                {groupedData && groupedData.map((day, i) => (
                    <button id={`day${i}`} key={day.date} onClick={() => handleClick(day.date, i)} className={`weather-results-tab ${activeTab === i ? "tab-active" : ""}`}>{dateToDddD(day.date)}</button>
                ))}
            </div>

            {/* Forecast output as table */}
            {groupedData && groupedData.map((day) => (
                <div key={day.date} id={day.date} className="day-tab" style={{ display: day.date === activeDay ? "block" : "none" }}>
                    <table className="weather-table">
                        <thead>
                            <tr>
                                <th>Time</th>
                                <th><img src="./icons/split-symbol.png" alt="Symbol" height="30px" /></th>
                                <th><DeviceThermostatIcon /></th>
                                <th><OpacityIcon />%</th>
                                <th><AirIcon /> <p>{unit === "metric" ? "km/h" : "mph"}</p></th>
                            </tr>
                        </thead>
                        <tbody>
                            {day.entries.map((timeEntry, i) => (
                                <WeatherDataPoint
                                    key={i}
                                    weatherTemperature={timeEntry.temp}
                                    weatherHumidity={timeEntry.humidity}
                                    weatherWindSpeed={timeEntry.windspeed}
                                    weatherClock={timeEntry.time}
                                    weatherIcon={timeEntry.icon}
                                    weatherWindDirection={timeEntry.windDirection}
                                />
                            ))}
                        </tbody>
                    </table>
                </div>
            ))}
        </div>
    )
}