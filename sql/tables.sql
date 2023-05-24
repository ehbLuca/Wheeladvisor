-- SQL instructions for the wheeladvisor database
-- made for mariadb

DROP DATABASE padmindb;
CREATE DATABASE padmindb;
use padmindb;

CREATE TABLE users(
	user_id INT(11) AUTO_INCREMENT,
	name VARCHAR(255) NOT NULL,
	email VARCHAR(255) NOT NULL,
	password VARCHAR(255) NOT NULL,
	CONSTRAINT pk_user_id PRIMARY KEY(user_id)
);

CREATE TABLE places(
	place_id INT(11) AUTO_INCREMENT,
	name VARCHAR(255) NOT NULL UNIQUE,
	address VARCHAR(255) NOT NULL,
	category VARCHAR(255) NOT NULL,
	description TEXT NULL,
	proscons VARCHAR(255) NULL,
	CONSTRAINT pk_place_id PRIMARY KEY(place_id)
);

CREATE TABLE categories(
	category_id INT(11) AUTO_INCREMENT,
	name VARCHAR(255) NOT NULL,
	CONSTRAINT pk_category_id PRIMARY KEY(category_id)
);

CREATE TABLE pictures(
	picture_id INT(11) AUTO_INCREMENT,
	place_id INT(11) NOT NULL,
	name VARCHAR(255) NOT NULL,
	file_path VARCHAR(255) NOT NULL,
	CONSTRAINT pk_picture_id PRIMARY KEY(picture_id),
	CONSTRAINT fk_picture_place_id FOREIGN KEY(place_id)
		REFERENCES places(place_id)
);


CREATE TABLE reviews(
	review_id INT(11) AUTO_INCREMENT,
	name VARCHAR(255) NOT NULL,
	rating INT(11) NOT NULL DEFAULT 0,
	likes INT(11) NOT NULL DEFAULT 0,
	text TEXT NOT NULL,
	place_id INT(11),
	user_id INT(11),
	CONSTRAINT pk_review_id PRIMARY KEY(review_id),
	CONSTRAINT fk_review_place_id
		FOREIGN KEY(place_id) REFERENCES places(place_id),
	CONSTRAINT fk_review_user_id
		FOREIGN KEY(user_id) REFERENCES users(user_id)
);

CREATE TABLE favorites(
	favorite_id INT(11) AUTO_INCREMENT,
	place_id INT(11),
	user_id INT(11),
	CONSTRAINT pk_favorite_id PRIMARY KEY(favorite_id),
	CONSTRAINT fk_favorite_place_id 
		FOREIGN KEY(place_id) REFERENCES places(place_id),
	CONSTRAINT fk_favorite_user_id 
		FOREIGN KEY(user_id) REFERENCES users(user_id)
);
