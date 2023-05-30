#!/usr/bin/env node

// This is a vague helper script, that has some miscellaneous functions
// those will help in setting up the database or other things.

const getdata = require('./getdata.js');
const queries = require('./queries.js');

// Query places from accessibility.cloud and insert them into the database
async function inserter(coordinate) {
	let places = await getdata.searchPlaces(coordinate);
	for (let place of places) {
		await queries.insertPlace({
			name: place.name,
			coordinates: {
				latitude: place.latitude,
				longitude: place.longitude
			},
			category: place.category
		});
	}
}

let brussel = {
	coordinate: {
		latitude: 50.85045,
		longitude: 4.34878,
	}
}

function help() {
	console.error(`usage: node helper.js [option]
OPTIONS
-h | --help\tshows this help
-i | --insert\tinserts places into database`);
}

function main() {
	// Get the command-line arguments
	const args = process.argv.slice(2);
	const arg = args[0]

	if (args.length == 0)
	{
		console.log("E: No arguments supplied");
		process.exit(1)
	}
	switch(arg) {
		case '-h':
		case '--help':
			help();
			process.exit(0);
		case '-i':
		case '--insert':
			console.log("I: Inserting places.");
			inserter(brussel.coordinate)
			break;
		default:
			console.log(`E: Invalid argument '${arg}'`);
			break;
	}
}

main();
