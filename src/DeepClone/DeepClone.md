### 深拷贝

b是a的一份拷贝，b中没有对a中对象的引用

#### 实现思路

- 递归
1. 看节点类型(7种)
2. 如果是基本类型，则直接拷贝
3. 如果是object，则分情况讨论

- object分为
1. 普通object: for in?
2. 数组array: Array初始化
3. 函数function
4. 日期Date
5. 正则RegExp

### JSON 序列化

使用`JSON.parse/stringify`可快速实现深拷贝

```js
const abj = {
    string: 'hello',
    number: 123,
    bool: false,
    null: null,
    date: new Date(), // stringified
    undef: undefined, // lost
    inf: Infinity, // forced to 'null'
    re: /.*/ // lost
}
console.log(JSON.parse(JSON.stringify(abj)))
```

可以看出，如果被拷贝的对象有`Date`,`undefined`,`infinity`和`RegExp`这些属性值，则不适合了。