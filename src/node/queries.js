const mariadb = require('mariadb');
const bcrypt = require('bcrypt');

// Creates a connection with the database
async function dbConnect() {
	let conn = null;
	try {
		conn = await mariadb.createConnection({
			// database connection details
			host: '10.3.50.5',
			user: 'padmin',
			password: 'bulbizarre',
			database: 'padmindb'
		});
		return conn;
	} catch (err) {
		console.error('Error creating connection:', err);
	}
}

// Wrapper function that will make queries
// Later this shouldn't be exported
async function queryDB(query) {
	let conn = null;
	let result;
	try {
		conn = await dbConnect();
		result = await conn.query(query);
	} catch (err) {
		throw err;
	} finally {
		if (conn) {
			try {
				await conn.end();
				if (result) return result;
			} catch (err) {
				console.error('Error closing connection:', err);
			}
		}
	}
}

async function insertPlace(place) {
	let {name, coordinates, category} = place;
	let conn = null;
	try {
		conn = await dbConnect();
		res = await conn.query(`
			INSERT INTO places(name, coordinate, category)
			VALUES(?, ?, ?)
			`, [name, `${coordinates.latitude} ${coordinates.longitude}`, category]);
	} catch (err) {
		console.error('Error while doing query:', err);
	} finally {
		conn.end()
	}
}

async function queryPlaces(query, category, adres) {
	let conn = null;
	let results = null;
	try {
		conn = await dbConnect();
		results = await conn.query(`
		SELECT * FROM places
		WHERE UPPER(name) LIKE UPPER(?)
		AND UPPER(category) LIKE UPPER(?)
		AND UPPER(address) LIKE UPPER(?)
		`, [`%${query}%`,`%${category}%`,`%${adres}%`]);
	} catch (err) {
		console.error(`Error while searching for'${query}'`, err);
	} finally {
		conn.end();
		return results;
	}
} 

async function getCoordinates(coordinate) {
	let conn = null;
	let results = null;
	try {
		conn = await dbConnect();
		results = await conn.query(`
		SELECT * FROM places
	
		`);
	} catch (err) {
		console.error(`Error while searching for'${coordinate}'`, err);
	} finally {
		conn.end();
		return results;
	}
}

// checks credentials of an user returns true if succesful, returns false if an error occurred.
async function canLogin(values) {
	let [email, password] = values;
	let conn = null;
	try {
		conn = await dbConnect();
		let result = await conn.query(`
			SELECT password FROM users
			WHERE LOWER(email) = ?
			`, [email]);
		if (result.length == 0)
			return false;

		result = result[0];

		console.log(`I: (canLogin) password: ${password}, hashed: ${result.password}`);
		conn.end();
		return bcrypt.compareSync(password, result.password);
	} catch(err) {
		console.error('Error:', err);
	}
}

// adds an user to the database, returns true if succesful, returns false if an error occurred.
async function registerUser(values) {
	let conn = null;
	try {
		conn = await dbConnect();
		await conn.query(`
			INSERT INTO users(name, email, password)
			VALUES(?, LOWER(?), ?)
		`, values);
		return true;
	} catch(error) {
		console.log("Caught error:", error.message);
		console.log("Stack trace:", error.stack);
		return false;
	}
}

async function hasToken(token)
{
	let conn = null;
	try {
		conn = await dbConnect();
		let results = await conn.query(`
			SELECT LOWER(email) AS email FROM users u
			JOIN tokens t
				ON u.user_id = t.user_id
			WHERE t.value = ?
			`, [token])
		conn.end()
		console.log(`I: (hasToken) results: `, results);
		return results[0]?.email;
	} catch(err) {
		console.error('Error:', err);
	}
}

async function storeToken(email, token)
{
	console.log('I: (storeToken) token:', token);
	console.log('I: (storeToken) email:', email);
	let conn = null;
	try {
		conn = await dbConnect();

		let results = await conn.query(`
			SELECT user_id FROM users
			WHERE LOWER(email) = LOWER(?)
			`, [email])
		let user_id = results[0]?.user_id

		results = await conn.query(`
			SELECT * FROM tokens t
			WHERE user_id = ?`, [user_id])

		if (results.length == 0)
		{
			console.log("I: (storeToken) user has no token yet.");
			await conn.query(`
				INSERT INTO tokens(type, value, user_id)
				VALUES ('session', ?, ?)
				`, [token, user_id])
		} else {
			console.log("I: (storeToken) user already has a token.");
			await conn.query(`
				UPDATE tokens t
				JOIN users u
				ON u.user_id = t.user_id
				SET t.value = ?
				WHERE LOWER(u.email) = LOWER(?)
				`, [token, email])
		}

		conn.end()
	} catch(err) {
		console.error('Error:', err);
	}
}

module.exports = {
	canLogin, registerUser, 
	hasToken, storeToken,
	insertPlace, queryPlaces, getCoordinates
};
