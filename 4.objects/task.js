function Student(name, gender, age) {
  this.name = name;
  this.gender = gender;
  this.age = age;
}

let student1 = new Student("Tony", "male", 20);
let student2 = new Student("Peter", "male", 23);
let student3 = new Student("Alex", "male", 30);

Student.prototype.setSubject = function (subjectName) {
  this.subject = subjectName;
};

Student.prototype.addMark = function (mark) {
  if (this.marks === undefined) {
    this.marks = [mark]; // Первая оценка добавляется в массив
  } else {
    this.marks.push(mark); // Все остальные оценки пушатся
  }
};

// student1.setSubject("Algebra");
// console.log(student1);

Student.prototype.addMarks = function (...args) {
  if (this.marks === undefined) {
    this.marks = args;
  } else {
    this.marks.push(...args);
  }
};

// student1.addMark(3);
// student1.addMark(2);
// student1.addMark(2);
// student1.addMarks(3, 2, 2);
// console.log(student1);

Student.prototype.getAverage = function () {
  let result = 0;
  for (let key of this.marks) {
    result = result + key;
  }
  return result / this.marks.length;
};

// console.log(student1.getAverage());

Student.prototype.exclude = function (reason) {
  let result = 0;
  for (let key of this.marks) {
    result = result + key;
  }

  if (result / this.marks.length < 3) {
    delete this.subject;
    delete this.marks;
    this.excluded = reason;
  }
};

// student1.exclude("low grades");
// console.log(student1);
