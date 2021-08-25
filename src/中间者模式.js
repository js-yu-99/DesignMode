/**
 * 中介者模式是迎合迪米特法则的一种实现。迪米特法则也叫最少知识原则，是指一个对象应该尽可能少地了解另外的对象（类似不和陌生人说话）。
 * 如果对象之间的耦合性太高，一个对象发生改变之后，难免会影响到其他的对象，跟“城门失火，殃及池鱼”的道理是一样的。
 * 而在中介者模式里，对象之间几乎不知道彼此的存在，它们只能通过中介者对象来互相影响对方。
 * 因此，中介者模式使各个对象之间得以解耦，以中介者和对象之间的一对多关系取代了对象之间的网状多对多关系。
 * 各个对象只需关注自身功能的实现，对象之间的交互关系交给了中介者对象来实现和维护。
 * 
 * 中介者模式也存在一些缺点。其中，最大的缺点是系统中会新增一个中介者对象，因为对象之间交互的复杂性，转移成了中介者对象的复杂性，
 * 使得中介者对象经常是巨大的。中介者对象自身往往就是一个难以维护的对象。
 */

function Player(name, teamColor) {
    this.name = name; // 角色名字
    this.teamColor = teamColor; // 队伍颜色
    this.state = 'alive'; // 玩家生存状态
};

Player.prototype.win = function () {
    console.log(this.name + ' won ');
};

Player.prototype.lose = function () {
    console.log(this.name + ' lost');
};

/*******************玩家死亡*****************/

Player.prototype.die = function () {
    this.state = 'dead';
    playerDirector.ReceiveMessage('playerDead', this); // 给中介者发送消息，玩家死亡
};

/*******************移除玩家*****************/

Player.prototype.remove = function () {
    playerDirector.ReceiveMessage('removePlayer', this); // 给中介者发送消息，移除一个玩家
};

/*******************玩家换队*****************/

Player.prototype.changeTeam = function (color) {
    playerDirector.ReceiveMessage('changeTeam', this, color); // 给中介者发送消息，玩家换队
};

var playerFactory = function (name, teamColor) {
    var newPlayer = new Player(name, teamColor); // 创造一个新的玩家对象
    playerDirector.ReceiveMessage('addPlayer', newPlayer); // 给中介者发送消息，新增玩家

    return newPlayer;
};


var playerDirector = (function () {
    var players = {}, // 保存所有玩家
        operations = {}; // 中介者可以执行的操作

    /****************新增一个玩家***************************/
    operations.addPlayer = function (player) {
        var teamColor = player.teamColor; // 玩家的队伍颜色
        players[teamColor] = players[teamColor] || []; // 如果该颜色的玩家还没有成立队伍，则新成立一个队伍

        players[teamColor].push(player); // 添加玩家进队伍
    };

    /****************移除一个玩家***************************/
    operations.removePlayer = function (player) {
        var teamColor = player.teamColor, // 玩家的队伍颜色
            teamPlayers = players[teamColor] || []; // 该队伍所有成员
        for (var i = teamPlayers.length - 1; i >= 0; i--) { // 遍历删除
            if (teamPlayers[i] === player) {
                teamPlayers.splice(i, 1);
            }
        }
    };

    /****************玩家换队***************************/
    operations.changeTeam = function (player, newTeamColor) { // 玩家换队
        operations.removePlayer(player); // 从原队伍中删除
        player.teamColor = newTeamColor; // 改变队伍颜“色
        operations.addPlayer(player); // 增加到新队伍中
    };

    operations.playerDead = function (player) { // 玩家死亡
        var teamColor = player.teamColor,
            teamPlayers = players[teamColor]; // 玩家所在队伍

        var all_dead = true;

        for (var i = 0, player; player = teamPlayers[i++];) {
            if (player.state !== 'dead') {
                all_dead = false;
                break;
            }
        }

        if (all_dead === true) { // 全部死亡

            for (var i = 0, player; player = teamPlayers[i++];) {
                player.lose(); // 本队所有玩家lose
            }

            for (var color in players) {
                if (color !== teamColor) {
                    var teamPlayers = players[color]; // 其他队伍的玩家
                    for (var i = 0, player; player = teamPlayers[i++];) {
                        player.win(); // 其他队伍所有玩家win
                    }
                }
            }
        }
    };

    var ReceiveMessage = function () {
        var message = Array.prototype.shift.call(arguments); // arguments的第一个参数为消息名称
        operations[message].apply(this, arguments);
    };

    return {
        ReceiveMessage: ReceiveMessage
    }

})();

// 红队：
var player1 = playerFactory('皮蛋', 'red'),
    player2 = playerFactory('小乖', 'red'),
    player3 = playerFactory('宝宝', 'red'),
    player4 = playerFactory('小强', 'red');

// 蓝队：
var player5 = playerFactory('黑妞', 'blue'),
    player6 = playerFactory('葱头', 'blue'),
    player7 = playerFactory('胖墩', 'blue'),
    player8 = playerFactory('海盗', 'blue');

player1.die();
player2.die();
player3.die();
player4.die();