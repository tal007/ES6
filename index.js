/**
 * 作业：刘玉田
 * 邮箱：liuyutian_web@163.com
 * 博客：http://www.lytblog.com
 */

//  let and const
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
{
    // 暂时性死区
    // 所谓暂时性死区就是在使用 let或者 const 定义变量之前的这一个区域，在这个区域里面是无法获取到这个变量的
    // 简单的说就是没有变量提示了
    // console.log(a);  // 此时的这两个 a 取拿不到的
    // let b = a;  // 此时的这两个 a 取拿不到的
    let a = "1";

    // 还有一种情况就是在函数里面，下面这个函数中的两个变量就是暂时性死区
    function bar1(x = y,y = 2){
        return [x, y]
    }
    // 这个就不会，因为在 y 在 = x 的时候，x已近存在了
    function bar1(x = 2, y = x) {
        return [x, y]
    }
}
{
    // 以下两个变量 a在不同的作用域中，互不影响
    // 可以理解为，在ES6中，一个{}就是一个块级作用域
    // 当然，子作用域可以拿到父作用域的变量
    {{{let a = "1";{
        let a = "2";
    }}}}
}
{
    // const 命令用于声明一个常量，实际上保证的是这个变量指向的内存地址不得改动。
    // 对于简单类型的数据（数值、字符串、布尔值），值就保存在变量指向的那个内存地址，因此等同于常量。
    // 但对于复合类型的数据（主要是对象和数组），变量指向的内存地址，保存的只是一个指针，
    // const只能保证这个指针是固定的，至于它指向的数据结构是不是可变的，就完全不能控制了。
    // 因此，将一个对象声明为常量必须非常小心。

    // 常量 a 是一个数字
    const a = 1;
    // b 是一个对象，但是对象的属性可读可写，只是这个对象的指针指向的内存地址不会改变
    const b = {};
    b.name = "嘻嘻";
    b.age = "18";
    // 如果把 b赋值为另一个值，就是修改了这个指针指向的内存抵值券就会报错。
    // b = []; // Uncaught TypeError: Assignment to constant variable.

}

// 变量的结构赋值
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

// 字符串的扩展
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

// 数值的扩展
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
// 函数
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

// 数组
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

// 对象
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