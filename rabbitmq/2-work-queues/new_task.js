import { connect } from 'amqplib';

async function main() {
	const queue = 'task_queue';
	const message = 'Hello...';

	const connection = await connect('amqp://localhost');
	const channel = await connection.createChannel();
	await channel.assertQueue(queue, { durable: true });
	for (let i = 0; i < 5; i++) {
        // setTimeout(()=>{}, 500);
		channel.sendToQueue(queue, Buffer.from(message), { persistent: true });
		console.log(`Sent ${message}`);
	}
	setTimeout(function () {
		console.log(' [x] Done');
		process.exit(0);
	}, 500);
}

main();
