import { WebSocketServer, WebSocket } from 'ws';

const wss = new WebSocketServer({ port: 3000 }, () => {
	console.log('Websocket listening at port 3000');
});

wss.on('connection', function connection(ws, req) {
	console.log(req.socket.remoteAddress);
	ws.on('error', console.error);
	console.log(req);

	ws.on('message', (data) => {
		wss.clients.forEach((client) => {
			if (client !== ws && client.readyState === WebSocket.OPEN) {
				client.send(data.toString());
			}
		});
	});

	ws.on('close', () => {
		console.log('closed connection');
	});
});
