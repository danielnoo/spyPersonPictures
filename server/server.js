const WebSocket = require('ws');
const wss = new WebSocket.Server({ port: 7000 });
console.log('starting up');
  
wss.on('connection', ws => {
  console.log('connection established');
  ws.on('message', message => {
    console.log(message);
    wss.broadcast(message)
  });
  ws.on('error', error => {
    console.log('there was an error and this is it', error.message)
  });
  ws.on('close', ws=> {
    wss.close()
  });
});

wss.on('open', open => {
    console.log('an opening happened');
})

wss.broadcast = (msg) => {
  console.log(`Sending ${wss.clients.size} messages`);
  wss.clients.forEach((client) => {
    client.send(`${msg}`);
  });
};

