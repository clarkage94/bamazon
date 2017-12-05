DROP DATABASE IF EXISTS bamazon_db;

CREATE DATABASE bamazon_db;

USE bamazon_db;

CREATE TABLE products (
  item_id int AUTO_INCREMENT,
  product_name VARCHAR (50) NOT NULL,
  department_name VARCHAR (50) NOT NULL,
  price DECIMAL(10,2) NOT NULL,
  stock_quantity INT NOT NULL,
  PRIMARY KEY(item_id)
);

INSERT INTO products (product_name, department_name, price, stock_quantity) 
VALUES  
	("Every Man Jack Shampoo + Conditioner", "Cosmetics", 5.75, 500),
	("Old Spice Body wash", "Cosmetics", 4.75, 627),
	("Brawny Paper Towels", "Grocery", 4.25, 400),
	("Horizon Organic Chocolate Milk", "Grocery", 4.50, 200),
	("Adidas Yeezy Boost 350 V2 'Zebra'", "Shoes", 220.00, 275),
	("Adidas Yeezy Boost 350 'Pirate Black 2016'", "Shoes", 220.00, 100),
	("Yoga Mat", "Sports", 19.99, 150),
	("25lb Dumb bell", "Sports", 15.99, 89),
	("Adidas Shorts", "Clothing", 17.88, 250),
	("Ibuprophen", "Pharmacy", 4.95, 389),
	("Band Aid", "Pharmacy", 3.25, 550),
	("Ben & Jerry Ice Cream", "Grocery", 3.25, 432);

SELECT * FROM products;


