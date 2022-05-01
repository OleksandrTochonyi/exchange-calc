export const dateGenerator = () => {
  let date = new Date();
  let year = date.getFullYear();
  let month: number | string = date.getMonth();
  let day: number | string = date.getDate();
  ++month;
  if (month.toString().length < 2) {
    month = 0 + '' + month;
  }
  if (day.toString().length < 2) {
    day = 0 + '' + day;
  }
  return day + '.' + month + '.' + year;
};
