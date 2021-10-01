export default function getFormatedDate(day) {
    day = day ? day : new Date();

    let options = { weekday: "long", month: "numeric", day: "numeric" };
    let date = day.toLocaleString("en", options);

    return date.charAt(0).toUpperCase() + date.slice(1);
}
