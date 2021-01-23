### bind

> MDN 介绍
> bind()方法会返回一个函数，在函数调用时，bind()接受一个参数，作为函数运行的this，之后的参数会作为函数运行的实参。


### bind 特点

- 返回一个函数
- 可以传入参数

### bind 使用场景

将方法传给一个变量时，然后执行该变量，此时函数中的`this`指向变为了全局`window`。

### 确定 API

- 特殊性: `bind` 位于`Function.prototype`上，需要做`polyfill` 
- API

> fn.bind(asThis)
> fn.bind(asThis,param1,param2)
> fn.bind(asThis)()
> fn.bind(asThis, param1, param2)()
> fn.bind(asThis, param1, param2)(p3,p4)