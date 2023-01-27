import { TUser, TProduct, TPurchase , PRODUCT_CATEGORY } from "./type"

export const users : TUser[] = [
    {
        id: "1",
        email: "gleice@mail.com",
        password: "a123"
    },
    {
        id: "2",
        email: "paulo@mail.com",
        password: "a456"
    },
    {
        id: "3",
        email:"Ricardoaks@gmail.com",
        password: "a283u"
    }
];

export const products : TProduct[] = [
    {
        id: "1",
        name: "Teclado",
        price: 7,
        category: PRODUCT_CATEGORY.ACCESSORIES
    },
    {
        id: "2",
        name: "Fone",
        price: 1,
        category: PRODUCT_CATEGORY.ACCESSORIES
    },
    {
        id: "3",
        name: "Mouse",
        price: 5,
        category: PRODUCT_CATEGORY.ACCESSORIES
    }
]

export const purchases : TPurchase[] = [
    {
        userId: "1",
        productId: "1",
        quantity: 1,
        totalPrice: 5
    },
    {
        userId: "2",
        productId: "2",
        quantity: 2,
        totalPrice: 30
    }
]

export function createUser(id : string, email : string, password : string) : string{
    users.push({
        id,
        email,
        password
    });
    return ("Cadastro realizado com sucesso");
}

export function getAllUsers() : TUser[]{
    return users;
}

export function createProduct(id : string, name : string, price : number, category : PRODUCT_CATEGORY) : string{
    products.push({
        id,
        name,
        price,
        category
    })
    return ("Produto criado com sucesso");
}

export function acessarProducts() : TProduct[]{
    return products;
}

export function acessarProductId(id : string) : (undefined | TProduct){
    return products.find(product => product.id === id);
}

export function acessarProductsName(q : string) : TProduct[]{
    return products.filter(product => product.name.toLowerCase().includes(q.toLowerCase()));
}

export function createPurchase(userId : string, productId : string, quantity : number, totalPrice : number) : string{
    purchases.push({
        userId,
        productId,
        quantity,
        totalPrice    
    })
    return ("Compra realizada com sucesso");
}

export function getAllPurchasesFromUserId(userIdToSearch : string) : TPurchase[]{
    return purchases.filter(purchase => purchase.userId === userIdToSearch);
}