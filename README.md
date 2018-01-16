
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
```
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

## 数组
```javascript   
{
    // ...
    // 扩展运算符（spread）是三个点（...），可以将一个数组或者类数组转化为一个使用 ， 分割的序列
    // 所以可以使用此方法讲一个类数组转换为真正的数组
    let add = [...document.getElementsByTagName("div")]

    // 如果扩展运算符后面是一个空数组，则不产生任何效果。
    var arr = [...[], 1]
    // arr [1]

    // 使用扩展运算可以不用在调用apply传参
    // ES5 的写法
    Math.max.apply(null, [14, 3, 77])

    // ES6 的写法
    Math.max(...[14, 3, 77])

    // 等同于
    Math.max(14, 3, 77);

    // 如果将扩展运算符用于数组赋值，只能放在参数的最后一位，否则会报错。
    // 扩展运算符在数组中只能是最后一个
    const [...butLast, last] = [1, 2, 3, 4, 5];
    // 报错

    // 扩展运算符还可以将字符串转为真正的数组。
    [...'hello']
    // [ "h", "e", "l", "l", "o" ]
}
{
    // Array.form
    /* 
        ...无法转换对象
        Array.form：可以将对象转换为数组
        任何 有length属性 的对象，都可以通过Array.from方法转为数组，而此时扩展运算符就无法转换。
        
        所以如果是对象，需要是下面的这种形式，即必须拥有 length 属性
        let arrayLike = {
            '0': 'a',
            '1': 'b',
            '2': 'c',
            length: 3
        };
    */
    var arrayLike = {
        '0': 'a',
        '1': 'b',
        '2': 'c',
        length: 3
    };
    
    // ES5的写法
    var arr1 = [].slice.call(arrayLike); // ['a', 'b', 'c']
    
    // ES6的写法
    var arr2 = Array.from(arrayLike); // ['a', 'b', 'c']

    /* 
        ... 与 Array.from都可以将 字符串，Set与 Map结构的数据转换为数组
    */
    Array.from('hello')
    // ['h', 'e', 'l', 'l', 'o']

    let namesSet = new Set(['a', 'b'])
    Array.from(namesSet) // ['a', 'b']

    // Array.from还可以接受第二个参数，作用类似于数组的map方法，用来对每个元素进行处理，将处理后的值放入返回的数组。
    Array.from(arrayLike, x => x * x);
    // 等同于
    Array.from(arrayLike).map(x => x * x);
    // 如果map函数里面用到了this关键字，还可以传入Array.from的第三个参数，用来绑定this。
}
{
    // Array.of：Array.of方法用于将一组值，转换为数组。
    Array.of(3, 11, 8) // [3,11,8]
    Array.of(3) // [3]
    Array.of() // []

    /*     
        数组实例的copyWithin方法
        target（必需）：从该位置开始替换数据。如果为负值，表示倒数。
        start（可选）：从该位置开始读取数据，默认为 0。如果为负值，表示倒数。
        end（可选）：到该位置前停止读取数据，默认等于数组长度。如果为负值，表示倒数。
    */
    // 复制从 3开始 及以后的数组项 
    [1, 2, 3, 4, 5].copyWithin(0, 3)
    // [4, 5, 3, 4, 5]
    
    // 将3号位复制到0号位
    [1, 2, 3, 4, 5].copyWithin(0, 3, 4)
    // [4, 2, 3, 4, 5]

    // 数组实例的find方法，用于找出第一个符合条件的数组成员。没有则为 undefined
    // 参数与 forEach 一样
    [1, 4, -5, 10].find((item,index,arr) => item < 0) // -5

    // 数组实例的 findIndex 方法 则是返回这个 index
    [1, 4, -5, 10].find((item,index,arr) => item < 0) // 2


    // fill方法使用给定值，填充一个数组，
    ['a', 'b', 'c'].fill(7)  // [7, 7, 7]
    // fill方法还可以接受第二个和第三个参数，用于指定填充的起始位置和结束位置
    ['a', 'b', 'c'].fill(7, 1, 2) // ['a', 7, 'c']

    /* 
        entries()，keys()和values()
            可以用for...of循环进行遍历，唯一的区别是
            keys()是对键名的遍历
            values()是对键值的遍历
            entries()是对键值对的遍历 
    */

    for (let index of ['a', 'b'].keys()) {
        console.log(index);
    }
    // 0
    // 1
    
    for (let elem of ['a', 'b'].values()) {
        console.log(elem);
    }
    // 'a'
    // 'b'
    
    for (let [index, elem] of ['a', 'b'].entries()) {
        console.log(index, elem);
    }
    // 0 "a"
    // 1 "b"

    // 数组实例的 includes() 判断数组中是否包含这一项，返回一个布尔值
    // 该方法的第二个参数表示搜索的起始位置，默认为0
    // 使用此方法替代 indexOf
    [1, 2, 3].includes(2)     // true
    [1, 2, 3].includes(4)     // false
    [1, 2, NaN].includes(NaN) // true
    [1, 2, 3].includes(3, 3);  // false
    [1, 2, 3].includes(3, -1); // true
}
```

## 对象
```javascript
{
    var foo = "111";
    // 简写
    var obj = {foo}
    // 等同于
    var obj = {foo: foo} 

    var o = {
        method() {
          return "Hello!";
        }
    };
      // 等同于
    var o = {
        method: function() {
            return "Hello!";
        }
    };
}
{
    // ES6 允许字面量定义对象时，允许把表达式放在方括号内。
    var propKey = 'foo';

    var obj = {
        [propKey]: true,
        ['a' + 'bc']: 123
    };

    var obj = {
        ['h' + 'ello']() {
            return 'hi';
        }
    };
      
    obj.hello() // hi
}
{
    // 方法
    // Object.is() 它用来比较两个值是否严格相等，与严格比较运算符（===）的行为基本一致。
    // 但是：下面两个是例外
    +0 === -0 //true
    NaN === NaN // false

    Object.is(+0, -0) // false
    Object.is(NaN, NaN) // true

    // Object.assign
    // 方法用于对象的合并，将源对象（source）的所有可枚举属性，复制到目标对象（target）。
    const target = { a: 1, b: 1 };
    const source1 = { b: 2, c: 2 };
    const source2 = { c: 3 };
    Object.assign(target, source1, source2);
    // target // {a:1, b:2, c:3}
    
    // 第一个参数是目标对象，后面的参数都是源对象。
    // 注意，如果目标对象与源对象有同名属性，或多个源对象有同名属性，则后面的属性会覆盖前面的属性。
    // 如果只有一个参数，Object.assign会直接返回该参数。
    const obj = {a: 1};
    Object.assign(obj) === obj // true

    // 如果该参数不是对象，则会先转成对象，然后返回。
    // 由于undefined和null无法转成对象，所以如果它们作为参数，就会报错。

    // Object.assign拷贝的属性是有限制的，只拷贝源对象的自身属性（不拷贝继承属性），也不拷贝不可枚举的属性（enumerable: false）。
    function clone(origin) {
        return Object.assign({}, origin);
    }
    // 如果想要保持继承链，可以采用下面的代码。
    function clone(origin) {
        let originProto = Object.getPrototypeOf(origin);
        return Object.assign(Object.create(originProto), origin);
    }
}
{
    // super 关键字
    /* 
        我们知道，this关键字总是指向函数所在的当前对象
        ES6 又新增了另一个类似的关键字super，指向当前对象的原型对象
        super关键字表示原型对象时，只能用在对象的方法之中，用在其他地方都会报错。
    */
}
{
    // Object.keys()，Object.values()，Object.entries()
    var obj = { foo: 'bar', baz: 42 };

    // Object.keys()
    Object.keys(obj) // ["foo", "baz"]

    // Object.values()
    Object.values(obj) // ["bar", 42]
    // Object.values只返回对象自身的可遍历属性。
    const obj = Object.create({}, {p: {value: 42}});
    Object.values(obj) // []
    
    // Object.entries()
    // Object.entries方法返回一个数组，成员是参数对象自身的（不含继承的）所有可遍历（enumerable）属性的键值对数组。
    const obj = { foo: 'bar', baz: 42 };
    Object.entries(obj)
    // [ ["foo", "bar"], ["baz", 42] ]
}
{
    // ES2017中使用 扩展了对象 对象可以使用 ...
    let { x, y, ...z } = { x: 1, y: 2, a: 3, b: 4 };
    x // 1
    y // 2
    z // { a: 3, b: 4 }
}
{
    // Null 传导运算符( ?. )
    var firstName = (message
        && message.body
        && message.body.user
        && message.body.user.firstName) || 'default';
    
    // 等同于
    var firstName = message?.body?.user?.firstName || 'default';
}
```
## Promise对象
```javascript
{
    // 所谓Promise，简单说就是一个容器，里面保存着某个未来才会结束的事件（通常是一个异步操作）的结果。
    // Promise是一个对象
    /* 
        两个特点：
            1、对象的状态不受外界影响。
            Promise对象代表一个异步操作，有三种状态：pending（进行中）、fulfilled（已成功）和rejected（已失败）。
            只有 异步操作 的结果，可以决定当前是哪一种状态，任何其他操作都无法改变这个状态。
            2、一旦状态改变，就不会再变，任何时候都可以得到这个结果。
            Promise对象的状态改变，只有两种可能：从pending变为fulfilled和从pending变为rejected。
            只要这两种情况发生，状态就凝固了，不会再变了，会一直保持这个结果，这时就称为 resolved（已定型）。
    */
}
{
    // 基本用法
    const promise = new Promise(function(resolve, reject) {
        // ... some code
      
        if (/* 异步操作成功 */){
          resolve(value);
        } else {
          reject(error);
        }
    });

    // Promise构造函数接收一个函数作为参数，该函数接收连个参数，且都是函数，固定的两个
    // resolve函数的作用是 ===> pending to resolve 异步操作成功时调用
    // reject函数的作用是 ===> pending to reject 异步操作失败时调用

    // Promise实例生成以后，可以用then方法分别指定resolved状态和rejected状态的回调函数。
    // 这也是使用 fetch函数的原因
    promise.then(function(value) {
        // success ===> resolved ===> 得到请求结果 value
      }, function(error) {
        // failure ===> rejected
    });

    let promise = new Promise(function(resolve, reject) {
        console.log('Promise');
        resolve();
    });
    
    // Promise 新建后就会立即执行。
    promise.then(function() {
        console.log('resolved.');
    });
    
    console.log('Hi!');
    
    // Promise
    // Hi!
    // resolved
}
{
    /* 
        上面代码中，p1是一个 Promise，3 秒之后变为rejected。
        p2的状态在 1 秒之后改变，resolve方法返回的是p1。
        由于p2返回的是另一个 Promise，导致p2自己的状态无效了，由p1的状态决定p2的状态。
        所以，后面的then语句都变成针对后者（p1）。
        又过了 2 秒，p1变为rejected，导致触发catch方法指定的回调函数。
    */
    const p1 = new Promise(function (resolve, reject) {
        setTimeout(() => reject(new Error('fail')), 3000)
    })
    const p2 = new Promise(function (resolve, reject) {
        setTimeout(() => resolve(p1), 1000)
    })
    p2
        .then(result => console.log(result))
        .catch(error => console.log(error))
        // Error: fail
}
{
    // Promise.prototype.then()
    // then方法的第一个参数是resolved状态的回调函数，第二个参数（可选）是rejected状态的回调函数。
    // then方法返回的是一个新的Promise实例（注意，不是原来那个Promise实例）。因此可以采用链式写法，即then方法后面再调用另一个then方法。
    getJSON("/post/1.json").then(
        post => getJSON(post.commentURL)
    ).then(
        comments => console.log("resolved: ", comments),
        err => console.log("rejected: ", err)
    );
}
{
    // Promise.prototype.catch()
    // Promise.prototype.catch方法是.then(null, rejection)的别名，用于指定发生错误时的回调函数
    // catch用于捕获Promise的错误，放在最后，无论前面哪一个环节出问题都会捕获到这个错误
    // catch方法返回的还是一个 Promise 对象，因此后面还可以接着调用then方法。
    getJSON('/post/1.json').then(function(post) {
        return getJSON(post.commentURL);
    }).then(function(comments) {
    // some code
    }).catch(function(error) {
    // 一共有三个 Promise 对象：一个由getJSON产生，两个由then产生。它们之中任何一个抛出的错误，都会被最后一个catch捕获。
    });

    // 这也就导致一般不用用 reject 时候的函数，而是直接使用 catch
}
{
    // Promise 内部的错误不会影响到 Promise 外部的代码
}
{
    // Promise.all()  Promise.race()与 Promise.all()方法效果相同
    // Promise.all方法用于将多个 Promise 实例，包装成一个新的 Promise 实例。
    // Promise.all方法接受一个数组作为参数
    /* 
        p1、p2、p3都是 Promise 实例，如果不是，就会先调用下面讲到的Promise.resolve方法，
        将参数转为 Promise 实例，再进一步处理。（Promise.all方法的参数可以不是数组，
        但必须具有 Iterator 接口，且返回的每个成员都是 Promise 实例。）
    */
    // p1,p2,p3是且的关系，三个都是 fulfilled 那 p 就是fulfilled 否则就是 rejected
    const p = Promise.all([p1, p2, p3]);
    
}
{
    // Promise.resolve()
    // 将现有对象转为 Promise 对象

}
{
    // Promise.reject(reason)
    // Promise.reject(reason)方法也会返回一个新的 Promise 实例，该实例的状态为rejected。
}
```
## Iterator 和 for...of 循环
```javascript
{
    // Iterator（遍历器）的概念
    /* 
        遍历器（Iterator，。它是一种接口，为各种不同的数据结构提供统一的访问机制。
        任何数据结构只要部署 Iterator 接口，就可以完成遍历操作（即依次处理该数据结构的所有成员）。

        用于遍历表示“集合”的数据结构：Array Object Map Set TypedArray 函数的arguments对象 NodeList对象

        Iterator 的作用有三个：
        一是为各种数据结构，提供一个统一的、简便的访问接口；
        二是使得数据结构的成员能够按某种次序排列；
        三是 ES6 创造了一种新的遍历命令for...of循环，Iterator 接口主要供for...of消费。
    */
}
{
    // 调用 Iterator 接口的场合
    // 有一些场合会默认调用 Iterator 接口（即Symbol.iterator方法）
    /* 
        （1）解构赋值：对数组和 Set 结构进行解构赋值时，会默认调用Symbol.iterator方法。
        （2）扩展运算符：扩展运算符（...）也会调用默认的 Iterator 接口。
        （3）yield*：yield*后面跟的是一个可遍历的结构，它会调用该结构的遍历器接口。
        （4）其他场合
            for...of
            Array.from()
            Map(), Set(), WeakMap(), WeakSet()（比如new Map([['a',1],['b',2]])）
            Promise.all()
            Promise.race()
    
    */
    // 原理就是调用 Iterator 的 next() 方法
}
{
    // 字符串是一个类似数组的对象，也原生具有 Iterator 接口。
}
{
    // 遍历器对象的 return()，throw()
    // 遍历器对象除了具有next方法，还可以具有return方法和throw方法。
    // 如果你自己写遍历器对象生成函数，那么next方法是必须部署的，return方法和throw方法是否部署是可选的。
}
{
    /* 
        for...of 循环
        ES6 借鉴 C++、Java、C# 和 Python 语言，引入了for...of循环，作为遍历所有数据结构的统一的方法。

        一个数据结构只要部署了Symbol.iterator属性，就被视为具有 iterator 接口，
        d就可以用for...of循环遍历它的成员。也就是说，for...of循环内部调用的是数据结构的Symbol.iterator方法。

        for...of循环可以使用的范围包括
        数组、
        Set 和 Map 结构、
        某些类似数组的对象（比如arguments对象、DOM NodeList 对象）、
        Generator 对象，
        字符串。
    */
    // 数组
    // JavaScript 原有的for...in循环，只能获得对象的键名，不能直接获取键值。
    // ES6 提供for...of循环，允许遍历获得键值。
    var arr = ['a', 'b', 'c', 'd'];
    
    for (let a in arr) {
        console.log(a); // 0 1 2 3
    }
    
    for (let a of arr) {
        console.log(a); // a b c d
    }
    // for...of循环调用遍历器接口，数组的遍历器接口只返回具有数字索引的属性。
    let arr = [3, 5, 7];
    arr.foo = 'hello';

    for (let i in arr) {
        console.log(i); // "0", "1", "2", "foo"
    }

    for (let i of arr) {
        console.log(i); //  "3", "5", "7"
    }
}
```

## Generator 函数的语法
```javascript
{
    /* 
        调用 Generator 函数，返回一个遍历器对象（所以可以使用 for ... of ），代表 Generator 函数的内部指针。
        以后，每次调用遍历器对象的next方法，就会返回一个有着value和done（是否完成遍历）两个属性的对象。
        每次调用next方法，内部指针就从函数头部或上一次停下来的地方开始执行，直到遇到下一个yield表达式（或return语句）为止。
        value属性表示当前的内部状态的值，是yield表达式后面那个表达式的值；
        done属性是一个布尔值，表示是否遍历结束。
    */
    function* helloWorldGenerator() {
        yield 'hello';
        yield 'world';
        return 'ending';
    }
    
    // 调用并不会立即执行，而是返回一个遍历器对象，代表 Generator 函数的内部指针
    var hw = helloWorldGenerator();
    hw.next()
    // { value: 'hello', done: false }
    hw.next()
    // { value: 'world', done: false }
    hw.next()
    // { value: 'ending', done: true }
    hw.next()
    // { value: undefined, done: true }
    // 上面代码一共调用了四次next方法。
=======

## Symbol
```javascript
{
    /* 
        ES6 引入了一种新的原始数据类型Symbol，表示独一无二的值。

    */
    // 创建一个 Symbol , 不能使用 new 命名
    // 这是因为生成的 Symbol 是一个原始类型的值，不是对象。
    // 也就是说，由于 Symbol 值不是对象，所以不能添加属性。
    // 基本上，它是一种类似于字符串的数据类型。
    var s = Symbol();
    typeof s; // "symbol"

    // Symbol函数可以接受一个字符串作为参数，表示对 Symbol 实例的描述，
    // 主要是为了在控制台显示，或者转为字符串时，比较容易区分。
    // 如果不加参数，它们在控制台的输出都是Symbol()，不利于区分。

    let s1 = Symbol('foo');
    let s2 = Symbol('bar');

    s1 // Symbol(foo)
    s2 // Symbol(bar)

    s1.toString() // "Symbol(foo)"
    s2.toString() // "Symbol(bar)"

    // Symbol函数的返回值是不相等的。无论有没有参数或者参数是否相等
    // 使用 Symbol.for 返回就是相等的

    Symbol.for("bar") === Symbol.for("bar")
    // true

    Symbol("bar") === Symbol("bar")
    // false

    // Symbol.keyFor方法返回一个已登记的 Symbol 类型值的key。
    let s1 = Symbol.for("foo");
    Symbol.keyFor(s1) // "foo"

    let s2 = Symbol("foo");
    Symbol.keyFor(s2) // undefined


    var mySymbol = Symbol();

    // 第一种写法
    var a = {};
    a[mySymbol] = 'Hello!';

    // 第二种写法
    var a = {
        [mySymbol]: 'Hello!'
    };

    // 第三种写法
    var a = {};
    Object.defineProperty(a, mySymbol, { value: 'Hello!' });

    // 以上写法都得到同样结果
    a[mySymbol] // "Hello!"

    a.mySymbol = 'Hello!';
    a[mySymbol] // undefined
    a['mySymbol'] // "Hello!"
}
{
    // 模仿字符串就是：在代码之中多次出现、与代码形成强耦合的某一个具体的字符串或者数值。
    // 比如 switch 的 case 中的字符串就是一个魔法字符串，因为这个值与case完全耦合
    // 此时可以把他放在一个对象中，值为一个Symbol

    const shapeType = {
        triangle: Symbol()
    };
    function getArea(shape, options) {
        let area = 0;
        switch (shape) {
            case shapeType.triangle:
                area = .5 * options.width * options.height;
                break;
        }
        return area;
    }
    getArea(shapeType.triangle, { width: 100, height: 100 });
}
{
    // Symbol的内置方法，不做解释
}
```
## Set 与 Map 数据结构
```javascript
{
    // Set
    // ES6 提供了新的数据结构 Set。它类似于数组，但是成员的值都是唯一的，没有重复的值。
    const s = new Set();

    var arr = [2, 3, 5, 4, 5, 2, 2];
    arr.forEach(x => s.add(x));

    for (let i of s) {
        console.log(i);
    };
    // 2 3 5 4

    // 所以，可是数组去重了

    /* 
        使用 new Set() 时，NaN的值是相等的，对象是不登的
    */
}
{
    /* 
        Set 实例的属性和方法
            Set 结构的实例有以下属性。

            Set.prototype.constructor：构造函数，默认就是Set函数。
            Set.prototype.size：返回Set实例的成员总数。
            Set 实例的方法分为两大类：操作方法（用于操作数据）和遍历方法（用于遍历成员）。下面先介绍四个操作方法。

            add(value)：添加某个值，返回 Set 结构本身。
            delete(value)：删除某个值，返回一个布尔值，表示删除是否成功。
            has(value)：返回一个布尔值，表示该值是否为Set的成员。
            clear()：清除所有成员，没有返回值。
    */
}
{
    /* 
        遍历操作
            Set 结构的实例有四个遍历方法，可以用于遍历成员。

            keys()：返回键名的遍历器
            values()：返回键值的遍历器
            entries()：返回键值对的遍历器
            forEach()：使用回调函数遍历每个成员
    */
}
{
    /* 
        WeakSet
        WeakSet 结构与 Set 类似，也是不重复的值的集合。但是，它与 Set 有两个区别。
            首先，WeakSet 的成员只能是对象，而不能是其他类型的值。
            其次，WeakSet 中的对象都是弱引用，即垃圾回收机制不考虑 WeakSet 对该对象的引用，
            也就是说，如果其他对象都不再引用该对象，那么垃圾回收机制会自动回收该对象所占用的内存，
            不考虑该对象还存在于 WeakSet 之中。
    */
}
{
    // Map
    /* 
    Map 数据结构。它类似于对象，也是键值对的集合，但是“键”的范围不限于字符串，
    各种类型的值（包括对象）都可以当作键。
    也就是说，Object 结构提供了“字符串—值”的对应，Map 结构提供了“值—值”的对应，是一种更完善的 Hash 结构实现。
    如果你需要“键值对”的数据结构，Map 比 Object 更合适。
    */

    /* 
        Map方法：
            size属性返回 Map 结构的成员总数。
            set方法设置键名key对应的键值为value，然后返回整个 Map 结构。如果key已经有值，则键值会被更新，否则就新生成该键。
            get方法读取key对应的键值，如果找不到key，返回undefined。
            has方法返回一个布尔值，表示某个键是否在当前 Map 对象之中。
            delete方法删除某个键，返回true。如果删除失败，返回false。
            clear方法清除所有成员，没有返回值。
    */
    /* 
        遍历方法
            Map 结构原生提供三个遍历器生成函数和一个遍历方法。

            keys()：返回键名的遍历器。
            values()：返回键值的遍历器。
            entries()：返回所有成员的遍历器。
            forEach()：遍历 Map 的所有成员。
    */
}
{
    // WeakMap
    /* 
        WeakMap 结构与Map结构类似，也是用于生成键值对的集合。
            首先，WeakMap只接受对象作为键名（null除外），不接受其他类型的值作为键名。
            其次，WeakMap的键名所指向的对象，不计入垃圾回收机制。
    */
}
```