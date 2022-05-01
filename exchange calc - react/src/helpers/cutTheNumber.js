export function cutTheNumber(number) {
  let numberToCut = +number;
  return numberToCut % 1 === 0
    ? numberToCut.toFixed(0)
    : numberToCut.toFixed(3);
}
