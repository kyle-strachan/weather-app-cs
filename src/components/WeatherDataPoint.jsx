import { useTheme } from "../context/AppContext.jsx";
import { celsiusToFahrenheit } from "../utils/temperatureConversion.js";
import {
    metresPerSecondToKilometersPerHour,
    metresPerSecondToMilesPerHour,
} from "../utils/speedConversion.js";

function WeatherDataPoint({
    weatherTemperature,
    weatherHumidity,
    weatherWindSpeed,
    weatherWindDirection,
    weatherClock,
    weatherIcon,
}) {

    const { unit } = useTheme();

    const speedLabel =
        unit === "metric"
            ? `${metresPerSecondToKilometersPerHour(weatherWindSpeed)}`
            : `${metresPerSecondToMilesPerHour(weatherWindSpeed)}`;

    const tempLabel =
        unit === "metric"
            ? `${Math.round(weatherTemperature)} °C`
            : `${Math.round(celsiusToFahrenheit(weatherTemperature))} °F`;

    return (
        <tr>
            <td>{weatherClock}</td>
            <td>
                <img src={`./icons/${weatherIcon}.png`} alt="" width={30} height={30} />
            </td>
            <td>{tempLabel}</td>
            <td>{weatherHumidity}</td>
            <td style={{ position: "relative", textAlign: "center", zIndex: 0 }}>
                <div
                    style={{
                        backgroundImage: `url(./icons/wind-direction-icon-2.png)`,
                        backgroundRepeat: "no-repeat",
                        backgroundPosition: "center",
                        backgroundSize: "contain",
                        transform: `rotate(${weatherWindDirection}deg)`,
                        width: "50px",
                        height: "50px",
                        margin: "0 auto",
                        zIndex: "0"
                    }}
                ></div>
                <span style={{ position: "absolute", top: "50%", left: "50%", transform: "translate(-50%, -50%)", zIndex: -1, }}>
                    {speedLabel}
                </span>
            </td>

        </tr>

    );
}

export default WeatherDataPoint;
