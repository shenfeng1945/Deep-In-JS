const chai = require("chai");
const sinonChai = require("sinon-chai");
chai.use(sinonChai);
const assert = chai.assert;

const bind = require("../src/Bind/Bind");
Function.prototype.bind2 = bind;

describe("bind方法", () => {
  it("能用", () => {
    const fn = function () {};
    assert(Function.prototype.bind2 !== undefined);
    assert(fn.bind2 instanceof Function);
  });

  it("能将函数体内的 this,绑定到方法接受的第一个参数上", () => {
    const fn = function () {
      return this;
    };
    const newFn = fn.bind2({ name: "allen" });
    assert(newFn().name === "allen");
  });

  it("能将 this, x, y 成功绑定", () => {
    const fn = function (x, y) {
      return [this, x, y];
    };

    const newFn = fn.bind2({ name: "allen" }, 1, 2);
    assert(newFn()[0].name === "allen");
    assert(newFn()[1] === 1);
    assert(newFn()[2] === 2);
  });

  it("能将 this, x 成功绑定，之后新函数传 y 调用成功", () => {
    const fn = function (x, y) {
      return [this, x, y];
    };
    const newFn = fn.bind2({ name: "allen" }, 1);
    assert(newFn(2)[0].name === "allen");
    assert(newFn(2)[1] === 1);
    assert(newFn(2)[2] === 2);
  });

  it("先将函数绑定了 x, y,再使用 new, 得到实例对象 ", () => {
    const fn = function (x, y) {
      this.x = x;
      this.y = y;
    };
    const newFn = fn.bind2(null, "x", "y");
    const obj = new newFn();
    assert(obj.x === "x");
    assert(obj.y === "y");
  });

  it("得到的新函数使用 new 命令后，能继承最初使用bind的函数的原型对象", () => {
    const fn = function (x, y) {
      this.x = x;
      this.y = y;
    };
    fn.prototype.sayHello = function (name) {
      return `${name}: hello`;
    };
    const newFn = fn.bind2(undefined, "x", "y");
    const obj = new newFn();
    assert(obj.sayHello instanceof Function);
    assert(fn.prototype.isPrototypeOf(obj));
    assert(obj.sayHello("allen") === "allen: hello");
  });

  it("不用 new 但是用类似的对象", () => {
    const fn = function (x, y) {
      this.x = x;
      this.y = y;
    };
    const obj = new fn()
    const fn2 = fn.bind2(obj, 'x', 'y')
    const object = fn2();
    assert(object === undefined )
    assert(obj.x === 'x')
    assert(obj.y === 'y')
  });
});
