const mariadb = require('mariadb');

// Error that should be thrown if a value already exists in a column.
class ValueAlreadyUsedError extends Error {
	constructor([column, value]) {
		const message = `${column}: '${value}' was already used.`;
		super(message);
		this.name = 'ValueAlreadyUsedError';
		this.column = column;
		this.value = value;
	}
}

// Checks if a value is already used in the users table
async function valueUsed(values) {
	const [column, value] = values;
	let res = await queryDB(`
		SELECT * FROM users 
		WHERE ${column} IN("${value}")
	`);
	if (res.length > 0)
		throw new ValueAlreadyUsedError([column, value]);
}

// Creates a connection with the database
async function dbConnect() {
	try {
		conn = await mariadb.createConnection({
			// database connection details
			host: '0.0.0.0',
			port: 4033,
			user: 'padmin',
			password: 'bulbizarre',
			database: 'padmindb'
		});
		return conn;
	} catch (err) {
		throw err;
	}
}

// Wrapper function that will make queries
// Later this shouldn't be exported
async function queryDB(query) {
	let conn = null;
	try {
		conn = await dbConnect();
		res = await conn.query(query);
	} catch (err) {
		throw err;
	} finally {
		if (conn) {
			try {
				await conn.end();
				if (res) return res;
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
			INSERT INTO places(name, address)
			VALUES(?,?)
			`, [name, `${coordinates.latitude} ${coordinates.longitude}`]);
	} catch (err) {
		console.error('Error while doing query:', err);
	}
}

// adds an user to the database, returns true if succesful, returns false if an error occurred.
async function loginUser(values) {
	let [email, password] = values;
	let result = await queryDB(`
		SELECT name, email FROM users
		WHERE email = '${email}'
			AND password = '${password}'
	`);
	if (result.length == 0)
		return false;
	return true;
}

// adds an user to the database, returns true if succesful, returns false if an error occurred.
async function registerUser(values) {
	let [name, email, password] = values;
	try {
		await valueUsed(["name", name]);
		await valueUsed(["email", email]);
		queryDB(`
			INSERT INTO users(name, email, password)
			VALUES('${name}', '${email}', '${password}')
		`);
		return true;
	} catch(error) {
		console.log("Caught error:", error.message);
		console.log("Stack trace:", error.stack);
		return false;
	}
}

module.exports = {
	queryDB, loginUser, registerUser, insertPlace
};
