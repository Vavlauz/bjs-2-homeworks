// Задание 1

let array = [];
(minimum = -100), (maximum = 101);

for (var i = minimum; i < maximum; i++) {
  array.push(i);
}

// console.log(array);

function getArrayParams(arr) {
  (min = null), (max = null), (sum = 0), (avg = null);

  for (let ar of arr) {
    if (ar <= arr[0]) {
      min = ar;
    }
    if (ar >= max) {
      max = ar;
    }
  }

  for (let ar in arr) {
    sum = sum + arr[ar];
  }

  avg = +(sum / arr.length).toFixed(2);

  return { min: min, max: max, avg: avg };
}
// console.log(getArrayParams([-99, 99, 10]));

// Задание 2

function worker(arr) {
  let sum = 0;

  for (let ar in arr) {
    sum = sum + arr[ar];
  }

  return sum;
}

function makeWork(arrOfArr, func) {
  let max = null;
  let sum = 0;

  for (let ar in arrOfArr) {
    sum = func(arrOfArr[ar]);
    if (sum >= max) {
      max = sum;
    }
  }

  return max;
}
// console.log(
//   makeWork(
//     [
//       [1, 2, 3, 4],
//       [10, 20, -10, -20],
//     ],
//     worker
//   )
// );

// Задание 3
function worker2(arr) {
  let max = null;
  let min = null;

  for (let ar of arr) {
    if (ar <= arr[0]) {
      min = ar;
    }
    if (ar >= min && ar >= arr[0]) {
      max = ar;
    }
  }
  return Math.abs(max - min);
}

// console.log(
//   makeWork(
//     [
//       [-10, -20, -40],
//       [10, 20, 30],
//     ],
//     worker2
//   )
// );
