const mariadb = require('mariadb');

// Wrapper function that will make queries
// Later this shouldn't be exported
async function queryDB(query) {

	let conn, res;
	try {
		conn = await mariadb.createConnection({
			// database connection details
			host: '0.0.0.0',
			port: 4033,
			user: 'padmin',
			password: 'bulbizarre',
			database: 'padmindb'
		});
		// the query itself
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

// adds an user to the database, returns true if succesful, returns false if an error occurred.
async function loginUser(values) {
	let [name, password] = values;
	let result = await queryDB(`
		SELECT name, email FROM users
		WHERE email = '${name}'
			AND password = '${password}'
	`);
	if (result.length == 0)
		return false;
	return true;
}

module.exports = {
	queryDB, loginUser
};
