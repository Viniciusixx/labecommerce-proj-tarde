-- Active: 1674436690303@@127.0.0.1@3306

CREATE TABLE users (
    id TEXT PRIMARY KEY UNIQUE NOT NULL,
    email TEXT UNIQUE NOT NULL,
    password TEXT NOT NULL
);


INSERT INTO users(id, email, password)
VALUES ("a001", "vini@gmail.com", "19374"),
 ("a002", "broo@gmail.com", "31redr3"),
 ("a003", "glee@gmail.com", "315r3ed3");

 CREATE TABLE products (
    id TEXT PRIMARY KEY UNIQUE NOT NULL,
    name TEXT NOT NULL,
    price REAL NOT NULL,
    category TEXT NOT NULL
);


INSERT INTO products(id, name, price, category)
VALUES("o001", "maça", 40, "feira"),
("o002", "pera", 20, "feira"),
("o003", "uva", 10, "feira"),
("o004", "mandioca", 90, "feira"),
("o005", "alface", 30, "feira");

SELECT * FROM users;
SELECT * FROM products;

SELECT * FROM products
WHERE name = "maça";

INSERT INTO users(id, email, password)
VALUES ("a004", "lay@gmail.com", "32r9f8u284f");
INSERT INTO products(id, name, price, category)
VALUES ("o006", "escova", 99, "banheiro");

SELECT * FROM products
WHERE id = "o006";

DELETE FROM products
WHERE id = "o006";

DELETE FROM products
WHERE id = "a004";

INSERT INTO users(id, email, password)
VALUES("a006", "marcia@gmail.com", "3189d23");

UPDATE users 
SET id = "a999"
WHERE id = "a006";


INSERT INTO products(id, name, price, category)
VALUES("o010", "morango", 9, "feira");

UPDATE products 
SET id = "o999"
WHERE id = "o010";

SELECT * FROM users
ORDER BY email ASC;

SELECT * FROM products
ORDER BY price ASC
LIMIT 0, 20;

SELECT * FROM products
WHERE price >= "10" AND price <= "90"
ORDER BY price ASC;



SELECT * FROM pokemons
WHERE "type" = "fire" OR "type" = "grass"
ORDER BY attack ASC
LIMIT 2, 3;
