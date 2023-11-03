import { connect } from 'amqplib';

async function main() {
	const queue = 'myqueue';

	const connection = await connect('amqp://localhost');
	const channel = await connection.createChannel();

	await channel.assertQueue(queue, { durable: false });

	console.log(' [*] Waiting for messages in %s. To exit press CTRL+C', queue);

	channel.consume(queue, onMessage, { noAck: true });
}

function onMessage(message) {
	if (message !== null) {
		console.log('Recieved:', message.content.toString());
	} else {
		console.log('Consumer cancelled by server');
	}
}

main();
