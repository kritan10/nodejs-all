import fs from 'node:fs';
import csv from 'csv-parser';
const results = [];

function prepareDataset() {
	return new Promise((resolve, reject) => {
		fs.createReadStream('raw_data.csv')
			.pipe(csv())
			.on('error', (err) => reject(err))
			.on('data', (data) => {
				results.push(data);
			})
			.on('end', () => {
				resolve(results);
				// console.log(results);
			});
	});
}

(async () => {
	const data = await prepareDataset();
	const mappedData = data.map((d) => {
		const name = d.Name;
		const location = d.Location;
		const [openTime, closeTime] = d['Open/Close'].split('-');
		const phone = d.Number.startsWith('1') ? `0${d.Number}` : d.Number;
		const [lat, lng] = d.LatLng.split(', ');
		return {
			name: name,
			location: location,
			phone: phone,
			openTimeInAM: openTime,
			closeTimeInPM: closeTime,
			lat: lat,
			lng: lng,
		};
	});

	const writeStream = fs.createWriteStream('./clean_data.csv').on('finish', () => {
		console.log('Write finished');
	});

	writeHeaderColumn(writeStream, mappedData[0]);
	writeBodyColumn(writeStream, mappedData);
	writeStream.end();
})();

function writeHeaderColumn(writeStream, sampleData) {
	let textContent = '';
	for (const key in sampleData) {
		textContent += `${key}, `;
	}
	const textToWrite = `${textContent.substring(0, textContent.length - 2)}\n`;
	writeStream.write(textToWrite);
}

function writeBodyColumn(writeStream, mappedData) {
	let textContent = '';
	mappedData.forEach((e) => {
		for (const key in e) {
			if (e[key].includes(',')) {
				textContent += `"${e[key]}", `;
			} else {
				textContent += `${e[key]}, `;
			}
		}
		const textToWrite = `${textContent.substring(0, textContent.length - 2)}\n`;
		writeStream.write(textToWrite);
		textContent = '';
	});
}
