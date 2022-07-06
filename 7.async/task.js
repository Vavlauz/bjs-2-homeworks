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
      console.error("Такой будильник уже существует");
    } else {
      this.alarmCollection.push({ time, callback, id });
    }
  }

  removeClock(id) {
    let l = this.alarmCollection.length;
    this.alarmCollection = this.alarmCollection.filter((item) => {
      item.id !== id;
    });
    if (this.alarmCollection.length !== l) {
      return true;
    }
    return false;
  }

  getCurrentFormattedTime() {
    return new Date().toLocaleTimeString().slice(0, -3);
  }
  start() {
    let checkClock = (element) => {
      if (element.time === this.getCurrentFormattedTime()) {
        element.callback();
      }
    };
    if (this.timerId === null) {
      this.timerId = setInterval(() => {
        this.alarmCollection.forEach((el) => checkClock(el));
      }, 1000);
    }
  }

  stop() {
    if (this.timerId != null) {
      clearInterval(this.timerId);
      this.timerId = null;
    }
  }

  printAlarms() {
    this.alarmCollection.forEach((el) =>
      console.log(`Будильник ${el.id} прозвонит в ${el.time}.`)
    );
  }

  clearAlarms() {
    stop();
    this.alarmCollection = [];
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
