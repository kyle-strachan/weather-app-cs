# Front-End Development: Weather App

A React-based front-end weather forecast app sourcing data from OpenWeather's 5-Day/3-Hour Forecast API.

## Features
* City search with animated show/hide toggle
* Dynamic background based on current weather conditions
* Local storage to resume the last searched location
* Celsius/Fahrenheit temperature toggle (including metric and imperial wind speed conversion)
* Dynamic wind direction symbol
* Embedded Google Maps embed

## Launch

### Run locally

```
git clone https://github.com/kyle-strachan/weather-cs-app.git
npm install
npm start
```

### View Live

> [View the live project](https://weather.kylestrachan.com "weather.kylestrachan.com")

### Development notes
1. The API data is reprocessed in `utils/groupDates.js`: first, it converts timestamps to Unix time and applies the timezone offset to produce human-readable dates; second, it groups the entries by date to allow displaying them in tabbed sections. Once this was solved, the tab and table layout became straightforward.
2. While the API has a parameter to fetch for metric vs imperial, I chose to convert this locally to prevent a second fetch.


