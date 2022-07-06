class AlarmClock {
  constructor(alarmCollection, timerId) {
    this.alarmCollection = [];
    this.timerId = null;
  }
  addClock(time, callback, id) {
    if (!id) {
      throw new Error("Параметр id не передан");
    }
    if (this.alarmCollection.find((item) => item.id === id)) {
      return console.error("Такой будильник уже существует");
    } else {
      return this.alarmCollection.push({ time, callback, id });
    }
  }

  removeClock(id) {
    let inputArrLength = this.alarmCollection.length;
    this.alarmCollection = this.alarmCollection.filter(
      (clock) => clock.id !== id
    );
    let outputArrLength = this.alarmCollection.length;
    return outputArrLength < inputArrLength;
  }

  getCurrentFormattedTime() {
    return new Date().toLocaleTimeString().slice(0, -3);
  }
  start() {
    let checkClock = (clock) => {
      let alarm = this.getCurrentFormattedTime();
      if (clock.time === alarm) {
        return clock.callback();
      }
    };
    if (this.timerId === null) {
      this.timerId = setInterval(() => {
        this.alarmCollection.forEach((clock) => checkClock(clock));
      }, 1000);
    }
    return;
  }

  stop() {
    if (this.timerId != null) {
      clearInterval(this.timerId);
      return (this.timerId = null);
    }
  }

  printAlarms() {
    return this.alarmCollection.forEach((el) =>
      console.log(`Будильник ${el.id} прозвонит в ${el.time}.`)
    );
  }

  clearAlarms() {
    this.stop();
    return (this.alarmCollection = []);
  }
}

function testCase() {
  let alarmClock = new AlarmClock();
  alarmClock.addClock("00:22", () => console.log("Подъем, труба зовет!"), 1);
  alarmClock.addClock(
    "00:23",
    () => {
      console.log("Вставай!!! Нас ждут великие дела!");
      alarmClock.removeClock(2);
    },
    2
  );
  alarmClock.addClock(
    "00:24",
    () => {
      console.log("Работа сама себя не сделает!!!");
      alarmClock.stop();
      alarmClock.clearAlarms();
      alarmClock.printAlarms();
    },
    3
  );
  alarmClock.printAlarms();
  alarmClock.start();
}

testCase();
