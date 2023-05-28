const mariadb = require('mariadb');

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
			INSERT INTO places(name, address, category)
			VALUES(?,?, ?)
			`, [name, `${coordinates.latitude} ${coordinates.longitude}`, category]);
	} catch (err) {
		console.error('Error while doing query:', err);
	} finally {
		conn.end()
	}
}

async function queryPlaces(query) {
	let conn = null;
	let results = null;
	try {
		conn = await dbConnect();
		results = await conn.query(`
		SELECT * FROM places
		WHERE UPPER(name) LIKE UPPER(?)
		`, [`%${query}%`]);
	} catch (err) {
		console.error(`Error while searching for'${query}'`, err);
	} finally {
		conn.end();
		return results;
	}
} 

// adds an user to the database, returns true if succesful, returns false if an error occurred.
async function loginUser(values) {
	let [email, password] = values;
	let conn = null;
	try {
		conn = await dbConnect();
		let result = await conn.query(`
			SELECT name, email FROM users
			WHERE email = ?
			AND password = ?
			`, [email, password]);
		if (result.length == 0)
			return false;
		return true;
	} catch {
		console.error('Error:', err);
	} finally {
		conn.end();
	}
}

// adds an user to the database, returns true if succesful, returns false if an error occurred.
async function registerUser(values) {
	let [name, email, password] = values;
	let conn = null;
	try {
		conn = await dbConnect();
		await conn.query(`
			INSERT INTO users(name, email, password)
			VALUES(?, ?, ?)
		`, [name, email, password]);
		return true;
	} catch(error) {
		console.log("Caught error:", error.message);
		console.log("Stack trace:", error.stack);
		return false;
	}
}

module.exports = {
	queryDB, loginUser, registerUser, insertPlace, queryPlaces
};
