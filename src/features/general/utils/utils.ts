const sortByField = (
  item1: any,
  item2: any,
  fieldName: string,
  options: {
    asc?: boolean;
    byLength?: boolean;
    onEqual?: { fieldName: string; asc?: boolean };
  } = {}
): number => {
  const { asc = true, byLength = false, onEqual } = options;
  const compareA = byLength ? item1[fieldName].length : item1[fieldName];
  const compareB = byLength ? item2[fieldName].length : item2[fieldName];

  if (compareA > compareB) {
    return asc ? -1 : 1;
  } else if (compareA < compareB) {
    return asc ? 1 : -1;
  } else {
    return onEqual?.fieldName
      ? sortByField(item1, item2, onEqual?.fieldName, { asc: onEqual?.asc })
      : 1;
  }
};

const getPrecentage = (num1: number, num2: number) => (num1 / num2) * 100;
const getRGBprecentage = (num1: number, num2: number) => (num1 / num2) * 250;

export { sortByField, getPrecentage, getRGBprecentage };
