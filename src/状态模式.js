// 状态模式的关键是区分事物内部的状态，事物内部状态的改变往往会带来事物的行为改变。
// 状态模式的定义：允许一个对象在其内部状态改变时改变它的行为，对象看起来似乎修改了它的类。

// 电灯 开关 弱光-》强光-》关闭

// OffLightState：

var OffLightState = function (light) {
    this.light = light;
};

OffLightState.prototype.buttonWasPressed = function () {
    console.log('弱光'); // offLightState对应的行为
    this.light.setState(this.light.weakLightState); // 切换状态到weakLightState
};

// WeakLightState：

var WeakLightState = function (light) {
    this.light = light;
};

WeakLightState.prototype.buttonWasPressed = function () {
    console.log('强光'); // weakLightState对应的行为
    this.light.setState(this.light.strongLightState); // 切换状态到strongLightState
};

// StrongLightState：

var StrongLightState = function (light) {
    this.light = light;
};

StrongLightState.prototype.buttonWasPressed = function () {
    console.log('关灯'); // strongLightState对应的行为
    this.light.setState(this.light.offLightState); // 切换状态到offLightState
};

var Light = function () {
    this.offLightState = new OffLightState(this);
    this.weakLightState = new WeakLightState(this);
    this.strongLightState = new StrongLightState(this);
    this.button = null;
};

Light.prototype.init = function () {
    var button = document.createElement('button'),
        self = this;


    this.button = document.body.appendChild(button);
    this.button.innerHTML = '开关';

    this.currState = this.offLightState; // 设置当前状态

    this.button.onclick = function () {
        self.currState.buttonWasPressed();
    }
};

Light.prototype.setState = function (newState) {
    this.currState = newState;
};


/**
 * 状态模式和策略模式像一对双胞胎，它们都封装了一系列的算法或者行为，它们的类图看起来几乎一模一样，但在意图上有很大不同，因此它们是两种迥然不同的模式。
 * 策略模式和状态模式的相同点是，它们都有一个上下文、一些策略或者状态类，上下文把请求委托给这些类来执行。
 * 它们之间的区别是
 * 策略模式中的各个策略类之间是平等又平行的，它们之间没有任何联系，所以客户必须熟知这些策略类的作用，以便客户可以随时主动切换算法；
 * 
 * 而在状态模式中，状态和状态对应的行为是早已被封装好的，状态之间的切换也早被规定完成，“改变行为”这件事情发生在状态模式内部。
 * 对客户来说，并不需要了解这些细节。这正是状态模式的作用所在。
 */

/**
 * 状态模式的优点如下。
 * 状态模式定义了状态与行为之间的关系，并将它们封装在一个类里。通过增加新的状态类，很容易增加新的状态和转换。
 * 避免Context无限膨胀，状态切换的逻辑被分布在状态类中，也去掉了Context中原本过多的条件分支。
 * 用对象代替字符串来记录当前状态，使得状态的切换更加一目了然。
 * Context中的请求动作和状态类中封装的行为可以非常容易地独立变化而互不影响。
 * 
 * 状态模式的缺点是会在系统中定义许多状态类，编写20个状态类是一项枯燥乏味的工作，而且系统中会因此而增加不少对象。
 * 另外，由于逻辑分散在状态类中，虽然避开了不受欢迎的条件分支语句，但也造成了逻辑分散的问题，我们无法在一个地方就看出整个状态机的逻辑。
 */