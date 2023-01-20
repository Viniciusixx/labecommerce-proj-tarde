import { TUser, TProduct, TPurchase} from "./type";

export const users : TUser[] = [
    {
        id: "1",
        email:"pessoa1@gmail.com",
        password: "e28y72d", 
    },
    {
        id: "2",
        email:"pessoa2@gmail.com",
        password: "2ofd9h2", 
    }
]
export const products : TProduct[] =[
    {
        id: "1",
        name:"computador",
        price: 5000,
        category: "eletronico",
    },
    {
        id: "2",
        name:"Calçado",
        price: 200,
        category: "loja",
    }
]
export const purchases : TPurchase[] =[
    {
        userId:"1",
    productId:"3red2q",
    quantity:40,
    totalprice:120,
    },
    {
        userId:"2",
    productId:"23redr2",
    quantity:30,
    totalprice:90,
    }
]