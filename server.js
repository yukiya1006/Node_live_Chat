//サーバーを作成

const express = require("express");
const app = express();
const http = require('http');
const server = http.createServer(app);
const io = require('socket.io')(server);
const PORT = 3000;

app.get('/',(req,res) => {
  res.sendFile(__dirname + '/index.html');
});

io.on("connection", (socket) => { //connectionで受け取りサーバーにクライアントが接続
  console.log('ユーザーが接続しました')

  //chat messageというキーをクライアントからmsgで受け取り、msgをクライアントに返す
  socket.on('chat message', (msg) => { //onで受け取る
    io.emit('chat message', msg); //emitクライアントに送信
  });
});

server.listen(PORT, () => {
  console.log('listening on 3000');
});

