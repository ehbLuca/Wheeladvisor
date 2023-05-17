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

module.exports = {
	queryDB
};
