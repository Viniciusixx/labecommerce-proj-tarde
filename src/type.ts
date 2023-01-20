export type TUser = {
    id: string,
    email:string,
    password: string,
}
//O
export type TProduct = {
    id: string,
    name:string,
    price: number,
    category: CATEGORY_PURCHASE,
}

export type TPurchase = {
    userId:string,
    productId:string,
    quantity:number,
    totalPrice:number,

}

export enum CATEGORY_PURCHASE{
    ACCESSORIES = "Acessórios",
    CLOTHES_AND_SHOES = "Roupas e calçados",
    ELECTRONICS = "Eletrônicos"
}

