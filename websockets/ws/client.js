import WebSocket from 'ws';

const ws = new WebSocket('ws://0.0.0.0:3000');

ws.on('error', console.error);

ws.on('open', function open() {
	console.log('attempting to open connection');
});

ws.on('message', function message(data) {
	console.log('received: %s', data);
});

ws.on('close', (code, reason) => {
	console.log(`closed connection. code:${code}`);
});
