import { 
    users,
    products ,

    purchases
} from "./database";
import cors from 'cors'

import express, { Request, Response } from 'express'
import { TProduct, TUser, TPurchase, CATEGORY_PURCHASE  } from "./type";

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
      res.status(201).send("Produto criado com sucesso 😎");
    } catch (error: any) {
      console.log(error);
  
      if (res.statusCode === 200) {
        res.status(500);
      }
  
      res.send(error.message);
    }
  });

app.post("/purchase", (req:Request, res:Response)=>{
   
   try {
    const userId= req.body.userId
    const productId=req.body.productId
    const quantity= req.body.quantity
    const totalPrice= req.body.totalPrice
  
  const newPurchase: TPurchase ={userId, productId, quantity, totalPrice}
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
      res.status(201).send("Compra efetuada com sucesso 😎");
    } catch (error: any) {
      console.log(error);
  
      if (res.statusCode === 200) {
        res.status(500);
      }
  
      res.send(error.message);
    }
  });
  app.get("/products/:id", (req: Request, res: Response)=>{
    const id = req.params.id
    
const result = products.find((product)=>product.id ===id)
res.status(200).send("objeto product encontrado")
})

app.get("/users/:id/purchase", (req: Request, res: Response)=>{
    const id = req.params.id
    
const result = purchases.filter((purchase)=>purchase.userId ===id)
res.status(200).send(result )
})

app.delete("/users/:id", (req: Request, res: Response)=>{
    const id = req.params.id
    const indexToRemove= users.findIndex((user)=>user.id ===id)
    if(indexToRemove >= 0){
        users.splice(indexToRemove, 1)
    }
    res.status(200).send( "User apagado com sucesso")
    })

    app.delete("/products/:id", (req: Request, res: Response)=>{
        const id = req.params.id
        const indexToRemove= products.findIndex((product)=>product.id ===id)
        if(indexToRemove >= 0){
            products.splice(indexToRemove, 1)
        }
        res.status(200).send( "Produto apagado com sucesso")
        })

 
        app.put("/users/:id", (req: Request, res: Response)=>{
            const id = req.params.id
            const newId = req.body.id as string | undefined
            const newEmail = req.body.email as string | undefined
            const newPassword = req.body.password as string |undefined

            
    
            const resultToEdit = users.find((user)=> user.id ===id)
            if(resultToEdit){
              
    resultToEdit.id=newId || resultToEdit.id
    resultToEdit.email=newEmail || resultToEdit.email
    resultToEdit.password=newPassword || resultToEdit.password


   
    
            }
            res.status(200).send("Atualização realizada com sucesso")
    
        })

        app.put("/product/:id", (req: Request, res: Response)=>{
            const id = req.params.id
            const newId = req.body.id as string | undefined
            const newName = req.body.name as string | undefined
            const newPrice = req.body.price as number 
            const newCategory = req.body.category as  CATEGORY_PURCHASE | undefined

            
    
            const resultToEdit = products.find((product)=> product.id ===id)
            if(resultToEdit){
              
    resultToEdit.id=newId || resultToEdit.id
    resultToEdit.name=newName || resultToEdit.name
    resultToEdit.price = isNaN(newPrice) ?  resultToEdit.price : newPrice
    resultToEdit.category=newCategory || resultToEdit.category



   
    
            }
            res.status(200).send("Produto atualizado com sucesso")
    
        })
        //