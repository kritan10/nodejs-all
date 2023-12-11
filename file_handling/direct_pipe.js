import fs from 'node:fs';
import csv from 'csv-parser';
const results = [];

const writeStream = fs.createWriteStream('./direct_piped_data.csv').on('finish', () => {
	console.log('Write finished');
});

// write header
writeStream.write(`name, location, phone, openTime, closeTime, lat, lng\n`);


fs.createReadStream('raw_data.csv')
	.pipe(csv())
	.map(dataMapper)
	.pipe(writeStream)
	.on('error', (err) => console.error(err));

function dataMapper(d) {
	const name = d.Name;
	const location = d.Location;
	const [openTime, closeTime] = d['Open/Close'].split('-');
	const phone = d.Number.startsWith('1') ? `0${d.Number}` : d.Number;
	const [lat, lng] = d.LatLng.split(', ');

	return `${name}, "${location}", ${phone}, ${openTime}, ${closeTime}, ${lat}, ${lng}\n`;
}
