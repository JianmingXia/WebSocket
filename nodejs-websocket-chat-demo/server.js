var ws = require("nodejs-websocket");
var PORT = 23000;
var clientCount = 0;

var server = ws.createServer(function (conn) {
    console.log("New connection");
    clientCount++;
    conn.nickname = 'user ' + clientCount;

    broadcast(JSON.stringify({ message: conn.nickname + " comes in" }));

    conn.on("text", function (str) {
        console.log("Received " + str);
        broadcast(JSON.stringify({nickname: conn.nickname, message: str}));
    })

    conn.on("close", function (code, reason) {
        console.log("Connection closed");
        broadcast(JSON.stringify({ message: conn.nickname + " left" }));
    })

    conn.on("error", function (err) {
        console.log("Handle Error");
        console.log(err);
    })
}).listen(PORT)

console.log("websocket listening on port:" + PORT);

function broadcast(str) {
    server.connections.forEach(function (connection) {
        connection.sendText(str)
    });
}