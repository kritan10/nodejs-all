import express from 'express';
import { createServer } from 'node:http';
import path from 'node:path';
import { Server, Socket } from 'socket.io';
import { db, saveMessage } from './db.js';
import MyEvent from './events.js';

const app = express();
const server = createServer(app);
const io = new Server(server);

app.get('/', (req, res) => {
	res.sendFile(path.resolve('socketio', 'index.html'));
});

io.on('connection', async (socket) => {
	const id = socket.id;

	io.emit(MyEvent.SYSTEM_MESSAGE, 'CONNECT', id);

	socket.on('disconnect', () => {
		io.emit(MyEvent.SYSTEM_MESSAGE, 'DISCONNECT', id);
	});

	socket.on(MyEvent.USER_MESSAGE, async (msg, clientOffset, callback) => {
		// save message to db
		const result = await saveMessage(msg, clientOffset);
		// message already inserted so we notify the client
		if (result === 'duplicate') callback();
		// get offset
		const offset = result.lastID;
		// include offset in the response
		io.emit(MyEvent.USER_MESSAGE, msg, offset);
		// acknowledge the event
		callback();
	});

	resendMessagesOnConnectionRecovery(socket);

	logIncomingAndOutgoingEvents(socket, false);
});

/**
 *
 * @param {Socket} socket
 */
async function resendMessagesOnConnectionRecovery(socket) {
	if (!socket.recovered) {
		// if the connection state recovery was not successful
		try {
			await db.each('SELECT id, content FROM messages WHERE id > ?', [socket.handshake.auth.serverOffset || 0], (_err, row) => {
				socket.emit(MyEvent.USER_MESSAGE, row.content, row.id);
			});
		} catch (e) {
			// something went wrong
		}
	}
}

function logIncomingAndOutgoingEvents(socket, enabled) {
	if (!enabled) return;
	socket.onAny((eventName, ...args) => {
		console.log(`incoming event: ${eventName}`); // 'hello'
		// console.log(args); // [ 1, '2', { 3: '4', 5: ArrayBuffer (1) [ 6 ] } ]
	});

	socket.onAnyOutgoing((eventName, ...args) => {
		console.log(`outgoing event: ${eventName}`); // 'hello'
		// console.log(args); // [ 1, '2', { 3: '4', 5: ArrayBuffer (1) [ 6 ] } ]
	});
}

server.listen(3000, () => {
	console.log('server running at http://localhost:3000');
});
