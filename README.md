# JavaScript设计模式与实践

## 五大设计原则 SOLID

### 单一职责原则 SRP
1. 网络定义：
    - 定义一：一个类有且仅有一个发生改变的原因。
2. 自述：
针对一个单独的功能点开发一个方法，方法内不进行功能间的耦合，这样修改方法的唯一原因就是这个方法自身涉及的功能发生变化。 ***高内聚 低耦合***

### 开闭原则 OCP
1. 网络定义：
    - 定义一：软件实体（包括类、模块、功能等）应该对扩展开放，但是对修改关闭。
2. 自述：
自己开发好的一个公共组件，如果正在被其他人使用，这个时候贸然改动原有的代码可能对其他使用这个组件的页面产生副作用，增加测试的难度。所以，最好的写法是每次有新代码改动的时候最好确保现有的代码不动的情况下扩展组件。
总之，开放封闭原则可提高软件的可维护性与代码的重用性。

### 里式替换原则 LSP
1. 网络定义：
    - 定义一：所有引用基类（父类）的地方必须能透明地使用其子类的对象。  通俗的说，子类可以扩展父类功能，但不能改变父类原有功能。
    - 定义二：子类对象能够替换父类对象，而程序逻辑不变。
2. 自述：
如果有基类A，子类B继承自A，如果有一段逻辑使用A来实现，那么如果这个时候使用B来替换调A，逻辑还能正常运行，就说明B类在继承A类的时候符合里氏替换原则。***里式替换原则要求开发时派生类不修改父类定义好的属性和方法***

### 接口隔离原则 ISP
1. 网络定义：
    - 定义一：不应该强行要求客户端依赖于它们不用的接口。
    - 定义二：类之间的依赖应该建立在最小的接口上面。
    - 简单点说，客户端需要什么功能，就提供什么接口，对于客户端不需要的接口不应该强行要求其实现；类之间的依赖应该建立在最小的接口上面，这里最小的粒度取决于单一职责原则的划分。
2. 自述：
    - 如果存在一个抽象类A，其中有方法b和方法c。如果此时对象D实例化了类A，但是D涉及到的功能值用到了方法b，那么不应该让D去实现c方法。

### 依赖倒置原则 DIP
1. 网络定义：
    - 高层模块不应该依赖低层模块。两个都应该依赖抽像。抽像不应该依赖细节，细节应该依赖抽像。
    - 核心是面向接口编程。低层模块尽量都要有抽象类或接口，或者两者都有。
    - 变量的声明类型尽量是抽象类或接口。
    - 使用继承时遵循里氏替换原则。
2. 自述：
创建类并在类内部进行类型声明时，类型不应该是具体的实现类，而应该是抽象类，因为实现类容易改变，并且无法随意替换使用，哪怕逻辑相同，而使用抽象类，只要是根据抽象类实现的代码，都能被当前类所使用