/**
 * 代理模式是为一个对象提供一个代用品或占位符，以便控制对它的访问
 */

// 保护代理：用于对象拥有不同访问权限的情况
// 虚拟代理：当真正调用到对象的时候，代理才实例化这个对象
// 事件代理：父元素下有多个子元素，都需要绑定事件，这个时候只需要在父元素上绑定事件就可以 （事件冒泡）

// 图片预加载就是一种比较好的代理模式，首先是图片位置使用占位图片，当图片资源请求回来后，再用一个新的图片dom替换占位图片

var myImage = (function () {
    var imgNode = document.createElement('img');
    document.body.appendChild(imgNode);

    return {
        setSrc: function (src) {
            imgNode.src = src;
        }
    }
})();

var proxyImage = (function () {
    var img = new Image;
    img.onload = function () {
        myImage.setSrc(this.src);
    }
    return {
        setSrc: function (src) {
            myImage.setSrc('file:// /C:/Users/svenzeng/Desktop/loading.gif');
            img.src = src;
        }
    }
})();

proxyImage.setSrc('http://“imgcache.qq.com/music/photo/k/000GGDys0yA0Nk.jpg');

/**
 * 符合单一职责、开闭原则，将预加载的占位图片和需要显示的图片的加载分开。
 * 
 * 代理接收请求的过程是透明的（用户看不到的），用户并不清楚本体和代理的区别。
 * 这样做可以让用户放心的请求代理，并且在任何使用本体的地方都可以使用代理
 */

// 缓存代理
var mult = function () {
    console.log('开始计算乘积');
    var a = 1;
    for (var i = 0, l = arguments.length; i < l; i++) {
        a = a * arguments[i];
    }
    return a;
};
var proxyMult = (function () {
    var cache = {};
    return function () {
        var args = Array.prototype.join.call(arguments, ',');
        if (args in cache) {
            return cache[args];
        }
        return cache[args] = mult.apply(this, arguments);
    }
})();

console.log(proxyMult(1, 2, 3, 4)); // 24
console.log(proxyMult(1, 2, 3, 4)); // 24
