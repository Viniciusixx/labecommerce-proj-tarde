-- Active: 1674579802581@@127.0.0.1@3306

CREATE TABLE
    users (
        id TEXT PRIMARY KEY UNIQUE NOT NULL,
        email TEXT UNIQUE NOT NULL,
        password TEXT NOT NULL
    );

DROP TABLE users;

INSERT INTO
    users(id, email, password)
VALUES
(
        "a001",
        "vini@gmail.com",
        "3635v53"
    );

INSERT INTO
    users(id, email, password)
VALUES
(
        "a002",
        "souza@gmail.com",
        "3526v536v"
    );

INSERT INTO
    users(id, email, password)
VALUES
(
        "a003",
        "alves@gmail.com",
        "3526v5v"
    );

DROP TABLE products;

CREATE TABLE
    products (
        id TEXT PRIMARY KEY UNIQUE NOT NULL,
        name TEXT NOT NULL,
        price REAL NOT NULL,
        category TEXT NOT NULL
    );

INSERT INTO
    products(id, name, price, category)
VALUES
("a01", "uva", 122, "feira");

INSERT INTO
    products(id, name, price, category)
VALUES
("a02", "pera", 333, "feira");

INSERT INTO
    products(id, name, price, category)
VALUES
("a03", "maça", 444, "feira");

INSERT INTO
    products(id, name, price, category)
VALUES
("a04", "salada", 555, "feira");

INSERT INTO
    products(id, name, price, category)
VALUES
("a05", "morango", 666, "feira");

SELECT * from products;

UPDATE products SET name = "couro", price =100 WHERE id = "a02";

UPDATE products SET price = 299 WHERE id = "a02";

SELECT * from products;

SELECT * from users;

SELECT * FROM products WHERE name ="pera";

INSERT INTO
    users(id, email, password)
VALUES
(
        "a06",
        "anac@gmail.com",
        "325v346"
    );

INSERT INTO
    products(id, name, price, category)
VALUES
(
        "a006",
        "patins",
        150.99,
        "brinquedos"
    );

SELECT * from products;

SELECT * FROM products WHERE id= "a006";

DELETE FROM users WHERE id="a06";

DELETE FROM products WHERE id = "a006";

UPDATE users
SET
    email = "marciadesouza333@gmail.com",
    password = "43b74b"
WHERE id = "a001";

UPDATE products SET price=1055.99 WHERE id="a02";

SELECT * FROM users ORDER BY email asc;

SELECT * FROM products ORDER BY price asc LIMIT 20;

SELECT *
FROM products
WHERE
    price >= "200"
    AND price <= "10000"
ORDER BY price ASC;

DROP TABLE purchases;

CREATE TABLE
    purchases(
        id TEXT PRIMARY KEY UNIQUE NOT NULL,
        total_price REAL UNIQUE NOT NULL,
        paid INTEGER NOT NULL,
        delivered_at TEXT,
        buyer_id TEXT NOT NULL,
        FOREIGN KEY (buyer_id) REFERENCES users (id)
    );

INSERT INTO
    purchases(
        id,
        total_price,
        paid,
        delivered_at,
        buyer_id
    )
VALUES
("001", 100, 0, "", "a001"), ("002", 200, 0, "", "a002"), ("003", 300, 0, "", "a001"), ("004", 400, 0, "", "a003");

SELECT * FROM purchases;

DROP TABLE purchases_products;

UPDATE purchases
SET
    delivered_at = DATETIME("now", "localtime")
WHERE id = "002";

SELECT *
FROM purchases
    INNER JOIN users ON purchases.buyer_id = users.id
WHERE users.id = "a001";

CREATE TABLE
    purchases_products (
        purchase_id TEXT NOT NULL,
        product_id TEXT NOT NULL,
        quantity INTEGER NOT NULL,
        FOREIGN KEY (purchase_id) REFERENCES purchases(id) FOREIGN KEY (product_id) REFERENCES products(id)
    );

INSERT INTO
    purchases_products(
        purchase_id,
        product_id,
        quantity
    )
VALUES ("001", "a03", 1), ("002", "a03", 2), ("003", "a03", 3);

DROP TABLE purchases_products;

SELECT *
FROM purchases
    INNER JOIN purchases_products ON purchases_products.purchase_id = purchases.id;

SELECT
    purchases.id AS purchaseId,
    purchases.total_price,
    purchases.paid,
    purchases.delivered_at,
    purchases.buyer_id AS buyerId,
    products.id,
    products.name,
    products.price
FROM purchases
    LEFT JOIN purchases_products ON purchases_products.purchase_id = purchases.id
    INNER JOIN products ON purchases_products.product_id = products.id;