// 装饰者模式能够在不改变对象自身的基础上，在程序运行期间给对象动态地添加职责。

// 装饰器就是典型的装饰者模式，通过二次封装对象，达到某些效果，也可以理解为包装器

/**
 * 代理模式和装饰者模式最重要的区别在于它们的意图和设计目的。
 * 代理模式的目的是，当直接访问本体不方便或者不符合需要时，为这个本体提供一个替代者。
 * 本体定义了关键功能，而代理提供或拒绝对它的访问，或者在访问本体之前做一些额外的事情。
 * 
 * 装饰者模式的作用就是为对象动态加入行为。
 * 换句话说，代理模式强调一种关系（Proxy与它的实体之间的关系），这种关系可以静态的表达，
 * 也就是说，这种关系在一开始就可以被确定。而装饰者模式用于一开始不能确定对象的全部功能时。
 * 代理模式通常只有一层代理-本体的引用，而装饰者模式经常会形成一条长长的装饰链。
 */

Function.prototype.before = function (beforefn) {
    var __self = this; // 保存原函数的引用
    return function () { // 返回包含了原函数和新函数的"代理"函数
        beforefn.apply(this, arguments); // 执行新函数，且保证this不被劫持，新函数接受的参数
        // 也会被原封不动地传入原函数，新函数在原函数之前执行
        return __self.apply(this, arguments); // 执行原函数并返回原函数的执行结果，
        // 并且保证this不被劫持
    }
}

Function.prototype.after = function (afterfn) {
    var __self = this;
    return function () {
        var ret = __self.apply(this, arguments);
        afterfn.apply(this, arguments);
        return ret;
    }
};

window.onload = function () {
    console.log(1);
}

window.onload = (window.onload || function () {}).after(function () {
    console.log(2);
}).after(function () {
    console.log(3);
}).after(function () {
    console.log(4);
});

var before = function (fn, beforefn) {
    return function () {
        beforefn.apply(this, arguments);
        return fn.apply(this, arguments);
    }
}

var a = before(
    function () {
        console.log(3)
    },
    function () {
        console.log(2)
    }
);

a = before(a, function () {
    console.log(1);
});
a();