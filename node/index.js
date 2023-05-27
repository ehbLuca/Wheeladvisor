'use strict'

/**
* Dependencies
*/
const express = require('express');
const bcrypt = require('bcrypt');
const path = require('path');
const logger = require('morgan');

const {
	registerUser, loginUser, queryPlaces
} = require('./queries.js');

let app = express();
let port = 3000;

/* custom logging */
if (process.env.NODE_ENV !== 'test') app.use(logger(':method :url'))

app.use(express.urlencoded({ extended: true }));
app.use(express.json());
app.use('/', express.static(path.join(__dirname, 'website')));

app.get('/', (req, res) => {
	res.redirect('/start.html')
});

// route for logging in
// expects an email and password
app.post('/login', async (req, res) => {

	let {email, password} = req.body;
	console.log(`Logging in ${email} and ${password}`);
	
	if (await loginUser([email, password]))
	{
		res.redirect('/start.html');
	} else {
		res.redirect('/login-error.html');
	}
});

// route for registering
// expects a name, email and password
app.post('/register', async (req, res) => {
	let name = req.body.name;
	let email = req.body.email;
	let salt = bcrypt.genSaltSync(10);
	let password = bcrypt.hashSync(req.body.password, salt);

	let result = await registerUser([name, email, password])
	if (result)
	{
		res.redirect('/start.html');
	} else {
		res.redirect('/register-error.html');
	}
});

app.post('/search', async (req, res) => {
	let query = req.body.q;
	console.error(`Searching for places matching '${query}'.`);
	let result = await queryPlaces(query);
	res.send(result);
});

app.listen(port, () => {
	console.log(`http://localhost:${port}`);
});
