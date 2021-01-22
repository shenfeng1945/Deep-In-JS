const DeepCloner = require("../src/DeepClone/DeepClone");
const chai = require("chai");
// const sinon = require('sinon');
const sinonChai = require("sinon-chai");
chai.use(sinonChai);

const assert = chai.assert;

describe("new DeepCloner().clone", () => {
  it("是一个类", () => {
    assert.isFunction(DeepCloner);
  });

  it("能够复制基本类型", () => {
    // number,string,boolean,undefined,symbol,null
    const n = 1;
    const n2 = new DeepCloner().clone(n);
    assert(n === n2);
    const s = "hello";
    const s2 = new DeepCloner().clone(s);
    assert(s === s2);
    const b = true;
    const b2 = new DeepCloner().clone(b);
    assert(b === b2);
    const u = undefined;
    const u2 = new DeepCloner().clone(u);
    assert(u === u2);
    const empty = null;
    const empty2 = new DeepCloner().clone(empty);
    assert(empty === empty2);
    const sym = Symbol();
    const sym2 = new DeepCloner().clone(sym);
    assert(sym === sym2);
  });
});

describe("对象", () => {
  it("能够复制普通对象", () => {
    const a = { name: "allen", child: { name: "kobe" } };
    const a2 = new DeepCloner().clone(a);
    assert(a !== a2);
    assert(a.name === a2.name);
    assert(a.child !== a2.child);
    assert(a.child.name === a2.child.name);
  });

  it("能够复制数组对象", () => {
    const a = [[1, 2], [3, 4], [5]];
    const a2 = new DeepCloner().clone(a);
    assert(a !== a2);
    assert(a[0] !== a2[0]);
    assert(a[1] !== a2[1]);
    assert(a[2] !== a2[2]);
    assert.deepEqual(a, a2);
  });

  it("能够复制函数", () => {
    const a = function (x, y) {
      return x + y;
    };
    a.xxx = { yyy: { zzz: 1 } };
    const a2 = new DeepCloner().clone(a);
    assert(a !== a2);
    assert(a.xxx.yyy.zzz === a2.xxx.yyy.zzz);
    assert(a.xxx.yyy !== a2.xxx.yyy);
    assert(a.xxx !== a2.xxx);
    assert(a(1, 2) === a2(1, 2));
  });

  it("环也能复制", () => {
    const a = { name: "hello" };
    a.self = a;
    const a2 = new DeepCloner().clone(a);
    assert(a !== a2);
  });

  it("可以复制正则表达式", () => {
    const a = new RegExp("/.*/", "gi");
    a.xxx = { yyy: { zzz: 1 } };
    const a2 = new DeepCloner().clone(a);
    assert(a.source === a2.source);
    assert(a.flags === a2.flags);
    assert(a !== a2);
    assert(a.xxx.yyy.zzz === a2.xxx.yyy.zzz);
    assert(a.xxx.yyy !== a2.xxx.yyy);
    assert(a.xxx !== a2.xxx);
  });

  it("可以复制日期", () => {
    const a = new Date();
    a.xxx = { yyy: { zzz: 1 } };
    const a2 = new DeepCloner().clone(a);
    assert(a !== a2);
    assert(a.getTime() === a2.getTime());
    assert(a.xxx.yyy.zzz === a2.xxx.yyy.zzz);
    assert(a.xxx.yyy !== a2.xxx.yyy);
    assert(a.xxx !== a2.xxx);
  });

  it("自动跳过原型属性", () => {
    const a = Object.create({ name: "a" });
    a.xxx = { yyy: { zzz: 1 } };
    const a2 = new DeepCloner().clone(a);
    assert(a !== a2);
    assert.isFalse('name' in a2)
    assert(a.xxx.yyy.zzz === a2.xxx.yyy.zzz);
    assert(a.xxx.yyy !== a2.xxx.yyy);
    assert(a.xxx !== a2.xxx);
  });
  
  it('很复杂的对象', () => {
    const a = {
        string: 'hello',
        number: 123,
        bool: false,
        null: null,
        undef: undefined, 
        inf: Infinity, 
        n: NaN
    }
    const a2 = new DeepCloner().clone(a)
    assert(a !== a2)
    assert(a.string === a2.string)
    assert(a.number === a2.number)
    assert(a.bool === a2.bool)
    assert(a.null === a2.null)
    assert(a.undef === a2.undef)
    assert(a.inf === a2.inf)
    assert.isNaN(a2.n)
  })
});
