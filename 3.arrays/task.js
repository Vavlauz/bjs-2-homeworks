function compareArrays(arr1, arr2) {
  let result;

  result =
    arr1.length === arr2.length &&
    arr1.every((value, index) => value === arr2[index]);

  return result; // boolean
}
// console.log(compareArrays([8, 9], [8, 9]));

function advancedFilter(arr) {
  let resultArr;

  resultArr = arr
    .filter((element) => element >= 0)
    .filter((element) => element % 3 === 0)
    .map((element) => element * 10);

  return resultArr; // array
}
// console.log(advancedFilter([-1, -2]));
