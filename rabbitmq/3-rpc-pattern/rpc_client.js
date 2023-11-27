import { connect } from 'amqplib';
import { v4 } from 'uuid';

async function main() {
	const queue = 'rpc_queue';
	const message = 'Hello RabbitMQ';

	const connection = await connect('amqp://localhost');
	const channel = await connection.createChannel();

	const q = await channel.assertQueue('', { exclusive: true });

	const correlationId = v4();
	const request = 'asdf';

	channel.sendToQueue(queue, Buffer.from(request), { correlationId: correlationId, replyTo: q.queue });
	channel.consume(q.queue, (msg) => {
		if (msg.properties.correlationId == correlationId) {
			console.log(`Result ${msg.content.toString()}`);
		}
	});
}

main();
