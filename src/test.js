class Person {
  constructor(a, b, c, d, e) {
    this.a = a;
    this.b = b;
    this.c = c;
    this.d = d;
    this.e = e;
  }

  get everything() {
    return `${this.a} ${this.b} ${this.c} ${this.d} ${this.e} 56789ABCDEFG`;
  }
}

export default Person;