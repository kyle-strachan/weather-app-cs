export function celsiusToFahrenheit(tempInCelsius) {
  const tempInFahrenheit = (Number(tempInCelsius) * 9) / 5 + 32;
  return tempInFahrenheit;
}
