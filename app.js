var express = require('express');
var fs = require('fs');
var React = require('react');
var ReactDOMServer = require('react-dom/server');
var app = express();
var http = require('http').Server(app);
var io = require('socket.io')(http);
var ARTICLES_FILE = './articles.json'
var POST = 3000;

app.use(express.static('./public'));

// add top page routing
app.get('/', function(req, res) {
  res.send('index.html');
});

app.get('/articles', function(req, res) {
  var file = fs.readFileSync(ARTICLES_FILE);
  res.json(JSON.parse(file));
});

app.post('/articles', function(req, res) {
  var file = fs.readFileSync(ARTICLES_FILE);
  var articles = JSON.parse(file);
  var article = {
    title: req.body.title,
    comment: req.body.comment
  };
  articles.push(article);
  fs.writeFile(ARTICLES_FILE, JSON.stringify(articles, null, 2));
  res.json(articles);
});

app.get('/test', function(req, res) {
  var testText = "testです";
  res.send('index.html', testText);
});

//socket.ioに接続された時に動く処理
// io.on('connection', function(socket) {
//   //接続時に振られた一意のIDをコンソールに表示
//   console.log('%s さんが接続しました。', socket.id);

//   //デフォルトのチャンネル
//   var channel = 'channel-a';

//   //接続時に自分以外の全員にIDを表示
//   socket.broadcast.emit('message', socket.id + 'さんが入室しました！', 'system');

//   //Roomを初期化するらしい
//   socket.join(channel);

//   //messageイベントで動く
//   //同じチャンネルの人にメッセージを送る
//   socket.on('message', function(msj) {
//     io.sockets.in(channel).emit('message', msj, socket.id);
//   });

//   //接続が切れた時に動く
//   //接続が切れたIDを全員に表示
//   socket.on('disconnect', function(e) {
//     console.log('%s さんが退室しました。', socket.id);
//   });

//   //チャンネルを変えた時に動く
//   //今いるチャンネルを出て、選択されたチャンネルに移動する
//   socket.on('change channel', function(newChannel) {
//     socket.leave(channel); //チャンネルを去る
//     socket.join(newChannel); //選択された新しいチャンネルのルームに入る
//     channel = newChannel; //今いるチャンネルを保存
//     socket.emit('change channel', newChannel); //チャンネルを変えたこと自分に送信
//   });
// });

//接続待ち状態になる
http.listen(POST, function() {
  console.log('接続開始：', POST);
});