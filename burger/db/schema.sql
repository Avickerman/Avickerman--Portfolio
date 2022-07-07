-- DROP DATABASE IF EXISTS burgers_db;
-- CREATE DATABASE burgers_db;
-- USE burgers_db;
use zjdqieu31q7yg7rx;
CREATE TABLE burgers (
    id int AUTO_INCREMENT NOT NULL,
    burger_name varchar(255),
    devoured BOOLEAN DEFAULT false,
	PRIMARY KEY(id)
);
	