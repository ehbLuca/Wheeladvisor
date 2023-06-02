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
const cookieSecret = "SECRET";

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
app.get('/loggedIn', async(req, res) => {
	let {authToken} = req.cookies;
	let user_id = null;
	if(authToken)
		user_id = await queries.hasToken(authToken)
	res.send(JSON.stringify(user_id))
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
	let {q: query, category, address} = req.body;
	console.log('query:', query);
	console.error(`I: (/search) Searching for places matching '${query}'.`);
	let places = await queries.queryPlaces(query, category, address);
	res.send(places);
	console.log(query, category, address);
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
	let {latitude} = req.body.latitude;
	let {longitude} = req.body.longitude;
	if (latitude === null && longitude === null) {
		res.send()
		return;
	}
	let places = await queries.getPlaces();
	let rankedPlaces = [];
	for (let place of places) {
		let {latitude: placeLat} = place.latitude;
		let {longitude: placeLng} = place.longitude;
		let distance = calculateDistance(latitude, longitude, placeLat, placeLng);
		rankedPlaces.push({
			place_id: place.place_id,
			name: place.name,
			coordinate: {
				latitude: place.latitude,
				longitude: place.longitude
			},
			distance: distance
		  });	
	}
	rankedPlaces.sort((a, b) => a.distance - b.distance);
	res.send(rankedPlaces);
});

// bij te houden per plaats in array
// to get places for favoriet from the data base 
app.post('/favourite', async (req, res) => {
	let user_id = req.body.user_id;
	console.error(`I: (/favourite) Searching for places matching '${user_id}'.`);
	let result = await queries.queryFavouritePlaces(user_id);
	res.send(result);
});

//for to save favourite
app.post('/saveFavourite', async(req, res) =>{

	let user_id = req.body.user_id;
	let place_id = req.body.place_id;
	console.error(`I: (/saveFavourite) Saving favourite`);
	await queries.saveFavourite(place_id, user_id);
	res.send();
})

//to delete favorite
app.get('/deleteFavorite/user_id/:user_id/place_id/:place_id', async (req, res) => {

    let {user_id, place_id} = req.params;
	console.log(req.params);
	console.log(user_id,place_id);
    if (!(user_id && place_id))
    {
        res.send(false)
        return
    }
    let result = await queries.deleteFavourite(place_id, user_id);
    if (result)
    {
        res.redirect('/favoriete.html?id=' + user_id)
        return
    }
    res.send(false)
});


//for the recomandtion

app.get('/mostFavorite', async function (req, res) {

	let result = await queries.mostFavorite();
	console.log(result);
	res.send(result);

})




app.post('/getplace', async (req, res) => {
	let place_id = req.body.place_id;
	let place = await queries.getPlace(place_id);
	if (!place) {
		res.redirect("/zoek.html")
		return
	}
	res.send(place);
});

app.listen(port, () => {
	console.log(`http://localhost:${port}`);
});
