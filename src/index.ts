import {users, products, purchases} from "./database";
import cors from 'cors'
import { db } from './knex'
import express, { Request, Response } from 'express'
import { TProduct, TUser, CATEGORY_PURCHASE } from "./type";

const app = express();
app.use(express.json())
app.use(cors())

app.listen(3003, () => {
    console.log("Servidor rodando na porta 3003")
})


app.get("/product/search", async (req: Request, res: Response) => {
    try {
        const q = req.query.q as string;

        if (q.length <= 1) {
            res.status(400);
            throw new Error("query params deve possuir pelo menos um caractere");
        }

        const [product] = await db.raw(`
     SELECT * FROM products
     WERE LOWER(name) LIKE("%${q}%")
     `)
        res.status(200).send({ product: product });
    } catch (error: any) {
        console.log(error);

        if (res.statusCode === 200) {
            res.status(500);
        }

        res.send(error.message);
    }
});

app.post("/users", async (req: Request, res: Response) => {
    try {
        const { id, email, password } = req.body
        if (typeof id !== "string") {
            res.status(400)
            throw new Error("'id' inválido, deve ser uma string");

        }
        if (typeof email !== "string") {
            res.status(400)
            throw new Error("'email' inválido, deve ser uma string");

        }
        if (typeof password !== "string") {
            res.status(400)
            throw new Error("'password' inválido, deve ser uma string");

        }
        if (id.length < 1 || email.length < 1 || password.length < 2) {
            res.status(400)
            throw new Error("'id' ou 'email' devem ter no minímo 1 caractere");

        }
        await db.raw(`
      INSERT INTO users(id, email, password)
      VALUES("${id}", "${email}", ${password});`)
        res.status(200).send(`usuário cadastrada com sucesso`)
    } catch (error) {
        console.log(error)

        if (req.statusCode === 200) {
            res.status(500)
        }

        if (error instanceof Error) {
            res.send(error.message)
        } else {
            res.send("Erro inesperado")
        }
    }
});

app.post("/users", (req: Request, res: Response) => {
    try {
        const id = req.body.id;
        const email = req.body.email;
        const password = req.body.password;

        const findId = users.find((user) => user.id === id);

        if (findId) {
            res.status(400);
            throw new Error("ID indisponivel");
        }

        const findEmail = users.find((user) => user.email === email);

        if (findEmail) {
            res.status(400);
            throw new Error("EMAIL indisponivel");
        }

        const newUser: TUser = {
            id,
            email,
            password,
        };

        users.push(newUser);
        res.status(201).send("Usuario criado com sucesso 😎");
    } catch (error: any) {
        console.log(error);

        if (res.statusCode === 200) {
            res.status(500);
        }

        res.send(error.message);
    }
});

app.post("/products", async (req: Request, res: Response) => {
    try {
        const id = req.body.id;
        const name = req.body.name;
        const price = req.body.price;
        const category = req.body.category;

        const findId = products.find((product) => product.id === id);

        if (findId) {
            res.status(400);
            throw new Error("ID indisponivel");
        }

        const newProduct: TProduct = {
            id,
            name,
            price,
            category,
        };
        await db.raw(`
      INSERT INTO products(id, name, price, category)
      VALUES("${id}", "${name}", "${price}", " "${category}"");`)

        products.push(newProduct);
        res.status(201).send("Produto criado com sucesso 😎");
    } catch (error: any) {
        console.log(error);

        if (res.statusCode === 200) {
            res.status(500);
        }

        res.send(error.message);
    }
});
app.post("/purchases", async (req: Request, res: Response) => {
    try {
        const { id, total_price, paid, delivered_at, buyer_id } = req.body;

        if (typeof id != "string") {
            res.status(400);
            throw new Error("'id' invalido, deve ser uma string");
        }

        if (typeof delivered_at != "string") {
            res.status(400);
            throw new Error("'delivered_at' invalido, deve ser uma string");
        }

        if (typeof buyer_id != "string") {
            res.status(400);
            throw new Error("'buyer_id' invalido, deve ser uma string");
        }

        if (typeof total_price != "number") {
            res.status(400);
            throw new Error("'total_price' invalido, deve ser um number");
        }

        if (paid > 1 && paid < 0) {
            res.status(400);
            throw new Error("'paid' invalido, deve ser 0 ou 1");
        }

        if (
            id.length < 1 ||
            paid.length < 1 ||
            delivered_at.length < 1 ||
            buyer_id.length < 1
        ) {
            res.status(400);
            throw new Error("As informações devem ter no minimo 1 caractere");
        }

        await db.raw(`
      INSERT INTO purchases (id, total_price, paid, delivered_at, buyer_id)
      VALUES ("${id}", "${total_price}", "${paid}", "${delivered_at}", "${buyer_id}")
    `);

        res.status(200).send(`Compra cadastrada com sucesso`);
    } catch (error: any) {
        console.log(error);

        if (res.statusCode === 200) {
            res.status(500);
        }

        res.send(error.message);
    }
});


