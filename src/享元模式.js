/**
 * 享元（flyweight）模式是一种用于性能优化的模式，
 * “fly”在这里是苍蝇的意思，意为蝇量级。享元模式的核心是运用共享技术来有效支持大量细粒度的对象。
 */

/**
 * 
 * 假设有个内衣工厂，目前的产品有50种男式内衣和50种女士内衣，为了推销产品，工厂决定生产一些塑料模特来穿上他们的内衣拍成广告照片。 
 * 正常情况下需要50个男模特和50个女模特，然后让他们每人分别穿上一件内衣来拍照。不使用享元模式的情况下，在程序里也许会这样写：
 */
var Model = function (sex, underwear) {
    this.sex = sex;
    this.underwear = underwear;
};

Model.prototype.takePhoto = function () {
    console.log('sex= ' + this.sex + ' underwear=' + this.underwear);
};

for (var i = 1; i <= 50; i++) {
    var maleModel = new Model('male', 'underwear' + i);
    maleModel.takePhoto();
};

for (var j = 1; j <= 50; j++) {
    var femaleModel = new Model('female', 'underwear' + j);
    femaleModel.takePhoto();
};

/**
 * 下面我们来考虑一下如何优化这个场景。虽然有100种内衣，但很显然并不需要50个男模特和50个女模特。
 * 其实男模特和女模特各自有一个就足够了，他们可以分别穿上不同的内衣来拍照。
 */

var Model = function (sex) {
    this.sex = sex;
};

Model.prototype.takePhoto = function () {
    console.log('sex= ' + this.sex + ' underwear=' + this.underwear);
};
var maleModel = new Model('male'),
    femaleModel = new Model('female');
for (var i = 1; i <= 50; i++) {
    maleModel.underwear = 'underwear' + i;
    maleModel.takePhoto();
};
for (var j = 1; j <= 50; j++) {
    femaleModel.underwear = 'underwear' + j;
    femaleModel.takePhoto();
}

/**
 * 享元模式的目标是减少对象的数量。要求将对象的属性划分为内部状态和外部状态。
 * 
 * 内部状态存储于对象内部。
 * 
 * 内部状态可以被一些对象共享。
 * 
 * 内部状态独立于具体的场景，通常不会改变。
 * 
 * 外部状态取决于具体的场景，并根据场景而变化，外部状态不能被共享。
 * 
 * 这样一来，我们便可以把所有内部状态相同的对象都指定为同一个共享的对象。而外部状态可以从对象身上剥离出来，并储存在外部。
 * 剥离了外部状态的对象成为共享对象，外部状态在必要时被传入共享对象来组装成一个完整的对象。
 * 虽然组装外部状态成为一个完整对象的过程需要花费一定的时间，但却可以大大减少系统中的对象数量，相比之下，这点时间或许是微不足道的。
 * 因此，享元模式是一种用时间换空间的优化模式。
 * 
 * 在上面的例子中，性别是内部状态，内衣是外部状态，通过区分这两种状态，大大减少了系统中的对象数量。
 * 通常来讲，内部状态有多少种组合，系统中便最多存在多少个对象，因为性别通常只有男女两种，所以该内衣厂商最多只需要2个对象。
 * 使用享元模式的关键是如何区别内部状态和外部状态。可以被对象共享的属性通常被划分为内部状态，如同不管什么样式的衣服，都可以按照性别不同，
 * 穿在同一个男模特或者女模特身上，模特的性别就可以作为内部状态储存在共享对象的内部。
 * 而外部状态取决于具体的场景，并根据场景而变化，就像例子中每件衣服都是不同的，它们不能被一些对象共享，因此只能被划分为外部状态。
 * 
 * 
 * 适用于享元模式的情况：
 * 一个程序中使用了大量的相似对象。
 * 由于使用了大量对象，造成很大的内存开销。
 * 对象的大多数状态都可以变为外部状态。
 * 剥离出对象的外部状态之后，可以用相对较少的共享对象取代大量对象。
 */
