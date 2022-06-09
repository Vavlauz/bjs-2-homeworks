"use strict";
function solveEquation(a, b, c) {
  let res = [];
  if (a == 0) {
    return false;
  }

  let D = Math.pow(b, 2) - 4 * a * c;

  if (D < 0) {
    return res;
  }

  if (D == 0) {
    let tmp = [];
    tmp.push(-b / (2 * a));
    res = tmp;
  } else if (D > 0) {
    let tmp = [];
    tmp.push((-b + Math.sqrt(D)) / (2 * a));
    tmp.push((-b - Math.sqrt(D)) / (2 * a));
    res = tmp;
  }
  return res;
}
console.log(solveEquation(1, 2, 1));

function calculateTotalMortgage(percent, contribution, amount, date) {
  let totalAmount;
  let monthRate;
  let sum;

  let dateNow = new Date();
  let dateEnd = new Date(date);
  let diffDate = dateEnd - dateNow;
  // let milliseconds = diffDate;
  // let seconds = milliseconds / 1000;
  // let minutes = seconds / 60;
  // let hours = minutes / 60;
  // let days = hours / 24;
  // let months = +(days / 30).toFixed(0);
  let months = Math.trunc(
    +(diffDate / (1000 * 60 * 60 * 24 * 30.5)).toFixed(0)
  );
  if (percent < 0) {
    console.log(
      'Параметр "Процентная ставка" содержит неправильное значение "test"'
    );
  } else {
    monthRate = percent / (100 * 12);
  }

  if (contribution < 0) {
    console.log(
      'Параметр "Начальный взнос" содержит неправильное значение "test"'
    );
  } else if (amount < 0) {
    console.log(
      'Параметр "Общая стоимость" содержит неправильное значение "test"'
    );
  } else {
    sum = amount - contribution;
  }
  let payment =
    sum * (monthRate + monthRate / (Math.pow(monthRate + 1, months) - 1));
  totalAmount = +(payment * months).toFixed(2);
  console.log(totalAmount);

  return totalAmount;
}
console.log(calculateTotalMortgage(1, 0, -1, "06/09/2025"));
