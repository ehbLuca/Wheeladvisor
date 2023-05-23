// maak verbinding met MariaDB-server
const connection = mysql.createConnection({
    host: 'localhost',
    user: 'username',
    password: 'password',
    database: 'database_name'
  });
  
  // functie om locaties te zoeken
  function searchLocations(searchQuery) {
    return new Promise((resolve, reject) => {
      // Tegen SQL-injecties
      const escapedSearchQuery = connection.escape(`%${searchQuery}%`);
      // SQL query
      const query = `SELECT * FROM locations WHERE name LIKE ${escapedSearchQuery}`;
      // voer query uit
      connection.query(query, (error, results) => {
        if (error) {
          reject(error);
        } else {
          resolve(results);
        }
      });
    });
  }
  
  // voorbeeld
  searchLocations('Brussel Nationaal Museum')
    .then((results) => {
      console.log(results);
    })
    .catch((error) => {
      console.error(error);
    });
 
//Dit voorbeeld gaat ervan uit dat tabel met de naam "locaties" in MariaDB-database is met een kolom met de naam "naam" die de namen van de locaties opslaat. 
//De functie "searchLocations" neemt parameter "searchQuery", de query die de gebruiker invoert. 
//

  