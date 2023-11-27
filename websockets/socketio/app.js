import express from 'express';
import { createServer } from 'node:http';
import path from 'node:path';
import { Server, Socket } from 'socket.io';
import { db, saveMessage } from './db.js';
import MyEvent from './events.js';
import { addUser, getPreviousMessages } from './redisdb.js';

const app = express();
const server = createServer(app);
const io = new Server(server);

app.use(express.static('./socketio'));

app.get('/', (req, res) => {
	res.sendFile(path.resolve('socketio', 'index.html'));
});

io.on('connection', async (socket) => {
	let user;

	socket.on(MyEvent.CHAT_INIT, async (username, ackcb) => {
		console.log(username);
		user = username;
		io.emit(MyEvent.SYSTEM_MESSAGE, 'CONNECT', user);
		await addUser(username);
		// TODO check if user exists in db, then send previous messages
		ackcb();
	});

	socket.on('disconnect', () => {
		io.emit(MyEvent.SYSTEM_MESSAGE, 'DISCONNECT', user);
	});

	resendMessagesOnConnectionRecovery(socket);

	socket.on(MyEvent.USER_MESSAGE, async (message, clientOffset, ackcb) => {
		// save message to db
		// const result = await saveMessage(message, clientOffset);
		// message already inserted so we notify the client
		// if (result === 'duplicate') ackcb();
		// get offset
		// const offset = result.lastID;
		// include sender and offset in the response
		io.emit(MyEvent.USER_MESSAGE, message, offset, sender, sendTime);
		// acknowledge the event
		ackcb();
	});

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
			const messages = await getPreviousMessages();
			messages.forEach((msg) => {

				socket.emit(MyEvent.USER_MESSAGE, msg.content, msg.id);
			});
			// await db.each('SELECT id, content FROM messages WHERE id > ?', [socket.handshake.auth.serverOffset || 0], (_err, row) => {
			// 	socket.emit(MyEvent.USER_MESSAGE, row.content, row.id);
			// });
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
