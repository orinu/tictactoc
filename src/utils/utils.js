export const makeStateArray = (boxNumber) => {
  const array = [];
  for (let i = 0; i < boxNumber * boxNumber; i++) {
    array[i] = null;
  }
  return array;
};
