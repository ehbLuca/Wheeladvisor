'use strict'

/**
* Dependencies
*/
const bcrypt = require('bcrypt');
const cookieParser = require('cookie-parser');
const crypto = require('crypto');
const express = require('express');
const logger = require('morgan');
const path = require('path');
const { isNull } = require('util');

const queries = require('./queries.js');

let app = express();
const port = 3000;
const cookieSecret = 'SECRET';

/* custom logging */
if (process.env.NODE_ENV !== 'test') app.use(logger(':method :url'))

app.use(express.urlencoded({ extended: false }));
app.use(express.json());
app.use(cookieParser(cookieSecret));
app.use('/', express.static(path.join(__dirname, 'website')));

app.get('/', (req, res) => {
	res.redirect('/start.html')
});

// returns the user's email if he is signed in
app.get('/loggedIn', async (req, res) => {
	let { authToken } = req.cookies;
	if (authToken && await queries.hasToken(authToken))
		res.send(JSON.stringify(1));
	else
		res.send(JSON.stringify(null))
});

// route for logging in with credentials or with a token in the cookies
app.post('/login', async (req, res) => {
	let { authToken } = req.cookies;
	if (authToken) {
		console.log(`I: (/login) Trying to login with token.`);
		console.log(`I: (/login) Finding user with token = ${authToken}`);
		let email = await queries.hasToken(authToken);
		console.log('I: (/login) email:', email);
		if (email)
			res.redirect("/start.html")
		else {
			res.clearCookie('authToken');
			res.redirect('/login.html')
		}
		return;
	}

	let { email, password } = req.body;
	if (!(email && password)) {
		console.error("E: (/login) Missing password or email");
		res.redirect('/login.html');
		return;
	}
	email = email.toLowerCase();
	console.log(`I: (/login) Logging in ${email} and ${password}`);

	if (await queries.canLogin([email, password])) {
		let token = crypto.randomBytes(32).toString('hex');
		res.cookie('authToken', token, { maxAge: 24 * 60 * 60 * 1000 });
		queries.storeToken(email, token);
		res.redirect('/start.html');
	} else {
		console.error("E: (/login) Incorrect credentials");
		res.redirect('/login-error.html');
	}
});

app.get('/logout', (req, res) => {
	if (req.cookies.authToken)
		res.clearCookie('authToken');
	res.redirect('/start.html')
});

// route for registering
// expects a name, email and password
app.post('/register', async (req, res) => {
	let { name, email, password } = req.body;
	if (!(name && email && password)) {
		res.redirect('/register-error.html');
		return;
	}
	email = email.toLowerCase();
	let salt = bcrypt.genSaltSync(10);
	password = bcrypt.hashSync(password, salt);

	let result = await queries.registerUser([name, email, password])
	if (result) {
		res.redirect('/start.html');
	} else {
		res.redirect('/register-error.html');
	}
});

app.post('/search', async (req, res) => {
	let category = req.body.category;
	let adres = req.body.adres;
	let query = req.body.query;
	console.error(`I: (/search) Searching for places matching '${query}'.`);
	let result = await queries.queryPlaces(query, category, adres);
	res.send(result);
	console.log(query, category, adres);
});

const earthRadius = 6371;

function calculateDistance(lat1, lon1, lat2, lon2) {
	const dLat = (lat2 - lat1) * Math.PI / 180;
	const dLon = (lon2 - lon1) * Math.PI / 180;
	const a =
		Math.sin(dLat / 2) * Math.sin(dLat / 2) +
		Math.cos(lat1 * Math.PI / 180) * Math.cos(lat2 * Math.PI / 180) *
		Math.sin(dLon / 2) * Math.sin(dLon / 2);
	const c = 2 * Math.atan2(Math.sqrt(a), Math.sqrt(1 - a));
	const distance = earthRadius * c;
	return distance;
}

app.post('/search-coordinates', async (req, res) => {
	let { latitude, longitude } = req.body.coordinate;
	if (latitude === null && longitude === null) {
		res.send()
		return;
	}
	let places = await queries.getCoordinates(req.body.coordinate);
	if (places.length == 0) {
		res.redirect('/search-coordinates-error.html');
		return;
	}
	let rankedPlaces = [];
	for (let place of places) {
		let {latitude: placeLat, longitude: placeLng} = place.coordinate;
		let distance = calculateDistance(latitude, longitude, placeLat, placeLng);
		place.distances = [];
		place.distance.push(distance);
		rankedPlaces.push({
			name: place.name,
			coordinate: place.coordinate,
			distance: distance
		  });	
	}
	rankedPlaces.sort((a, b) => a.distance - b.distance);
	res.send(rankedPlaces);
	});

// bij te houden per plaats in array

app.listen(port, () => {
	console.log(`http://localhost:${port}`);
});
