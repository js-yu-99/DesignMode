/**
 * 命令模式：可以解耦请求调用者和请求接收者之间的关系
 * 命令模式其实是回调函数的一个面向对象的替代品
 */

var RefreshMenuBarCommand = function (receiver) {
    return {
        execute: function () {
            receiver.refresh();
        }
    }
};

var setCommand = function (button, command) {
    button.onclick = function () {
        command.execute();
    }
};

var refreshMenuBarCommand = RefreshMenuBarCommand(MenuBar);
setCommand(button1, refreshMenuBarCommand);