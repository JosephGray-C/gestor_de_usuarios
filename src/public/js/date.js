export function parseLocalDate(dateObj) {
    const isoString = dateObj.toISOString().substring(0, 10); // "YYYY-MM-DD"
    const [year, month, day] = isoString.split("-");
    return new Date(parseInt(year), parseInt(month) - 1, parseInt(day));
}
