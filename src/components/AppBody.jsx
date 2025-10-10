import { useEffect, useState } from "react";
import useFetch from "../hooks/useFetch.js";
import { useTheme } from "../context/AppContext.jsx";
import { groupDates } from "../utils/groupDates.js";
import './AppBody.css';
import CurrentWeather from "./CurrentWeather.jsx";
import WeatherForecastTable from "./WeatherForecastTable.jsx";

export default function AppBody() {
    const { selectedCity } = useTheme();
    const [groupedData, setGroupedData] = useState(null);
    const [activeDay, setActiveDay] = useState(null);
    const [activeTab, setActiveTab] = useState(0); // Set tab-active on first tab on initial load
    const [weatherBackground, setWeatherBackground] = useState(null);
    const forecastUrl = `https://api.openweathermap.org/data/2.5/forecast?lat=${selectedCity.lat}&lon=${selectedCity.lon}&units=metric&appid=${import.meta.env.VITE_OPEN_WEATHER_KEY}`;
    const { data: forecast, loading, error } = useFetch(forecastUrl);

    useEffect(() => {
        if (forecast && forecast.city) {
            const grouped = groupDates(forecast, forecast.city.timezone ?? 0) // To create the tab layout, the data is grouped into an array by date
            setGroupedData(grouped);
            setActiveTab(0); // Reset to first tab on location change
            if (grouped.length > 0 && grouped[0].entries.length > 0) {
                setActiveDay(grouped[0].date);
                const backgroundWeather = grouped[0].entries[0].background;

                // Set dynamic background based on current weather (first record)
                const backgroundMap = {
                    Clear: "background-clear",
                    Clouds: "background-clouds",
                    Snow: "background-snow",
                    Rain: "background-rain",
                    Drizzle: "background-drizzle",
                    Thunderstorm: "background-thunderstorm",
                };
                setWeatherBackground(backgroundMap[backgroundWeather] || "background-other");
            }
        }
    }, [forecast]);

    function handleClick(day, tabIndex) {
        setActiveDay(day);
        setActiveTab(tabIndex);
    }

    return (
        <>
            <CurrentWeather weatherBackground={weatherBackground} groupedData={groupedData} />
            <WeatherForecastTable error={error} loading={loading} groupedData={groupedData} handleClick={handleClick} activeDay={activeDay} activeTab={activeTab} />
        </>
    );
};