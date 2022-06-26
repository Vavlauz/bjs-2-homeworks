class PrintEditionItem {
  constructor(name, releaseDate, pagesCount) {
    this.name = name;
    this.releaseDate = releaseDate;
    this.pagesCount = pagesCount;
    this.type = null;
    this.state = 100;
  }

  set state(state) {
    if (state <= 0) {
      this._state = 0;
    }
    if (state >= 100) {
      this._state = 100;
    } else {
      this._state = state;
    }
    return this._state;
  }

  get state() {
    return this._state;
  }

  fix() {
    return (this.state *= 1.5);
  }
}

const sherlock = new PrintEditionItem(
  "Полное собрание повестей и рассказов о Шерлоке Холмсе в одном томе",
  2019,
  1008
);

console.log(sherlock.releaseDate); //2019
console.log(sherlock.state); //100
sherlock.fix();
console.log(sherlock.state); //100

class Magazine extends PrintEditionItem {
  constructor(name, releaseDate, pagesCount) {
    super(name, releaseDate, pagesCount);
    this.type = "magazine";
  }
}

class Book extends PrintEditionItem {
  constructor(author, name, releaseDate, pagesCount) {
    super(name, releaseDate, pagesCount);
    this.author = author;
    this.type = "book";
  }
}

class NovelBook extends Book {
  constructor(author, name, releaseDate, pagesCount) {
    super(author, name, releaseDate, pagesCount);
    this.type = "novel";
  }
}

class FantasticBook extends Book {
  constructor(author, name, releaseDate, pagesCount) {
    super(author, name, releaseDate, pagesCount);
    this.type = "fantastic";
  }
}

class DetectiveBook extends Book {
  constructor(author, name, releaseDate, pagesCount) {
    super(author, name, releaseDate, pagesCount);
    this.type = "detective";
  }
}

const picknick = new FantasticBook(
  "Аркадий и Борис Стругацкие",
  "Пикник на обочине",
  1972,
  168
);

console.log(picknick.author); //"Аркадий и Борис Стругацкие"
picknick.state = 10;
console.log(picknick.state); //10
picknick.fix();
console.log(picknick.state); //15

// 2 задание

class Library {
  constructor(name) {
    this.name = name;
    this.books = [];
  }

  addBook(book) {
    if (book.state > 30) {
      if (!this.books) {
        this.books = [book];
      } else {
        this.books.push(book);
      }
    }
    return this.books;
  }

  findBookBy(type, value) {
    const book = this.books.find((item) => item[type] === value);
    return book || null;
  }

  giveBookByName(bookName) {
    let book = this.books.find((el) => el.name === bookName);
    this.books.splice(this.books.indexOf(book), 1);
    return book || null;
  }
}

const library = new Library("Библиотека имени Ленина");

library.addBook(
  new DetectiveBook(
    "Артур Конан Дойл",
    "Полное собрание повестей и рассказов о Шерлоке Холмсе в одном томе",
    2019,
    1008
  )
);
library.addBook(
  new FantasticBook(
    "Аркадий и Борис Стругацкие",
    "Пикник на обочине",
    1972,
    168
  )
);
library.addBook(new NovelBook("Герберт Уэллс", "Машина времени", 1895, 138));
library.addBook(new Magazine("Мурзилка", 1924, 60));
console.log(library.books);

console.log(library.findBookBy("name", "Властелин колец")); //null
console.log(library.findBookBy("releaseDate", 1924).name); //"Мурзилка"

console.log("Количество книг до выдачи: " + library.books.length); //Количество книг до выдачи: 4
console.log(library.giveBookByName("Машина времени"));
console.log("Количество книг после выдачи: " + library.books.length); //Количество книг после выдачи: 3

// 3 задание

class Student {
  constructor(name, gender, age) {
    this.name = name;
    this.gender = gender;
    this.age = age;
    this.journal = {};
  }

  addMark(grade, subject) {
    if (grade < 1 || grade > 5 || typeof grade !== "number") {
      return console.log(`Ошибка, оценка должна быть числом от 1 до 5`);
    }
    if (this.journal[subject] === undefined) {
      this.journal[subject] = [];
    }
    return this.journal[subject].push(grade);
  }

  getAverageBySubject(subject) {
    if (this.journal[subject]) {
      let averageMark = 0;
      if (this.journal[subject] !== undefined) {
        if (this.journal[subject].length > 0) {
          let sum = 0;
          this.journal[subject].forEach((mark) => {
            sum += mark;
          });
          averageMark = sum / this.journal[subject].length;
        }
      }
      return averageMark;
    }
    return console.log("Несуществующий предмет");
  }

  getAverage() {
    let sumOfAveMarks = 0;
    let countOfSubjects = 0;
    Object.entries(this.journal).forEach(([subject]) => {
      sumOfAveMarks += this.getAverageBySubject(subject);
      countOfSubjects++;
    });
    return sumOfAveMarks / countOfSubjects;
  }

  exclude() {
    return console.log("Исключен за попытку подделать оценки");
  }
}

const student = new Student("Олег Никифоров");
student.addMark(5, "algebra");
student.addMark(5, "algebra");
student.addMark(5, "geometry");
student.addMark(4, "geometry");
student.addMark(6, "geometry"); // "Ошибка, оценка должна быть числом от 1 до 5"
student.getAverageBySubject("geometry"); // Средний балл по предмету geometry 4.5
student.getAverageBySubject("biology"); // Несуществующий предмет
student.getAverage(); // Средний балл по всем предметам 4.75
student.exclude("Исключен за попытку подделать оценки");
