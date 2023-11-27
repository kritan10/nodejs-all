import { Redis } from 'ioredis';

const redis = new Redis();

async function init() {
	const userCount = await redis.get('user_counter');
	if (userCount === null) await redis.set('user_counter', 1);

	const msgCount = await redis.get('msg_counter');
	if (msgCount === null) await redis.set('msg_counter', 1);

	console.log('Redis initialized.');
}

await init();

/**
 * Adds a message to the redis database.
 * @param {object} message
 */
async function saveMessage(message) {
	const id = await redis.incr('msg_counter');
	await redis.set(`message:${id}`, JSON.stringify(message));
}

async function getPreviousMessages(count = 20) {
	const messages = [];
	const messageCount = await redis.get('msg_counter');
	for (let i = messageCount; i > count; i--) {
		const message = await redis.get(`message:${i}`);
		if (message == null) break;
		messages.push(JSON.parse(message));
	}
	return messages;
}

// /**
//  * Adds user to the redis database.
//  * @param {string} username
//  */
// async function addUser(username) {
// 	const userCount = await redis.get('user_counter');
// 	const userExists = await redis.scan(0, 'MATCH', username);
// 	const id = await redis.incr('user_counter');
// 	const result = await redis.set(`user:${id}`, username);
// 	return result;
// }

// async function test() {
// 	console.log(await redis.set('foo', 'bar'));
// 	console.log(await redis.get('foo'));
// 	console.log(await redis.del('foo'));
// 	console.log(await redis.del('foo'));
// 	await redis.set('counter', 1);
// 	console.log(await redis.incr('counter'));
// 	console.log(await redis.incr('counter'));
// 	console.log(await redis.incr('counter'));
// 	console.log(await redis.get('asdf'));

// 	const json = JSON.stringify({ mykey: 'value', another: '1' });
// 	console.log(await redis.set('json', json));
// 	console.log(await redis.get('json'));
// }

// test();

export { saveMessage, getPreviousMessages };
