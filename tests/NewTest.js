const chai = require("chai");
// const sinon = require('sinon');
const sinonChai = require("sinon-chai");
chai.use(sinonChai);
const assert = chai.assert;

const _new = require("../src/New/New");

describe("_new", () => {
  it("能生成了一个实例对象", () => {
    const Person = function () {};
    assert.isObject(_new(Person));
  });

  it("创建实例对象所接受的参数能生效", () => {
    const Person = function (name) {
      this.name = name;
    };
    const person = _new(Person, "allen");
    assert(person.name === "allen");
  });
  it("创建实例对象能继承构造函数的原型对象上的方法", () => {
    const Person = function (name, age) {
      this.name = name;
      this.age = age;
    };
    Person.prototype.say = function () {
      return `I am ${this.name},${this.age} years old`;
    };
    const person = _new(Person, "allen", 18);
    assert(person.say() === "I am allen,18 years old");
  });
  it('能创建一个具有构造函数的内置对象', () => {
      const Person = function(name){
         this.name = name
         return {name: 'kobe'}
      }
      const person = _new(Person, 'allen')
      assert(person.name === 'kobe')
  })
});
