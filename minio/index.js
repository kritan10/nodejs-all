import { Client } from 'minio';
import dotenv from 'dotenv';

dotenv.config();

const minioClient = new Client({
	endPoint: 'localhost',
	port: 9000,
	accessKey: process.env.ACCESS_KEY,
	secretKey: process.env.SECRET_KEY,
	useSSL: false,
});

const file = './hello.txt';

try {
	await minioClient.fPutObject('first', 'myobject', file);
	console.log('Added object to server');
} catch (error) {
	console.error(error);
	console.log('Error adding to server');
}

try {
	await minioClient.fGetObject('first', 'myobject', './hello-minio.txt');
	console.log('Object fetched and saved');
} catch (error) {
	console.error(error);
	console.log('Error fetching file from server');
}
