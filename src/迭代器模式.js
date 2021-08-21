/**
 * 迭代器模式是指提供一种方法顺序访问一个聚合对象中的各个元素，而又不需要暴露该对象的内部表示。
 * 迭代器模式可以把迭代的过程从业务逻辑中分离出来，在使用迭代器模式之后，即使不关心对象的内部构造，也可以按顺序访问其中的每个元素。
 */

// 内部迭代器  内部函数已经定义好了迭代规则，无法进行扩展
var each = function (arr, callback) {
    for (let i = 0; i < arr.length; i++) {
        callback.call(arr, i, arr[i]);
    }
}

each([10, 20, 30], (index, item) => {
    console.log(index, item);
})


// 外部迭代器
