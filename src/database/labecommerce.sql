-- Active: 1674436690303@@127.0.0.1@3306

CREATE TABLE users (
    id TEXT PRIMARY KEY UNIQUE NOT NULL,
    email TEXT UNIQUE NOT NULL,
    password TEXT NOT NULL
);

SELECT * FROM users;

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

SELECT * FROM products;
