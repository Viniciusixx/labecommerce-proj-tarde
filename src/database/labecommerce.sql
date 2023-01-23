

--relacoes sql I

CREATE TABLE users( -- criar tabela
    id TEXT PRIMARY KEY UNIQUE NOT NULL,
    email TEXT UNIQUE NOT NULL,
    password TEXT NOT NULL
);

INSERT INTO users(id, email, password)
VALUES ("o001", "vini@gmail.com", "423r24"),
("o002", "marcia@gmail.com", "42rf24r4"),
("o003", "outlier@gmail.com", "245rf43t"),
("o004", "bianca@gmail.com", "23524r42");

SELECT * FROM users;

--excluir tabela
DROP TABLE users;

--retorna os usuários cadastrados
SELECT ('users');

--mocke um termo de busca (email)
SELECT * FROM users
WHERE email;

--mocke uma id
SELECT * FROM users
WHERE id = "003";

--delete a linha baseada no valor mockado
DROP TABLE users
id = 3;




CREATE TABLE products( -- criar tabela de produtos
    id TEXT PRIMARY KEY UNIQUE NOT NULL,
    name TEXT NOT NULL,
    price REAL NOT NULL ,
    category TEXT NOT NULL
);

--excluir tabela
DROP TABLE products;

INSERT INTO products(id, name, price, category)
VALUES ("o001", "banana", 4, "feira"),
("o002", "maça", 3, "feira"),
("o003", "pera", 5, "feira"),
("o004", "uva", 6, "feira"),
("o005", "abacate", 12, "feira");

SELECT * FROM products;

--retorna os produtos cadastrados
SELECT ('products');
--mocke um termo de busca (category)
SELECT * FROM products
WHERE category;

--mocke um termo de busca, por exemplo "monitor"
--retorna o resultado baseado no termo de busca
SELECT * FROM products
WHERE name = "computador";

--mocke uma products
SELECT * FROM products
WHERE id = "a003";

--mocke um novo usuário
--insere o item mockado na tabela users
INSERT INTO products(id, name, price, category)
VALUES
("a006", "vassoura", 20, "feira");

--mocke uma id
--delete a linha baseada no valor mockado
DELETE FROM products
WHERE id = "a002";

--mocke valores para editar um user
--edite a linha baseada nos valores mockados
UPDATE products 
SET price = 40
WHERE id = "a001";

SELECT * FROM products;

--retorna o resultado ordenado pela coluna email em ordem crescente
SELECT * FROM users ORDER by email ASC;

--retorna o resultado ordenado pela coluna price em ordem crescente
--limite o resultado em 20 iniciando pelo primeiro item
SELECT * FROM products ORDER by price ASC LIMIT 20;

--mocke um intervalo de preços, por exemplo entre 100.00 e 300.00
--retorna os produtos com preços dentro do intervalo mockado em ordem crescente
SELECT * FROM products 
WHERE price >="4" AND price <="40" 
ORDER by price ASC ;

DROP TABLE purchases;

SELECT * FROM purchases;

CREATE TABLE purchases(
 id TEXT PRIMARY KEY UNIQUE NOT NULL,
    total_price REAL UNIQUE NOT NULL ,
    paid INTEGER NOT NULL,
    delivered_at TEXT,
    buyer_id TEXT NOT NULL,
     FOREIGN KEY (buyer_id) REFERENCES users (id)
);

INSERT INTO purchases(id, total_price, paid, delivered_at, buyer_id)
VALUES ("b001", 5000, 0, "", "001"),
("b002", 1000, 0, "", "002"),
("b003", 4000, 0,  "", "003"),
("b004", 3000, 0, "", "001");

UPDATE purchases
SET delivered_at = "DATATIME 22/01/2023"
WHERE id="b002";

SELECT * FROM purchases
INNER JOIN users
ON purchases.buyer_id=users.id
WHERE users.id= "001";
