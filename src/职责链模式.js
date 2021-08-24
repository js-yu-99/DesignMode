/**
 * 职责链模式的定义是：
 * 使多个对象都有机会处理请求，从而避免请求的发送者和接收者之间的耦合关系，
 * 将这些对象连成一条链，并沿着这条链传递该请求，直到有一个对象处理它为止。
 */

/**
 * 
 * 假设我们负责一个售卖手机的电商网站，经过分别交纳500元定金和200元定金的两轮预定后（订单已在此时生成），现在已经到了正式购买的阶段。
 * 公司针对支付过定金的用户有一定的优惠政策。在正式购买后，已经支付过500元定金的用户会收到100元的商城优惠券，
 * 200元定金的用户可以收到50元的优惠券，而之前没有支付定金的用户只能进入普通购买模式，也就是没有优惠券，且在库存有限的情况下不一定保证能买到。
 * 
 * 500元 -》200元 -》普通用户 可以看成一种链式关系，如果不是500元预购用户 那可能是200元预购用户，如果不是200的，那就是普通用户
 * 依次从最上层链向下调用，符合情况的就执行。
 */

// 重构前
var order = function (orderType, pay, stock) {
    if (orderType === 1) { // 500元定金购买模式
        if (pay === true) { // 已支付定金
            console.log('500元定金预购, 得到100优惠券');
        } else { // 未支付定金，降级到普通购买模式
            if (stock > 0) { // 用于普通购买的手机还有库存
                console.log('普通购买, 无优惠券');
            } else {
                console.log('手机库存不足');
            }
        }
    } else if (orderType === 2) { // 200元定金购买模式
        if (pay === true) {
            console.log('200元定金预购, 得到50优惠券');
        } else {
            if (stock > 0) {
                console.log('普通购买, 无优惠券');
            } else {
                console.log('手机库存不足');
            }
        }
    } else if (orderType === 3) {
        if (stock > 0) {
            console.log('普通购买, 无优惠券');
        } else {
            console.log('手机库存不足');
        }
    }
};

order(1, true, 500); // 输出： 500元定金预购, 得到100优惠券


// 使用职责链模式重构 
var order500 = function (orderType, pay, stock) {
    if (orderType === 1 && pay === true) {
        console.log('500元定金预购，得到100优惠券');
    } else {
        return 'nextSuccessor'; // 我不知道下一个节点是谁，反正把请求往后面传递
    }
};

var order200 = function (orderType, pay, stock) {
    if (orderType === 2 && pay === true) {
        console.log('200元定金预购，得到50优惠券');

    } else {
        return 'nextSuccessor'; // 我不知道下一个节点是谁，反正把请求往后面传递
    }
};

var orderNormal = function (orderType, pay, stock) {
    if (stock > 0) {
        console.log('普通购买，无优惠券');
    } else {
        console.log('手机库存不足');
    }
};
// Chain.prototype.setNextSuccessor  指定在链中的下一个节点
// Chain.prototype.passRequest  传递请求给某个节点

var Chain = function (fn) {
    this.fn = fn;
    this.successor = null;
};

Chain.prototype.setNextSuccessor = function (successor) {
    return this.successor = successor;
};

Chain.prototype.passRequest = function () {
    var ret = this.fn.apply(this, arguments);

    if (ret === 'nextSuccessor') {
        return this.successor && this.successor.passRequest.apply(this.successor, arguments);
    }

    return ret;
};

var chainOrder500 = new Chain(order500);
var chainOrder200 = new Chain(order200);
var chainOrderNormal = new Chain(orderNormal);
chainOrder500.setNextSuccessor(chainOrder200);
chainOrder200.setNextSuccessor(chainOrderNormal);

chainOrder500.passRequest(1, true, 500); // 输出：500元定金预购，得到100优惠券
chainOrder500.passRequest(2, true, 500); // 输出：200元定金预购，得到50优惠券
chainOrder500.passRequest(3, true, 500); // 输出：普通购买，无优惠券
chainOrder500.passRequest(1, false, 0); // 输出：手机库存不足

/**
 * 职责链模式的缺点：
 * 1.可能链中的每个节点都不符合要求，这个时候需要添加一个保护节点放在最后
 * 2.那么多的节点对象可能在请求时大部分节点都没有起到实质性作用，会有性能损耗
 */