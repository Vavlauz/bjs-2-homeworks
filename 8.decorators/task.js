function cachingDecoratorNew(func) {
  let cache = [];

  function wrapper(...args) {
    const hash = args.join(",");
    let objectInCache = cache.find((item) => item.hash === hash);
    if (objectInCache) {
      console.log("Из кэша: " + objectInCache.result);
      return "Из кэша: " + objectInCache.result;
    }

    let result = func(...args);
    cache.push({ hash, result });
    if (cache.length > 5) {
      cache.shift(); // если слишком много элементов в кэше надо удалить самый старый (первый)
    }
    console.log("Вычисляем: " + result);
    return "Вычисляем: " + result;
  }
  return wrapper;
}

let sum = (...args) => args.reduce((acc, item) => acc + item, 0);
// console.log(sum(12, 123));
const cashedSum = cachingDecoratorNew(sum);
cashedSum(1, 2, 3);
cashedSum(1, 2, 5);
cashedSum(1, 4, 3);
cashedSum(1, 2, 3, 5);
cashedSum(1, 2, 3, 6, 4);
cashedSum(123, 3131, 464, 4664, 46546, 4564);

function debounceDecoratorNew(func, ms) {
  let timerid;
  let value = false;

  function wrapper(...args) {
    clearTimeout(timerid);

    if (!value) {
      func.call(this, ...args);
    }

    value = true;

    timerid = setTimeout(() => {
      func.call(this, ...args);
    }, ms);
  }
  return wrapper;
}

// const sendSignal = () => console.log("Сигнал отправлен");
// const upgradedSendSignal = debounceDecoratorNew(sendSignal, 2000);
// setTimeout(upgradedSendSignal); // Сигнал отправлен
// setTimeout(upgradedSendSignal, 300); // проигнорировано так как от последнего вызова прошло менее 2000мс (300 - 0 < 2000)
// setTimeout(upgradedSendSignal, 900); // проигнорировано так как времени от последнего вызова прошло: 900-300=600 (600 < 2000)
// setTimeout(upgradedSendSignal, 1200); // проигнорировано так как времени от последнего вызова прошло: 1200-900=300 (300 < 2000)
// setTimeout(upgradedSendSignal, 2300); // проигнорировано так как времени от последнего вызова прошло: 2300-1200=1100 (1100 < 2000)
// setTimeout(upgradedSendSignal, 4400); // Сигнал отправлен так как времени от последнего вызова прошло: 4400-2300=2100 (2100 > 2000)
// setTimeout(upgradedSendSignal, 4500); // Сигнал будет отправлен, так как последний вызов debounce декоратора (спустя 4500 + 2000 = 6500) 6,5с

function debounceDecorator2(func, ms) {
  let timerid;
  let value = false;
  wrapper.count = 0;

  function wrapper(...args) {
    clearTimeout(timerid);
    if (!value) {
      func.call(this, ...args);
      wrapper.count++;
    }

    value = true;

    timerid = setTimeout(() => {
      func.call(this, ...args);
      wrapper.count++;
    }, ms);
  }
  return wrapper;
}

const sendSignal2 = () => console.log("Сигнал2 отправлен");
const upgradedSendSignal2 = debounceDecorator2(sendSignal2, 2000);
setTimeout(upgradedSendSignal2); // Сигнал отправлен
setTimeout(upgradedSendSignal2, 300); // проигнорировано так как от последнего вызова прошло менее 2000мс (300 - 0 < 2000)
setTimeout(upgradedSendSignal2, 900); // проигнорировано так как времени от последнего вызова прошло: 900-300=600 (600 < 2000)
setTimeout(upgradedSendSignal2, 1200); // проигнорировано так как времени от последнего вызова прошло: 1200-900=300 (300 < 2000)
setTimeout(upgradedSendSignal2, 2300); // проигнорировано так как времени от последнего вызова прошло: 2300-1200=1100 (1100 < 2000)
setTimeout(upgradedSendSignal2, 4400); // Сигнал отправлен так как времени от последнего вызова прошло: 4400-2300=2100 (2100 > 2000)
setTimeout(upgradedSendSignal2, 4500); // Сигнал будет отправлен, так как последний вызов debounce декоратора (спустя 4500 + 2000 = 6500) 6,5с