app.get("/products/:id", async (req: Request, res: Response) => {
    try {
        const id = req.params.id;

        const [product] = await db.raw(`
        SELECT * FROM products
        WHERE id = "${id}"
      `);

        if (!product) {
            res.status(400);
            throw new Error("Produto não encontrado");
        }

        res.status(200).send({ product: product });
    } catch (error: any) {
        console.log(error);

        if (res.statusCode === 200) {
            res.status(500);
        }

        res.send(error.message);
    }
});

app.get("/users/:id/purchases", async (req: Request, res: Response) => {
    try {
        const id = req.params.id;

        const purchases = await db.raw(`
        SELECT * FROM purchases
        WHERE buyer_id = "${id}"
      `);

        res.status(200).send({ purchases: purchases });
    } catch (error: any) {
        console.log(error);

        if (res.statusCode === 200) {
            res.status(500);
        }

        res.send(error.message);
    }
});


app.get("/products/:id", (req: Request, res: Response) => {
    const id = req.params.id

    const result = products.find((product) => product.id === id)
    res.status(200).send("objeto product encontrado")
})

app.get("/users/:id/purchase", (req: Request, res: Response) => {
    const id = req.params.id

    const result = purchases.filter((purchase) => purchase.userId === id)
    res.status(200).send(result)
})

app.delete("/users/:id", (req: Request, res: Response) => {
    const id = req.params.id
    const indexToRemove = users.findIndex((user) => user.id === id)
    if (indexToRemove >= 0) {
        users.splice(indexToRemove, 1)
    }
    res.status(200).send("User apagado com sucesso")
})

app.delete("/products/:id", (req: Request, res: Response) => {
    const id = req.params.id
    const indexToRemove = products.findIndex((product) => product.id === id)
    if (indexToRemove >= 0) {
        products.splice(indexToRemove, 1)
    }
    res.status(200).send("Produto apagado com sucesso")
})



app.put("/users/:id", (req: Request, res: Response) => {
    const id = req.params.id
    const newId = req.body.id as string | undefined
    const newEmail = req.body.email as string | undefined
    const newPassword = req.body.password as string | undefined



    const resultToEdit = users.find((user) => user.id === id)
    if (resultToEdit) {

        resultToEdit.id = newId || resultToEdit.id
        resultToEdit.email = newEmail || resultToEdit.email
        resultToEdit.password = newPassword || resultToEdit.password




    }
    res.status(200).send("Atualização realizada com sucesso")

})

app.put("/product/:id", (req: Request, res: Response) => {
    const id = req.params.id
    const newId = req.body.id as string | undefined
    const newName = req.body.name as string | undefined
    const newPrice = req.body.price as number
    const newCategory = req.body.category as CATEGORY_PURCHASE | undefined



    const resultToEdit = products.find((product) => product.id === id)
    if (resultToEdit) {

        resultToEdit.id = newId || resultToEdit.id
        resultToEdit.name = newName || resultToEdit.name
        resultToEdit.price = isNaN(newPrice) ? resultToEdit.price : newPrice
        resultToEdit.category = newCategory || resultToEdit.category





    }
    res.status(200).send("Produto atualizado com sucesso")

})




app.get("/users", async (req: Request, res: Response) => {
    try {
        const result = await db.raw(`
      SELECT * FROM users;`)
        res.status(200).send({ users: result })
    } catch (error) {
        console.log(error)

        if (req.statusCode === 200) {
            res.status(500)
        }

        if (error instanceof Error) {
            res.send(error.message)
        } else {
            res.send("Erro inesperado")
        }
    }
})


app.get("/products", async (req: Request, res: Response) => {
    try {
        const result = await db.raw(`
      SELECT * FROM products;`)
        res.status(200).send({ products: result })
    } catch (error) {
        console.log(error)

        if (req.statusCode === 200) {
            res.status(500)
        }

        if (error instanceof Error) {
            res.send(error.message)
        } else {
            res.send("Erro inesperado")
        }
    }
})