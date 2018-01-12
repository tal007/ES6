
# 学习ES6的笔记以及练手代码

## let and const
```javascript
let oWrap = document.body;
{
    let a = "1";
    // 无法多次使用 let 定义一个变量 http://localhost:8080/
    // let a = "2";
    oWrap.innerHTML += a;
}
// 无法获取定义在一个 {}里面的变量
// Uncaught ReferenceError: a is not defined
// console.log(a)
{
    // 这里使用 let定义变量 a不会报错
    // 使用 let 会有自己的作用域 {}，{} 与 {}之间的变量互不影响
    let a = "2";
    oWrap.innerHTML += a;
}
{
    let a = [];
    // for 循环中使用 let 实现每一次都是这个循环变量
    for (let i = 0; i < 10; i++) {
        a[i] = function () { oWrap.innerHTML += `<br>使用let定义变量的for循环----${i}`}
    }
    a.forEach(function(item){
        item();
    })
}
{
    // for循环还有一个特别之处，就是设置循环变量的那部分是一个父作用域，而循环体内部是一个单独的子作用域。
    /* 
        这个代码在未编译的时候可以循环 3次
        但是在使用webpack编译后只有一次 因为 webpack编辑就是把 let 换为 var 了
    */
    for (let i = 0; i < 3; i++) {
        let i = 'abc';
        console.log(i);
    }
}
{
    // 使用 let 不存在变量提升 依然编译为 es5的 var
    console.log(a)
    let a = "1";
}
```
## 变量的结构赋值
```javascript
{
    /* 
        let a = 1;
        let b = 2;
        let c = 3;
    */
    let [a, b, c] = [1, 2, 3]
    console.log(a,b,c)
}
{
    // let c = 3;
    let [, , c] = [1, 2, 3];
    console.log(c)
}
{
    // let a = 1;
    // let b = [2, 3]
    let [a, ...b] = [1, 2, 3]

    // 使用 ... 的形式会把这个先转换为空数组
}
{
    let [a, b, ...c] = [1];
    /* 
        a = 1;
        b = undefined;
        c = [];
    */
}
{
    // ES6 内部使用严格相等运算符（===），判断一个位置是否有值。
    // 所以，只有当一个数组成员严格等于undefined，默认值才会生效。
    let [a = 1, b = 2] = [3];
    // a = 3;
    // b = 2;
}
{
    // 对象的结构赋值
    let {a, b: yes} = {a: 1, b: "你好"};
    /* 
        如果类型是 a 这种的，即属性与值都是 a
        如果类型是 b 这种的，即属性是b，值是 yes
        赋值时先找属性，属性对应，在去赋值
        所以：
            a = 1;
            yes = "你好"
        此时这个 b 并没有进入赋值，他的作用就是 匹配
    */
}
``
## 字符串的扩展
```javascript
{   
    // 码点：一个字符的 Unicode 编码，
    // 小码点：\u0000 - \uffff 如“吉”
    // 大码点： > \uffff 如“𠮷”
    
    /* 
        charCodeAt 与 codePointAt
        charCodeAt：ES5的方法，支持了 2字节的文字，如“吉”，返回 UTF-16编码
        codePointAt：ES6的方法，支持了 4字节的文字，如“𠮷”，返回 UTF-32编码

    */
    // 使用 for...of 遍历字符串
    let s = '𠮷a';
    for (let ch of s) {
        console.log(ch.codePointAt(0).toString(16));
    }
    /* 
        String.fromCharCode：适用于码点小的
        String.fromCodePoint：适用于码点大的
        与上面的对应
    */
    /* 
        chatAt()：适用于码点小的
        at()：适用于码点大的
    */
}
{
    /* 
    确定一个字符是否包含在另一个字符串中：
        indexOf
        includes：是否找到
        startsWith：是否在头部
        endsWith：是否在末尾
    */
}
{
    // 模版字符串
    // 使用 反引号（ `） 嵌套  ${} 进行字符串的拼接
    // 简单例子
    let name = "world";
    let res = `hello ${name}`;
    // 模版中使用运算
    let add1 = "add1";
    res = `hello ${1 + 2}`

}
```
## 数值的扩展
```javascript
{
    /* 
        定义一个数字的时候使用 0b（二进制） 和 0o（八进制）
    */
    let a = 0b1111;
    let b = 0o503;
}
{
    // 使用 Number.isFinite(), Number.isNaN()
    // Number.isFinite()：检查一个数值是否为有限的（finite）。
    // Number.isNaN()：检查一个值是否为 NaN

    // Number.isInteger()用来判断一个数值是否为整数。容易误判
    // 如果对数据精度的要求较高，不建议使用Number.isInteger()判断一个数值是否为整数。

    //  Number.isSafeInteger() 用来判断一个整数是否落在这个范围（Number.MAX_SAFE_INTEGER和Number.MIN_SAFE_INTEGER这两个常量）之内。
}
```
## 函数
```javascript
{
    /* 
        这个例子：
            函数参数使用默认值，自成一个作用域，作用域中使用 let 定义了 x 与 y
            foo函数内部使用了 var 定义变量 x，自成一个作用域
            所以两个 x 在不同的作用域
                var x = 3;
                y();
                console.log(x);
            就是正常的 ES5 的执行顺序 ， y() 中修改的 x 与这个 x 不是同一个 x

            最后全局的这个 x 与他们没有关系
    */
    var x = 1;
    function foo(x, y = function () { x = 2; }) {
        var x = 3;
        y();
        console.log(x);
    }

    foo() // 3
    x // 1
}
{
    /* 
        这个例子：
            函数参数使用默认值，自成一个作用域，作用域中使用 let 定义了 x 与 y
            foo函数内部 没有 使用 var 定义变量 x，只是修改x，所以没有自成一个作用域
            这里的 x = 3 的这个 x 就是函数参数那里的那个 x
            所以是
                let x;
                x = 3;
                y() ==> x = 2
                console.log(x) ==> 2

            这里的这个 x 也与全局的没有关系
    */
    var x = 1;
    function foo(x, y = function () { x = 2; }) {
        x = 3;
        y();
        console.log(x);
    }

    foo() // 2
    x // 1
}
{
    /* 
        这个例子：
            函数参数使用默认值，自成一个作用域，作用域中使用 let 定义了 y 
            y的值（函数）中使用的 x 在这个参数作用域中没有，会去全局找
            foo函数内部 没有 使用 var 定义变量 x，只是修改x，所以没有自成一个作用域
            这里的 x = 3 修改的就是全局的这个 x
            之后 执行函数 y ，再次修改了这个 x = 2
            最后console 的这个 x 就是 全局的这个 x
            所以这个时候全局的这个 x 就与他们有关了
    */
    var x = 1;
    function foo(y = function () { x = 2; }) {
        x = 3;
        y();
        console.log(x);
    }

    foo() // 2
    x // 2
}
{
    /* 
        这个例子：
            函数参数使用默认值，自成一个作用域，作用域中使用 let 定义了 y 
            y的值（函数）中使用的 x 在这个参数作用域中没有，会去全局找
            foo函数内部使用了 var 定义变量 x，自成一个作用域
            foo函数在就属于一个独立的，按 ES5 的执行来

            当执行到 y() 的时候 这个 y值（函数）中的 x 指的是全局的这个 x 所以全局的这个 x = 2了
            
            所以这个时候全局的这个 x 只与 y 有关系
    */
    var x = 1;
    function foo(y = function () { x = 2; }) {
        var x = 3;
        y();
        console.log(x);
    }

    foo() // 3
    x // 2
}
```