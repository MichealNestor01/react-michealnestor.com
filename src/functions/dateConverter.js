export const dateConverter = (date) => {
  const monthMapping = [
    "January",
    "Febuary",
    "March",
    "April",
    "May",
    "June",
    "July",
    "August",
    "September",
    "October",
    "November",
    "December",
  ];
  const year = date.slice(0, 4);
  const monthInt = parseInt(date.slice(5, 7));
  let day = date.slice(8, 10);
  let daySuffix = "th";
  if (day[1] === "1") {
    daySuffix = "st";
  } else if (day[1] === "2") {
    daySuffix = "nd";
  } else if (day[1] === "3") {
    daySuffix = "rd";
  }
  if (day[0] === "0") {
    day = day[1];
  }
  return `${day}${daySuffix} ${monthMapping[monthInt - 1]} ${year}`;
};
