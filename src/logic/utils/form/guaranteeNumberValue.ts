// Stupid fn to guarantee that we get a number from a string or number
// Because of how forms work, many values that "should" be numbers are the
// stringified version of that number.
export const guaranteeNumberValue = (val: string | number) =>
  parseInt(String(val), 10);
