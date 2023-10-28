DROP DATABASE IF EXISTS farleymart_db;
CREATE DATABASE farleymart_db;

USE farleymart_db;

CREATE TABLE department (
	id INT NOT NULL AUTO_INCREMENT PRIMARY KEY,
    name VARCHAR(30) NOT NULL
);

CREATE TABLE role (
	id INT NOT NULL AUTO_INCREMENT PRIMARY KEY,
    title VARCHAR(30) NOT NULL,
    salary DECIMAL NOT NULL,
    department_id INT,
    
    FOREIGN KEY(department_id)
    REFERENCES department(id)
);