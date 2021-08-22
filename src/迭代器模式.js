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


// 外部迭代器 调用方式复杂 但是调用面广

var Iterator = function (obj) {
    var current = 0;

    var next = function () {
        current += 1;
    };

    var isDone = function () {
        return current >= obj.length;
    };

    var getCurrItem = function () {
        return obj[current];
    };

    return {
        next: next,
        isDone: isDone,
        getCurrItem: getCurrItem
    }
};

var compare = function (iterator1, iterator2) {
    while (!iterator1.isDone() && !iterator2.isDone()) {
        if (iterator1.getCurrItem() !== iterator2.getCurrItem()) {
            throw new Error('iterator1和iterator2不相等');
        }
        iterator1.next();
        iterator2.next();
    }

    console.log('iterator1和iterator2相等');
}

var iterator1 = Iterator([1, 2, 3]);
var iterator2 = Iterator([1, 2, 3]);

compare(iterator1, iterator2); // 输出：iterator1和iterator2相等


// 中止迭代器

var each1 = function (ary, callback) {
    for (var i = 0, l = ary.length; i < l; i++) {
        if (callback(i, ary[i]) === false) { // callback的执行结果返回false，提前终止迭代
            break;
        }
    }
};

each1([1, 2, 3, 4, 5], function (i, n) {
    if (n > 3) { // n大于3的时候终止循环
        return false;
    }
    console.log(n); // 分别输出：1, 2, 3
});

/**
 * ES6规定，任何具有Symbol.iterator属性的数据结构，都可以被for-of 循环，其背后是对next方法的反复调用
 */

function iteratorGenerator(list) {
    // idx记录当前访问的索引
    var idx = 0
    // len记录传入集合的长度
    var len = list.length
    return {
        // 自定义next方法
        next: function () {
            // 如果索引还没有超出集合长度，done为false
            var done = idx >= len
            // 如果done为false，则可以继续取值
            var value = !done ? list[idx++] : undefined

            // 将当前值与遍历是否完毕（done）返回
            return {
                done: done,
                value: value
            }
        }
    }
}

const iterator3 = iteratorGenerator(['1号', '2号', '3号']);
console.log(iterator3.next());
console.log(iterator3.next());
console.log(iterator3.next());
