export function groupDates(forecast, offsetSeconds) {
  const days = {};

  forecast.list.forEach((item) => {
    // Convert each time statement to unix time - this is the *local* time of the selectedCity
    const unixAdjustedByOffset = (item.dt + offsetSeconds) * 1000;

    // Create date from unix time
    const dateObject = new Date(unixAdjustedByOffset);

    // Use date object and create a unique key string per date
    const dateKey = dateObject.toISOString().slice(0, 10);

    // Use date object to extract 3-hourly forecast time
    const time = dateObject.toLocaleTimeString([], {
      hour: "2-digit",
      minute: "2-digit",
      hour12: true,
      timeZone: "UTC",
    });

    // Select values that will be used in ForecastTable
    const entry = {
      time,
      temp: item.main.temp,
      humidity: item.main.humidity,
      windspeed: item.wind.speed,
      windDirection: item.wind.deg,
      description: item.weather[0].description,
      background: item.weather[0].main,
      icon: item.weather[0].icon,
    };

    // Create date key if it doesn't exist
    if (days[dateKey] === undefined) {
      days[dateKey] = [];
    }

    // Add 3-hour forecast item to day array
    days[dateKey].push(entry);
  });

  // Map days to array of objects
  return Object.keys(days).map((date) => ({
    date,
    entries: days[date],
  }));
}
