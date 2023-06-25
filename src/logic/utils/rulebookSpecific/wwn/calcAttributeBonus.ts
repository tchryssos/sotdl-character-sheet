export const calcAttributeBonus = (attributeValue: number) => {
  // There is no bonus calc in WWN
  // The rulebook just gives these ranges
  if (attributeValue >= 18) {
    return 2;
  }

  if (attributeValue >= 14) {
    return 1;
  }

  if (attributeValue >= 8) {
    return 0;
  }

  if (attributeValue >= 4) {
    return -1;
  }

  return -2;
};
