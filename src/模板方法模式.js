/**
 * 模板方法模式
 * 
 * 模板方法模式由两部分结构组成，第一部分是抽象父类，第二部分是具体的实现子类。
 * 通常在抽象父类中封装了子类的算法框架，包括实现一些公共方法以及封装子类中所有方法的执行顺序。
 * 子类通过继承这个抽象类，也继承了整个算法结构，并且可以选择重写父类的方法。
 */

var Beverage = function () {};

Beverage.prototype.boilWater = function () {
    console.log('把水煮沸');
};
Beverage.prototype.brew = function () {}; // 空方法，应该由子类重写

Beverage.prototype.pourInCup = function () {}; // 空方法，应该由子类重写

Beverage.prototype.addCondiments = function () {}; // 空方法，应该由子类重写

Beverage.prototype.init = function () {
    this.boilWater();
    this.brew();
    this.pourInCup();
    this.addCondiments();
};

var Coffee = function () {};

Coffee.prototype = new Beverage();
Coffee.prototype.brew = function () {
    console.log('用沸水冲泡咖啡');
};

Coffee.prototype.pourInCup = function () {
    console.log('把咖啡倒进杯子');
};

Coffee.prototype.addCondiments = function () {
    console.log('加糖和牛奶');
};

var Coffee = new Coffee();
Coffee.init();

var Tea = function () {};
Tea.prototype = new Beverage();

Tea.prototype.brew = function () {
    console.log('用沸水浸泡茶叶');
};

Tea.prototype.pourInCup = function () {
    console.log('把茶倒进杯子');
};

Tea.prototype.addCondiments = function () {
    console.log('加柠檬');
};

var tea = new Tea();
tea.init();

/**
 * Beverage.prototype.init 是其中的模板方法
 * 该方法中封装了子类的算法框架，它作为一个算法的模板，指导子类以何种顺序去执行哪些方法。
 * 在Beverage.prototype.init方法中，算法内的每一个步骤都清楚地展示在我们眼前。
 */

/**
 * 模板意味着调用方法种类和调用顺序保持不变。可以采用模板方法模式，但是在js中高阶函数是更好的选择
 */

var Beverage = function (param) {

    var boilWater = function () {
        console.log('把水煮沸');
    };

    var brew = param.brew || function () {
        throw new Error('必须传递brew方法');
    };
    var pourInCup = param.pourInCup || function () {
        throw new Error('必须传递pourInCup方法');
    };

    var addCondiments = param.addCondiments || function () {
        throw new Error('必须传递addCondiments方法');
    };

    var F = function () {};

    F.prototype.init = function () {
        boilWater();
        brew();
        pourInCup();
        addCondiments();
    };

    return F;
};

var Coffee = Beverage({
    brew: function () {
        console.log('用沸水冲泡咖啡');
    },
    pourInCup: function () {
        console.log('把咖啡倒进杯子');
    },
    addCondiments: function () {
        console.log('加糖和牛奶');
    }
});

var Tea = Beverage({
    brew: function () {
        console.log('用沸水浸泡茶叶');
    },
    pourInCup: function () {
        console.log('把茶倒进杯子');
    },
    addCondiments: function () {
        console.log('加柠檬');
    }
});


var coffee = new Coffee();
coffee.init();

var tea = new Tea();
tea.init();