export function cutTheNumber(number: number) {
  let numberToCut = +number;
  return numberToCut % 1 === 0
    ? numberToCut.toFixed(0)
    : numberToCut.toFixed(3);
}
