import { connect } from 'amqplib';

async function main() {
	const queue = 'rpc_queue';

	const connection = await connect('amqp://localhost');
	const channel = await connection.createChannel();

	await channel.assertQueue(queue, { durable: false });
	channel.prefetch(1);
	console.log('[x] Awaiting RPC requests');

	channel.consume(queue, (msg) => {
		const { method, args } = JSON.parse(msg.content.toString());
		let result = null;
		switch (method) {
			case 1:
				result = addNum(args[0], args[1]);
				break;

			case 2:
				result = subtractNum(args[0], args[1]);
				break;

			default:
				break;
		}
		console.log(`method:${method}, args:${args}`);

		const { replyTo, correlationId } = msg.properties;
		console.log(replyTo, correlationId);
		channel.sendToQueue(replyTo, Buffer.from(result.toString()), {
			correlationId: correlationId,
		});
		channel.ack(msg);
	});
}

try {
	main();
} catch (error) {}

function addNum(a, b) {
	return a + b;
}

function subtractNum(a, b) {
	return a - b;
}
