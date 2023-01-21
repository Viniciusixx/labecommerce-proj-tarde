import { users, products, purchases } from "./database";
import cors from 'cors'
import express, { Request, Response } from 'express'
import { TProduct, TUser, TPurchase } from "./type";

const app = express();
    app.use(express.json())
    app.use(cors())

    app.listen(3003, () => {
    console.log("Servidor rodando na porta 3003")
})

    app.get("/users", (req: Request, res: Response) => {
    try {
        res.status(200).send(users);
    } catch (error: any) {
        console.log(error);

        if (res.statusCode === 200) {
            res.status(500);
        }

        res.send(error.message);
    }
});

app.get("/products", (req: Request, res: Response) => {
    try {
        res.status(200).send(products);
    } catch (error: any) {
        console.log(error);

        if (res.statusCode === 200) {
            res.status(500);
        }

        res.send(error.message);
    }
});


app.get("/product/search", (req: Request, res: Response) => {
    let productFilter;
    try {
        const q = req.query.q as string;

        if (q.length <= 1) {
            res.status(400);
            throw new Error("query params deve possuir pelo menos um caractere");
        }

        productFilter = products.filter((product) => {
            return product.name.toLowerCase().includes(q.toLowerCase());
        });
        res.status(200).send(productFilter);
    } catch (error: any) {
        console.log(error);

        if (res.statusCode === 200) {
            res.status(500);
        }

        res.send(error.message);
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
            throw new Error("email indisponivel");
        }

        const newUser: TUser = {
            id,
            email,
            password,
        };

        users.push(newUser);
        res.status(201).send("Usuario criado com sucesso");
    } catch (error: any) {
        console.log(error);

        if (res.statusCode === 200) {
            res.status(500);
        }

        res.send(error.message);
    }
});


app.post("/products", (req: Request, res: Response) => {
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

        products.push(newProduct);
        res.status(201).send("Produto criado com sucesso");
    } catch (error: any) {
        console.log(error);

        if (res.statusCode === 200) {
            res.status(500);
        }

        res.send(error.message);
    }
});

app.post("/purchase", (req: Request, res: Response) => {

    try {
        const userId = req.body.userId
        const productId = req.body.productId
        const quantity = req.body.quantity
        const totalPrice = req.body.totalPrice

        const newPurchase: TPurchase = { userId, productId, quantity, totalPrice }
        purchases.push(newPurchase)
        res.status(201).send("Compra realizada com sucesso")

    } catch (error) {

    }
})
app.post("/purchases", (req: Request, res: Response) => {
    try {
        const userId = req.body.userId;
        const productId = req.body.productId;
        const quantity = req.body.quantity;
        const totalPrice = req.body.totalPrice;

        const findIdUser = purchases.find((purchase) => purchase.userId === userId);

        if (!findIdUser) {
            res.status(400);
            throw new Error("ID do usuario não existe");
        }

        const findIdProduct = products.find(
            (product) => product.id === productId
        );

        if (!findIdProduct) {
            res.status(400);
            throw new Error("ID do produto não existe");
        }


        if (findIdProduct.price * quantity !== totalPrice) {
            res.status(400)
            throw new Error("Total incorreto");
        }

        const newPurchase: TPurchase = {
            userId,
            productId,
            quantity,
            totalPrice,
        };

        purchases.push(newPurchase);
        res.status(201).send("Compra efetuada com sucesso");
    } catch (error: any) {
        console.log(error);

        if (res.statusCode === 200) {
            res.status(500);
        }

        res.send(error.message);
    }
});

