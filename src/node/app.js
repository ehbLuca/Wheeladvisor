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
app.get('/loggedIn', async(req, res) => {
	let {authToken} = req.cookies;
	if(authToken && await queries.hasToken(authToken))
		res.send(JSON.stringify(1));
	else
		res.send(JSON.stringify(null))
});

// route for logging in with credentials or with a token in the cookies
app.post('/login', async (req, res) => {
	let {authToken} = req.cookies;
	if (authToken)
	{
		console.log(`I: (/login) Trying to login with token.`);
		console.log(`I: (/login) Finding user with token = ${authToken}`);
		let email = await queries.hasToken(authToken);
		console.log('I: (/login) email:', email);
		if (email)
			res.redirect("/start.html")
		else
		{
			res.clearCookie('authToken');
			res.redirect('/login.html')
		}
		return;
	}

	let {email, password} = req.body;
	if (!(email && password))
	{
		console.error("E: (/login) Missing password or email");
		res.redirect('/login.html');
		return;
	}
	email = email.toLowerCase();
	console.log(`I: (/login) Logging in ${email} and ${password}`);
	
	if (await queries.canLogin([email, password]))
	{
		let token = crypto.randomBytes(32).toString('hex');
		res.cookie('authToken', token, {maxAge: 24 * 60 * 60 * 1000});
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
	let {name, email, password} = req.body;
	if (!(name && email && password))
	{
		res.redirect('/register-error.html');
		return;
	}
	email = email.toLowerCase();
	let salt = bcrypt.genSaltSync(10);
	password = bcrypt.hashSync(password, salt);

	let result = await queries.registerUser([name, email, password])
	if (result)
	{
		res.redirect('/start.html');
	} else {
		res.redirect('/register-error.html');
	}
});

app.post('/search', async (req, res) => {
	let query = req.body.q;
	console.error(`I: (/search) Searching for places matching '${query}'.`);
	let result = await queries.queryPlaces(query);
	res.send(result);
});

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
