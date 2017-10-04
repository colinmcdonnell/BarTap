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