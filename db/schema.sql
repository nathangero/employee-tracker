DROP DATABASE IF EXISTS farleymart_db;
CREATE DATABASE farleymart_db;

USE farleymart_db;

CREATE TABLE department (
	id INT NOT NULL AUTO_INCREMENT PRIMARY KEY,
    name VARCHAR(30) NOT NULL
);

