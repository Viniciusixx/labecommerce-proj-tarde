import { acessarProductId, users, products, acessarProductsName, createPurchase, getAllPurchasesFromUserId, purchases} from "./database";

import cors from 'cors'

import express, {Response, Request} from 'express'
import {TProduct, TPurchase, TUser, CATEGORY_PURCHASE} from "./type"
import { stringify } from "querystring";

const app = express();

app.use(express.json())
app.use(cors())

//Exercício ping pong api e express

app.listen(3003, ()=>{
    console.log("Servidor rodando na porta 3003")
})

app.get("/ping", (req:Request, res:Response)=>{
    res.send("pong!!")
})

app.get("/users", (req:Request, res:Response)=>{
    res.status(200).send(users)
})
app.get("/products", (req:Request, res:Response)=>{
    res.status(200).send(products)
})


app.get("/product/search", (req:Request, res: Response)=>{
    const q= req.query.q as string
     const productsFilter=products.filter((product)=>product.name.includes(q))
 res.status(200).send(productsFilter)
 })

app.post("/users", (req:Request, res: Response)=>{
    const id = req.body.id
    const email = req.body.email
    const password = req.body.password

    const newUser: TUser={
        id,
        email,
        password
    }
    users.push(newUser)
    res.status(201).send("Cadastro realizado com sucesso")
})

//Criando um novo produto com POST

app.post("/products", (req:Request, res: Response)=>{
    const id = req.body.id
    const name = req.body.name
    const price = req.body.price
    const category = req.body.category
    
    const newItem: TProduct={
        id,
        name,
        price,
        category,
    }
    products.push(newItem)
    res.status(201).send("Item adicionado com sucesso")
})

app.post("/purchase", (req:Request, res: Response)=>{
    const userId = req.body.userId
    const productId = req.body.productId
    const quantity = req.body.quantity
    const totalPrice = req.body.totalPrice
    
    const newPurchase: TPurchase={
        userId,
        productId,
        quantity,
        totalPrice,
    }
    purchases.push(newPurchase)
    res.status(201).send("Compra realizada com Sucesso!")
})

//

app.get("/products/:id", (req:Request, res: Response)=>{
    const id = req.params.id

    const result = products.find((product)=>product.id === id)
    res.status(201).send(result)
})

app.get("/users/:id/purchase", (req:Request, res: Response)=>{
    const id = req.params.id

    const result = purchases.find((product)=>product.userId === id)
    res.status(200).send(result)
})

app.delete("/users/:id", (req:Request, res: Response)=>{
    const id = req.params.id

    const indexToRemove = users.findIndex((user)=>user.id === id)
    if(indexToRemove>= 0){
        users.splice(indexToRemove, 1)
    }
    res.status(200).send("User apagado com sucesso")
})

app.delete("/products/:id", (req:Request, res: Response)=>{
    const id = req.params.id

    const indexToRemove = products.findIndex((product)=>product.id === id)
    if(indexToRemove>= 0){
        products.splice(indexToRemove, 1)
    }
    res.status(200).send("Produto apagado com sucesso")
})

app.put("/users/:id", (req:Request, res: Response)=>{
    const id = req.params.id
    const newId = req.body.id as string | undefined
    const newEmail = req.body.email as string | undefined
    const newPassword = req.body.password as string | undefined

    const resultToEdit = users.find((user)=>user.id === id)
    if(resultToEdit){
        resultToEdit.id=newId || resultToEdit.id
        resultToEdit.email=newEmail || resultToEdit.email
        resultToEdit.password=newPassword || resultToEdit.password
    }
    res.status(201).send("Atualização realizada com sucesso")
})

app.put("/product/:id", (req:Request, res: Response)=>{
    const id = req.params.id
    const newId = req.body.id as string | undefined
    const newName = req.body.email as string | undefined
    const newPrice = req.body.password as number
    const newCategory = req.body.password as CATEGORY_PURCHASE | undefined

    const resultToEdit = products.find((product)=>product.id === id)
    if(resultToEdit){
        resultToEdit.id=newId || resultToEdit.id
        resultToEdit.name=newName || resultToEdit.name
        resultToEdit.price=isNaN(newPrice)? resultToEdit.price : newPrice
        resultToEdit.category=newCategory || resultToEdit.category
    }
    res.status(200).send("Produto realizado com sucesso")
})
