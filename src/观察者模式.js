/**
 * 发布-订阅模式 观察者模式
 * 观察者模式定义了一种一对多的依赖关系，让多个观察者对象同时监听某一个目标对象，
 * 当这个目标对象的状态发生变化时，会通知所有观察者对象，使它们能够自动更新。
 * 
 * 优点：为时间和对象之间解耦
 * 缺点：消耗时间和内存，如果订阅后没有发布，则订阅者会一直存在于内存中
 * 
 * 观察者模式和发布-订阅模式之间的区别，在于是否存在第三方、发布者能否直接感知订阅者
 * 所以选择两者模式的主要区别是看具体逻辑是否需要完全解耦，发布-订阅模式是完全的解耦的。
 * 观察者模式中，被观察者必须去维护一套观察者的集合，这些观察者必须实现统一的方法供被观察者调用
 */

const observer = {
    clientMap: {},
    listen: function (key, fn) {
        if (!this.clientMap[key]) {
            this.clientMap[key] = [];
        }
        this.clientMap[key].push(fn);
    },
    trigger: function (key, ...args) {
        var fns = this.clientMap[key];
        if (!(fns?.length)) {
            return false;
        }
        for (let i = 0; i < fns.length; i++) {
            fns[i].apply(this, args);
        }
    },
    remove: function (key, fn) {
        var fns = this.clientMap[key];

        if (!fns) { // 如果key对应的消息没有被人订阅，则直接返回
            return false;
        }
        if (!fn) { // 如果没有传入具体的回调函数，表示需要取消key对应消息的所有订阅
            fns && (fns.length = 0);
        } else {
            for (var l = fns.length - 1; l >= 0; l--) { // 反向遍历订阅的回调函数列表
                var _fn = fns[l];
                if (_fn === fn) {
                    fns.splice(l, 1); // 删除订阅者的回调函数
                }
            }
        }
    }
}

var installEvent = function (obj) {
    for (var i in observer) {
        obj[i] = observer[i];
    }
};
var salesOffices = {};
installEvent(salesOffices);
observer.listen('start', function (name, age) {
    console.log(name, age);
})

observer.listen('start', function (name, age) {
    console.log(name, age);
})

observer.listen('end', function (name, age) {
    console.log(name, age);
})

setTimeout(() => {
    observer.trigger('start', 'wang', 20);
}, 1000)


// 定义发布者类
class Publisher {
    constructor() {
        this.observers = []
        console.log('Publisher created')
    }
    // 增加订阅者
    add(observer) {
        console.log('Publisher.add invoked')
        this.observers.push(observer)
    }
    // 移除订阅者
    remove(observer) {
        console.log('Publisher.remove invoked')
        this.observers.forEach((item, i) => {
            if (item === observer) {
                this.observers.splice(i, 1)
            }
        })
    }
    // 通知所有订阅者
    notify() {
        console.log('Publisher.notify invoked')
        this.observers.forEach((observer) => {
            observer.update(this)
        })
    }
}

// 定义订阅者类
class Observer {
    constructor() {
        console.log('Observer created')
    }

    update() {
        console.log('Observer.update invoked')
    }
}

// Vue双向数据绑定实现原理
/**
 * 在 Vue 中，每个组件实例都有相应的 watcher 实例对象，它会在组件渲染的过程中把属性记录为依赖，
 * 之后当依赖项的 setter 被调用时，会通知 watcher 重新计算，从而致使它关联的组件得以更新——这是一个典型的观察者模式。
 * 
 * observer（监听器） watcher（订阅者）compile（编译器）
 * 
 * Event Bus/ Event Emitter
 */
