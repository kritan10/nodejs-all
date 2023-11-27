import { connect } from 'amqplib';

async function main() {
	const queue = 'task_queue';

	const connection = await connect('amqp://localhost');
	const channel = await connection.createChannel();

	await channel.assertQueue(queue, { durable: true });

	console.log(' [*] Waiting for messages in %s. To exit press CTRL+C', queue);

	channel.consume(queue, onMessage, { noAck: true });
}

function onMessage(message) {
	if (!message) throw new Error('NO MESSAGE');
	const secs = message.content.toString().split('.').length - 1;
	setTimeout(function () {
		console.log(' [x] Done');
	}, secs * 1000);
}

main();
