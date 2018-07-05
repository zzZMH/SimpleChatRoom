var socket_io = require('socket.io');

var socketio = {};
// 获取io
socketio.getSocketIO = function (server) {
    var io = socket_io.listen(server);
    io.sockets.on('connection', function (socket) {

        //登录事件
        socket.on('login', function (data) {
            console.log("执行了login方法");
            console.log("后台接受并返回："+JSON.stringify(data));
            socket.emit('doLogin', data);
            socket.broadcast.emit('doLogin', data);
        });
    })
};

module.exports = socketio;