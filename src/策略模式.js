/**
 * 定义一系列的算法，把它们一个个封装起来，并且使它们可以相互替换。
 */

/**
 * 如果设计一个通过员工绩效评级计算员工工资的功能
 */

 var calculateBonus = function( performanceLevel, salary ){
    if ( performanceLevel === 'S' ){
        return salary * 4;
    }

    if ( performanceLevel === 'A' ){
        return salary * 3;
    }

    if ( performanceLevel === 'B' ){
        return salary * 2;
    }
};

console.log(calculateBonus( 'B', 20000)); // 40000
console.log(calculateBonus( 'S', 6000)); // 24000
/**
 * 这段代码函数庞大，包含很多if-else 并且缺乏扩展性，如果继续添加新的绩效等级，需要深入到函数内部实现，违反开闭原则和单一职责
 * 
 * 如果改为switch和将计算方法抽离出来，改变也不是很大，缺点依然较多
 * 
 * 将不变的部分和变化的部分隔开是每个设计模式的主题，策略模式也是将算法的使用和算法的实现分离
 */

// 传统面向对象中的策略模式
// -- start --
 const performanceS = function(){};

 performanceS.prototype.calculate = function( salary ){
     return salary * 4;
 };
 
 const performanceA = function(){};
 
 performanceA.prototype.calculate = function( salary ){
     return salary * 3;
 };
 
 const performanceB = function(){};
 
 performanceB.prototype.calculate = function( salary ){
     return salary * 2;
 };

 const Bonus = function(){
    this.salary = null;      // 原始工资
    this.strategy = null;    // 绩效等级对应的策略对象
};

Bonus.prototype.setSalary = function( salary ){
    this.salary = salary;    // 设置员工的原始工资
};

Bonus.prototype.setStrategy = function( strategy ){
    this.strategy = strategy;    // 设置员工绩效等级对应的策略对象
};

Bonus.prototype.getBonus = function(){    // 取得奖金数额
    return this.strategy.calculate( this.salary );    // 把计算奖金的操作委托给对应的策略对象
};

var bonus = new Bonus();

bonus.setSalary( 10000 );
bonus.setStrategy( new performanceS() );  // 设置策略对象

console.log( bonus.getBonus() );    // 输出：40000

bonus.setStrategy( new performanceA() );  // 设置策略对象
console.log( bonus.getBonus() );    // 输出：30000
// -- end --

// 但是在js中可以非常简单的书写-对象映射，也是大部分前端开发者常用的方式

var strategies = {
    "S": function( salary ){
        return salary * 4;
    },
    "A": function( salary ){
        return salary * 3;
    },
    "B": function( salary ){
        return salary * 2;
    }
};

/**
 * 模式优点：
 * 1. 避免多重条件判断语句；
 * 2. 遵循开闭原则，易于切换、易于扩展；
 * 3. 代码复用
 */

/**
 * 缺点：
 * 1. 会出现很多的策略类或策略对象；
 * 2. 要了解所有的strategy，各个strategy之间的不同点，这样才能选择合适的strategy
 */
