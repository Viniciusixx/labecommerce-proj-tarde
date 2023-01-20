import { TUser, TProduct, TPurchase, CATEGORY_PURCHASE} from "./type";

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
        category: CATEGORY_PURCHASE.ACCESSORIES,
    },
    {
        id: "2",
        name:"calcado",
        price: 200,
        category: CATEGORY_PURCHASE.CLOTHES_AND_SHOES,
    },
    {
        id: "3",
        name:"mouse",
        price: 20,
        category: CATEGORY_PURCHASE.ELECTRONICS,
    },
]
export const purchases : TPurchase[] =[
    {
        userId:"1",
    productId:"computador",
    quantity:40,
    totalPrice:120,
    },
    {
        userId:"2",
    productId:"calcado",
    quantity:30,
    totalPrice:90,
    },
    {
        userId:"3",
    productId:"mouse",
    quantity:30,
    totalPrice:90,
    },
]

export function createUser(id:string, email:string, password: string): string{
    users.push({
        id,
        email,
        password
    })
    return("Cadastro realizado com Sucesso")
}

export function getAllUsers(): TUser[]{
    return users
}

export function createProduct(id: string, name: string, price: number, category: CATEGORY_PURCHASE): string{
    products.push({
        id,
        name,
        price,
        category
    })
    return ("Produto criado com sucesso")
}

export function acessarProducts(): TProduct[]{
    return products;
}

export function acessarProductId(id : string) : (undefined | TProduct){
    return products.find(product => product.id === id);
}

export function acessarProductsName(q : string) : TProduct[]{
    return products.filter(product => product.name.toLowerCase().includes(q.toLowerCase()));
}
    
export function createPurchase(userId : string, productId : string, quantity : number, totalPrice : number): string{
    
    purchases.push({
    userId,
    productId,
    quantity,
    totalPrice
    })
    return ("Compra realizada com sucesso");
}

export function getAllPurchasesFromUserId(userIdToSearch: string): TPurchase[]{
    return purchases.filter(purchase => purchase.userId === userIdToSearch);
}

