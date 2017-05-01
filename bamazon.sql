CREATE DATABASE Bamazon;

USE Bamazon;

CREATE TABLE products (
	item_id INTEGER(10) AUTO_INCREMENT NOT NULL,
    product_name VARCHAR(50),
    department_name VARCHAR(50),
    price DECIMAL(10,4) NULL,
    stock_quantity INTEGER(10),
    PRIMARY KEY(item_id)
);

USE Bamazon;

INSERT INTO products(item_id, product_name, department_name, price, stock_quantity)
VALUES
(1, "iPhone 7 Jewel Case", "Accessories", 5.50, 43),
(2, "Electric Can Opener", "Kitchen", 14.90, 85),
(3, "Pink Fuzzy Slippers", "Shoes", 8.99, 15),
(4, "Lebron James XL Jersey", "Mens Clothing", 99.99, 12),
(5, "Kitchen Griddle", "Kitchen", 19.99, 62),
(6, "Christmas Tree", "Seasonal", 99.99, 100),
(7, "Georgio Armani Si Perfume", "Beauty", 110.00, 45),
(8, "Basketball", "Toys", 8.00, 200),
(9, "Beats Wireless Headphones", "Electronics", 99.99, 89),
(10, "Monoply Board Game", "Toys", 22.10, 5);