export const dateGenerator = () => {
  let date = new Date();
  let year = date.getFullYear();
  let month = date.getMonth();
  let day = date.getDate();
  ++month;
  if (month.toString().length < 2) {
    month = 0 + "" + month;
  }
  if (day.toString().length < 2) {
    day = 0 + "" + day;
  }
  return day + "." + month + "." + year;
};
