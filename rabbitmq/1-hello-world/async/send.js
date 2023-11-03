import { connect } from 'amqplib';

async function main() {
	const queue = 'myqueue';
	const message = 'Hello RabbitMQ';

	const connection = await connect('amqp://localhost');
	const channel = await connection.createChannel();

	await channel.assertQueue(queue, { durable: false });
	
	channel.sendToQueue(queue, Buffer.from(message));
	console.log(`Sent message:${message} to queue:${queue}`);

	setTimeout(() => {
		connection.close();
		process.exit(0);
	}, 500);
}

main();
