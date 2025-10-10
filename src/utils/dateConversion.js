export function dateToDddD(dateAsIso) {
  // For tab display: returns "Saturday 31"

  const [year, month, day] = dateAsIso.split("-");
  const date = new Date(Number(year), Number(month) - 1, Number(day)); // local midnight (no time component) and adjusted month for JavaScript
  return new Intl.DateTimeFormat("en-CA", {
    weekday: "long",
    day: "numeric",
  }).format(date);
}
