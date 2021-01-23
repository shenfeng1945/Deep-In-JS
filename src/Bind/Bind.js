function bind(context, ...args) {
  // 调用bind方法的函数： fn.bind()
  const fn = this;
  if (typeof fn !== "function") {
    throw new Error("bind 必须调用在函数上");
  }
  const resultFn = function (...args2) {
    // args.concat(args2): 将bind传入的参数，和新函数(resultFn)传入的参数组合起来。闭包
    // 使用 new resultFn()时，this === resultFn的实例对象
    return fn.apply(
      this instanceof resultFn ? this : context,
      args.concat(args2)
    );
  };
  resultFn.prototype = this.prototype;
  return resultFn;
}

module.exports = bind;

if (!Function.prototype.bind) {
  Function.prototype.bind = bind;
}
