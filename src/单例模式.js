/**
 * 单例模式想要做的是不管创建多少次，它都只给你返回第一次所创建的那唯一的一个实例
 * 开发时需要判断是否已经创建过一个实例了
 */

class SingleDog {
    show() {
        console.log('这是一个单例')
    }
    static getInstance() {
        // SingleDog.instance存储new之后的实例，所以用SingleDog.instance进行判断
        if (!SingleDog.instance) {
            // 若这个唯一的实例不存在，那么先创建它
            SingleDog.instance = new SingleDog()
        }
        // 如果这个唯一的实例已经存在，则直接返回
        return SingleDog.instance
    }
}

// 闭包的方式进行创建
// SingleDog.getInstance = (function() {
//     // 定义自由变量instance，模拟私有变量
//     let instance = null
//     return function() {
//         // 判断自由变量是否为null
//         if(!instance) {
//             // 如果为null则new出唯一实例
//             instance = new SingleDog()
//         }
//         return instance
//     }
// })()

const s1 = SingleDog.getInstance()
const s2 = SingleDog.getInstance()
console.log(s1 === s2) // true


// 使用代理
var CreateDiv = function (html) {
    this.html = html;
    this.init();
};

CreateDiv.prototype.init = function () {
    var div = document.createElement('div');
    div.innerHTML = this.html;
    document.body.appendChild(div);
}

var ProxySingletonCreateDiv = (function () {
    var instance;
    return function (html) {
        if (!instance) {
            instance = new CreateDiv(html);
        }

        return instance;
    }

})();

var a = new ProxySingletonCreateDiv('sven1');
var b = new ProxySingletonCreateDiv('sven2');

alert(a === b);

// 最好的情况是使用的时候才创建，而不是事先就创建 惰性单例

/**
 * 单例模式的使用？
 * Vuex和Redux 中的全局Store
 */