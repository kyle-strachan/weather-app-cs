export function dateToDddD(dateAsIso) {
  const [year, month, day] = dateAsIso.split("-");
  const d = new Date(Number(year), Number(month) - 1, Number(day)); // local midnight
  return new Intl.DateTimeFormat("en-GB", {
    weekday: "long",
    day: "numeric",
  }).format(d);
}
