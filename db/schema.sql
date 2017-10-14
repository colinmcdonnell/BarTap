-- Create a database
CREATE DATABASE bev_db;
USE bev_db;

-- Create the table
CREATE TABLE bev
(
id int NOT NULL AUTO_INCREMENT,
item_name varchar(255) NOT NULL,
item_type varchar(255) NOT NULL,
price decimal(3,2) NOT NULL,
unit decimal(3,2) NOT NULL,
createdAt TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
updatedAt TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
PRIMARY KEY (id)
);

CREATE TABLE users
(
	id int NOT NULL AUTO_INCREMENT,
	emp_no varchar(25) NOT NULL,
	name varchar(255) NOT NULL,
	image varchar(255) NOT NULL,
	PRIMARY KEY (id)
);

CREATE TABLE inventory (
id int NOT NULL AUTO_INCREMENT,
item_name varchar(255) NOT NULL,
item_id varchar(255) NOT NULL,
type varchar(255) NOT NULL,
current decimal(10,2) NOT NULL,
inventory_upper int(10) NOT NULL,
inventory_lower int(10) NOT NULL,
PRIMARY KEY (id)
);

CREATE TABLE sales (
id int NOT NULL AUTO_INCREMENT,
item_name varchar(255) NOT NULL,
count int(10) NOT NULL,
price_per_unit decimal(10) NOT NULL,
units int(10) NOT NULL,
user varchar(255) NOT NULL,
primary KEY (id)
);

PRIMARY KEY (id)
);

CREATE TABLE invoice (
id int NOT NULL AUTO_INCREMENT,
sent BOOLEAN DEFAULT TRUE,
received BOOLEAN,
createdAt TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
updatedAt TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
PRIMARY KEY(id)
);