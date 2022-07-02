function parseCount(arg) {
  let number = Number.parseInt(arg, 10);
  if (number) {
    return number;
  }
  throw new Error("Невалидное значение");
}
// console.log(parseCount("gh"));

function validateCount(arg) {
  try {
    return parseCount(arg);
  } catch (err) {
    return err;
  }
}

console.log(validateCount("2"));

class Triangle {
  constructor(a, b, c) {
    if (a + b < c || a + c < b || b + c < a) {
      throw new Error("Треугольник с такими сторонами не существует");
    }
    this.a = a;
    this.b = b;
    this.c = c;
  }

  getPerimeter() {
    return this.a + this.b + this.c;
  }

  getArea() {
    const hP = 0.5 * this.getPerimeter();
    return Number(
      Math.sqrt(hP * (hP - this.a) * (hP - this.b) * (hP - this.c)).toFixed(3)
    );
  }
}

function getTriangle(a, b, c) {
  try {
    return new Triangle(a, b, c);
  } catch {
    return {
      getPerimeter: () => "Ошибка! Треугольник не существует",
      getArea: () => "Ошибка! Треугольник не существует",
    };
  }
}

// let triangle = new Triangle(5.2323, 2.65464, 5.332565);
// let area = triangle.getArea();
// console.log(triangle);
// console.log(area);
// const triangle = getTriangle(1, 3, 100);
// console.log(triangle.getArea());
