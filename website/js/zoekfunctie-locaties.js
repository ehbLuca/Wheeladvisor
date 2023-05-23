const mysql = require('mysql');
const express = require('express');
const app = express();
const port = 3000;
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
      // Tegen SQL-injecties = SECURITY!
      const escapedSearchQuery = connection.escape(`%${searchQuery}%`);
      // SQL query
      const query = `SELECT locations.name AS location_name, categories.name AS category_name
      FROM locations
      JOIN categories ON locations.category_id = categories.id
      WHERE locations.name LIKE ${escapedSearchQuery}`;
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
  
// voorbeeld: zoeken voor Brussel Nationaal Museum
  searchLocations('Brussel Nationaal Museum')
    .then((results) => {
      console.log(results);
    })
    .catch((error) => {
      console.error(error);
    });
 
//Dit voorbeeld gaat ervan uit dat tabel met de naam "locaties" in MariaDB-database is met een kolom met de naam "naam" die de namen van de locaties opslaat. 
//Functie "searchLocations" neemt parameter "searchQuery", de query die de gebruiker invoert. 
//Tabel "locaties" heeft kolom met naam "category_id" die verwijst naar kolom "id" in tabel "categorieën".

  