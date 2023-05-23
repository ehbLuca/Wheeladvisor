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
  
// functie om plaatsen te zoeken
  function searchPlaces(searchQuery) {
    return new Promise((resolve, reject) => {
      // Tegen SQL-injecties = SECURITY!
      const escapedSearchQuery = connection.escape(`%${searchQuery}%`);
      // SQL query
      const query = `SELECT place.name AS place_name, categories.name AS category_name
      FROM places
      JOIN categories ON places.category_id = categories.id
      WHERE places.name LIKE ${escapedSearchQuery}`;
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
  searchPlaces('Brussel Nationaal Museum')
    .then((results) => {
      console.log(results);
    })
    .catch((error) => {
      console.error(error);
    });
 
//Dit voorbeeld gaat ervan uit dat tabel met de naam "places" in MariaDB-database is met een kolom "name" genoemd die de namen van de plaatsen opslaat. 
//Functie "searchPlaces" neemt parameter "searchQuery", de query die de gebruiker invoert. 
//Tabel "plaatsen" heeft kolom met naam "category_id" die verwijst naar kolom "id" in tabel "categorieën".

  