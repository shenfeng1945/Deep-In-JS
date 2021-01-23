function _new(constructor, ...args) {
  const obj = Object.create(constructor.prototype);
  const result = constructor.apply(obj, args);
  return typeof result === "object" ? result || obj : obj;
}

// Object.create 内部实现
Object.create = function (proto) {
  const fn = function () {};
  fn.prototype = proto;
  return new fn();
};

module.exports = _new;
